import React, { Component } from 'react';

class InsertQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionText: "",
      showAddOptionsSpace: false,
      optionsText: "",
      options: [],
      optionNo: 0,
    };
  }
  onQuesTxtChange = (questionText) => {
    this.setState({ questionText });
  };
  onOptTxtChange = (optionsText) => {
    this.setState({ optionsText });
  };
  onDoneOptionsClick = ()=>{
    const {optionsText, options:oldOptions} = this.state;
    if(optionsText !== ""){
      const optionObject = {
        id:(oldOptions.length +1).toString(),
        value:optionsText
      }
      const options = [...oldOptions, optionObject];
      this.setState({options,optionsText:"", showAddOptionsSpace:false});
    }else {
      this.setState({ optionsText: "", showAddOptionsSpace: false });
    }
  }
  render() {
    const { questionText, showAddOptionsSpace, optionsText, options } = this.state;
    return (
      <div className="add_question">
        <input
          type="text"
          value={questionText}
          onChange={(e) => this.onQuesTxtChange(e.target.value)}
        />
        <div>
          {
            options.map((option, index)=>{
              return <div key={index}>{String.fromCharCode(97+index)}. {option.value}</div>
            })
          }
        </div>
        {
          showAddOptionsSpace ? (
          <div>
            <input
              type="text"
              value={optionsText}
              onChange={(e) => this.onOptTxtChange(e.target.value)}
            />
            <button
              onClick={() => this.onDoneOptionsClick()}>
              Done
            </button>
          </div>
        ) : null}
        <span onClick={() => this.setState({ showAddOptionsSpace: true })}>
          Add options
        </span>
        <div onClick={()=>this.props.onDone(questionText, options)}>Done</div>
      </div>
    );
  }
}

export default InsertQuestion;