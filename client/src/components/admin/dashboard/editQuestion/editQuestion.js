import React, { Component } from 'react';
import './editQuestion.css';
import crossIconBlack from '../../../../assets/icons/crossBlack.svg';
class EditQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionText: "",
      showAddOptionsSpace: false,
      optionsText: "",
      options: [],
      correctOptionIndex: null,
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
  removeOption=(event, index)=>{
    event.preventDefault();
    const { options, correctOptionIndex: oldIndex} = this.state;
    if(index>-1){
      const correctOptionIndex = (oldIndex === null || oldIndex===index ) ?
       null:
       (oldIndex<index? oldIndex : oldIndex-1);
      options.splice(index, 1);
      this.setState({options:[...options], correctOptionIndex});
    }
  }
  onOptionsClick=(index)=>{
    if(index === this.state.correctOptionIndex){
      this.setState({correctOptionIndex:null});
    }else{
      this.setState({correctOptionIndex:index});
    }
  }
  render() {
    const { questionText, showAddOptionsSpace, optionsText, options, correctOptionIndex } = this.state;
    return (
      <div className="popupBackground" onClick={()=>this.props.onCancel()}>
        <img className='crossIconBlack' src={crossIconBlack} alt='cancel' />
        <div className="addQuestionContainer" onClick={(event) => event.stopPropagation()}>
          <div className="addQuestion">
            <textarea
              className='textArea'
              value={questionText}
              onChange={(e) => this.onQuesTxtChange(e.target.value)}
            ></textarea>
            <div className='addedOptionsContainer'>
              {
                options.map((option, index) => {
                  return <div key={index} 
                  className={correctOptionIndex === index? 'highlightOption' :'addedOptions'}
                  onClick={() => { this.onOptionsClick(index) }}
                  >
                    <span>
                      <span className='optionIndex'>{String.fromCharCode(65 + index)}.</span>
                      <span className='optionText'>{option.value}</span>
                    </span>
                      <button className='removeButton' onClick={(e) => this.removeOption(e,index)}>Remove</button>
                  </div>
                })
              }
            </div>
          </div>
          {
            showAddOptionsSpace ? (
              <div className='optionsInputContainer'>
                <input
                  type="text"
                  value={optionsText}
                  className='optionsInput'
                  onChange={(e) => this.onOptTxtChange(e.target.value)}
                />
                <button
                  className='optionDoneButton'
                  onClick={() => this.onDoneOptionsClick()}>
                  Done
            </button>
              </div>
            ) : null}
          <span className='addOptionsText' onClick={() => this.setState({ showAddOptionsSpace: true })}>
            Add options
        </span>
          <div className='doneButtonContainer'>
          <button className='doneButton' onClick={() => this.props.onDone(questionText, options, correctOptionIndex)}>Done</button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditQuestion;