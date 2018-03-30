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
      console.log(this.state.data.currA,this.state.data.currB,this.state.data.currAval,this.state.data.currBval);
      fetch(`https://api.fixer.io/latest?symbols=${this.state.data.currA},${this.state.data.currB}`)
        .then(response => response.json())
        .then(myJson => {
          let rateCurrA = myJson.rates[this.state.data.currA];
          let rateCurrB = myJson.rates[this.state.data.currB];

          //let rate = Math.round((rateCurrB / rateCurrA) * 10000) / 10000;
          if (this.state.data.lastCurrChanged === "A"){
            let newVal = Math.round((this.state.data.currAval * (rateCurrB / rateCurrA)) * 100) / 100;
            this.setState({ data: {currBval: newVal} });
          }
          else {
            let newVal = Math.round((this.state.data.currBval * (rateCurrB / rateCurrA)) * 100) / 100;
            this.setState({ data: {currAval: newVal} });
          }
        });
    }
  );
}

  render(){
    return(
      <div>
        <h5>{this.state.data.currAval} {this.state.data.currA} equals</h5>
        <h2>{this.state.data.currBval} {this.state.data.currB}</h2>
      </div>
    )
  }
}
