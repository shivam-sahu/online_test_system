import React, {Component} from 'react';
import InsertQuestion from './insertQuestion';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchQuestions, insertQuestion } from "../../../actions/adminActions";

class SetExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInsertQuestion: false,
    };
  }
  componentDidMount() {
    this.props.fetchQuestions();
  }
  renderPreviousQuestions = (value, index) => {
    const { options, questionText, id, correctAnsId } = value;
    return (
      <div key={index}>
        <div>{questionText}</div>
        <div>
          {options.map((val, idx) => {
            return (
              <div key={idx}>
                {idx + 1}. {val.value}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  onDone =async (questionText, options) => {
		const {payload:oldPayload} = this.props;
		const { questions: oldQuestions } = oldPayload;
		const questionObject = {
      id: (oldQuestions.length+1).toString(),
      questionText,
      options,
      correctAnsId:null
    };
		const newQuestions = [...oldQuestions, questionObject];
		const payload = {...oldPayload, questions:newQuestions};
		await this.props.insertQuestion(payload);
    this.setState({ showInsertQuestion: false });
  };
  render() {
		const { questions, payload } = this.props;
    return (
      <div>
        {questions.map((value, index) => {
          return this.renderPreviousQuestions(value, index);
        })}
        {this.state.showInsertQuestion ? (
          <InsertQuestion onDone={this.onDone} />
        ) : (
          <div onClick={() => this.setState({ showInsertQuestion: true })}>
            Add Question
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch)=>{
	return bindActionCreators({ fetchQuestions, insertQuestion }, dispatch);
}

const mapStateToProps = (state)=>{
	const { setExam } = state;
	return setExam;
}

export default connect(mapStateToProps, mapDispatchToProps)(SetExam);
