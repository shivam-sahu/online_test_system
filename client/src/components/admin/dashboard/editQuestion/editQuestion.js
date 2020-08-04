import React, { Component } from 'react';
import { insertQuestion, showPopup} from '../../../../actions/adminActions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import './editQuestion.css';
import crossIconBlack from '../../../../assets/icons/crossBlack.svg';
import crossIconWhite from '../../../../assets/icons/crossWhite.svg';
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
  onCancel = ()=>{
    this.props.showPopup("quesPopup", false);
  }
  onDone = async (questionText, options, correctAnsId = null) => {
    const { props: { questionsSet: oldQuestions } } = this;
    const questionObject = {
      id: (oldQuestions.length + 1).toString(),
      questionText,
      options,
      correctAnsId
    };
    const newQuestions = [...oldQuestions, questionObject];
    await this.props.insertQuestion(newQuestions);
    this.props.showPopup("quesPopup", false);
    
  };
  render() {
    const { questionText, showAddOptionsSpace, optionsText, options, correctOptionIndex } = this.state;
    return (
      <div className="popupBackground" onClick={()=>this.onCancel()}>
        <img className='crossIconBlack' src={crossIconBlack} alt='cancel' />
        <div className="addQuestionContainer" onClick={(event) => event.stopPropagation()}>
          <div className="addQuestion">
          <div className='textAreaWrapper'>
              <textarea
                className='textArea'
                value={questionText}  
                onChange={(e) => this.onQuesTxtChange(e.target.value)}
              />
              <div className='textAreaPlaceholder'>Question</div>
          </div>
            <div className='addedOptionsContainer'>
              {
                options.map((option, index) => {
                  return <div key={index} 
                  className={correctOptionIndex === index ? 'highlightOption' : 'addedOptions'}
                  onClick={() => { this.onOptionsClick(index) }}
                  >
                      <span>
                        <span className='optionIndex'>{String.fromCharCode(65 + index)}.</span>
                        <span className='optionText'>{option.value}</span>
                      </span>
                    <img  src={crossIconWhite} alt='remove' className='removeIcon' onClick={(e) => this.removeOption(e, index)}/>
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
          <button className='doneButton' onClick={() => this.onDone(questionText, options, correctOptionIndex)}>Done</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ insertQuestion, showPopup }, dispatch);
}

const mapStateToProps = (state) => {
  const { setExam } = state;
  return setExam;
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuestion);