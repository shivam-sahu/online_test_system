import React, {Component} from 'react';
import EditQuestion from './editQuestion/editQuestion';
import RenderPreviousQuestion from './renderPreviousQuestions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteExam, fetchQuestions, insertQuestion, postExam, removeQuestion, updateExam } from "../../../actions/adminActions";
import './setExam.css';

class SetExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInsertQuestion: false,
      isQuestionCrossHover:false
    };
  }
  componentDidMount() {
    this.props.fetchQuestions("exam1");
  }
  onCancel=()=>{
    this.setState({showInsertQuestion:false});
  }
  onDone =async (questionText, options, correctAnsId=null) => {
    console.log(correctAnsId);
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
      <div className='setQuestionContainer'>
        {
          this.state.showInsertQuestion ? (<EditQuestion onDone={this.onDone} onCancel={this.onCancel}/>):null
        }
        {
          questionsSet.map((value, index) => {
           return <RenderPreviousQuestion key={index} value= {value} index={index} removeQuestion={this.props.removeQuestion}/>
        })
        }
        {
          this.state.showInsertQuestion ? null :
          (<div onClick={() => this.setState({ showInsertQuestion: true })}>
            Add Question
          </div>)
        }
        <button onClick={()=>{this.onSave()}}>Save</button>
        <button onClick={()=>this.props.deleteExam("exam1")}>Delete Exam</button>

        {/* <div className='wrapper'>
          <div className='shadow'></div>
          <div className='button-center'>
            Button
            </div>
        </div> */}
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
