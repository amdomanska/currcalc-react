import React from 'react';

export class Result extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: props.data,
      rate: 0,
    };
  }

componentWillReceiveProps(nextProps) {

  this.setState({ data: nextProps.data },
    () => {
      fetch(`https://api.fixer.io/latest?symbols=${this.state.data.currA},${this.state.data.currB}`)
        .then(response => response.json())
        .then(myJson => {
          let rateCurrA = myJson.rates[this.state.data.currA];
          let rateCurrB = myJson.rates[this.state.data.currB];

          //let rate = Math.round((rateCurrB / rateCurrA) * 10000) / 10000;
          if (this.state.data.lastCurrChanged === "A"){
            let newVal = Math.round((this.state.data.currAval * (rateCurrB / rateCurrA)) * 100) / 100;
            this.setState(prevState => ({
              data: {
                ...prevState.data,
                currBval: newVal
              }
            }));
          }
          else {
            let newVal = Math.round((this.state.data.currBval * (rateCurrA / rateCurrB)) * 100) / 100;
            this.setState(prevState => ({
              data: {
                ...prevState.data,
                currAval: newVal
              }
            }));
          }
        });
    }
  );
}

  render(){
    console.log(this.state.data.currA,this.state.data.currB,this.state.data.currAval,this.state.data.currBval);
      if ((this.state.data.currAval !== 0 || this.state.data.currBval !== 0)
        && !isNaN(this.state.data.currAval) && !isNaN(this.state.data.currBval)
        && this.state.data.currA !== undefined && this.state.data.currB !== undefined){
        return (
          <div>
            <p class="firstValue">{this.state.data.currAval} {this.state.data.currA} equals</p>
            <p class="result">{this.state.data.currBval} {this.state.data.currB}</p>
          </div>
        )
      }
      else {
        return(null);
      }
  }
}
