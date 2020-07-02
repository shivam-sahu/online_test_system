import React, {Component} from 'react';
import InsertQuestion from './insertQuestion';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteExam, fetchQuestions, insertQuestion, postExam, removeQuestion, updateExam } from "../../../actions/adminActions";

class SetExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInsertQuestion: false,
    };
  }
  componentDidMount() {
    this.props.fetchQuestions("exam1");
  }
  renderPreviousQuestions = (value, index) => {
    const { options, questionText, id, correctAnsId } = value;
    return (
      <div key={index}>
        <div>
        <span>{index+1}. {questionText}</span>
        <span><button onClick={() => { this.props.removeQuestion(index) }} >remove</button></span>
        </div>
        <div>
          {options.map((val, idx) => {
            return (
              <div key={idx}>
                {String.fromCharCode(97 + idx)}. {val.value}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  onDone =async (questionText, options, correctAnsId=null) => {
		const {props:{ questionsSet: oldQuestions }} = this;
		const questionObject = {
      id: (oldQuestions.length+1).toString(),
      questionText,
      options,
      correctAnsId
    };
		const newQuestions = [...oldQuestions, questionObject];
		await this.props.insertQuestion(newQuestions);
    this.setState({ showInsertQuestion: false });
  };
  onSave=()=>{
    const { _id, questionsSet,
      id,
      start,
      end,
      owner,
      timeLimit,
      userGivenExam
    } = this.props;
    const exam = {
      questionsSet,
      id,
      start,
      end,
      owner,
      timeLimit,
      userGivenExam
    };
    if(_id === null){
      this.props.postExam(exam);
    }else {
      this.props.updateExam({...exam, _id});
    }
  }
  render() {
		const { questionsSet } = this.props;
    return (
      <div>
        {
          questionsSet.map((value, index) => {
          return this.renderPreviousQuestions(value, index)
        })
        }
        {
          this.state.showInsertQuestion ? 
          (<InsertQuestion onDone={this.onDone} />) :
          (<div onClick={() => this.setState({ showInsertQuestion: true })}>
            Add Question
          </div>)
        }
        <button onClick={()=>{this.onSave()}}>Save</button>
        <button onClick={()=>this.props.deleteExam("exam1")}>Delete Exam</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators({ deleteExam, fetchQuestions, insertQuestion, postExam, removeQuestion, updateExam }, dispatch);
}

const mapStateToProps = (state)=>{
	const { setExam } = state;
	return setExam;
}

export default connect(mapStateToProps, mapDispatchToProps)(SetExam);
