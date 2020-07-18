import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onNext, onOptionsChange, onPre, onSubmit } from '../../../actions/examActions';
import styles from  './question.module.css';
import { withRouter } from 'react-router-dom';
class Questions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedResponse: null,
			attempted: false,
			wantReview: false
		};
	}

	componentDidMount() {
		const { currentAttempting, markedForReview } = this.props;
		this.setState({ wantReview: markedForReview[currentAttempting] });
	}

	onOptionsClick = async (optionId) => {

		if (this.state.attempted && this.state.selectedResponse === optionId) {
			await this.setState({ attempted: false, selectedResponse: null });
		} else {
			await this.setState({ attempted: true, selectedResponse: optionId });
		}
		const { currentAttempting, fetchedQuestionSet } = this.props;
		const { id: questionId } = fetchedQuestionSet[currentAttempting];
		const { attempted, selectedResponse } = this.state;
		const response = {
			attempted,
			questionId,
			responseId: selectedResponse
		}
		this.props.onOptionsChange(response);

	}
	onNextClick = async (response) => {
		const { currentAttempting, responseArray, markedForReview } = this.props;
		const oldResponse = responseArray[currentAttempting];
		const { attempted, responseId } = oldResponse;
		await this.setState({ attempted, selectedResponse: responseId, wantReview: markedForReview[currentAttempting] });
		this.props.onNext(response);
	}
	onPreClick = async (response) => {
		const { currentAttempting, responseArray, markedForReview } = this.props;
		const oldResponse = responseArray[currentAttempting];
		const { attempted, responseId } = oldResponse;
		await this.setState({ attempted, selectedResponse: responseId, wantReview: markedForReview[currentAttempting] });
		this.props.onPre(response);
	}

	onReview = () => {
		this.setState({ wantReview: !this.state.wantReview });
	}
	onSubmit =async (response) => {
		await this.onNextClick(response);
		const {adminKey, examKey, responseArray} = this.props;
		await this.props.onSubmit({adminKey, examName:examKey, responseArray});
		this.props.history.push('/user/result');
	}

	render() {
		const { wantReview, selectedResponse } = this.state;
		const { currentAttempting, fetchedQuestionSet, isLastQuestion } = this.props;
		// if(fetchedQuestionSet !== 0){

		// 	const { id: questionId, questionText, options } = fetchedQuestionSet[currentAttempting];
		// }
		return (
		<div>
			{
				fetchedQuestionSet.length === 0 ? null:
					<div className={styles.questionWrapper}>
						<div className={styles.questionContainer}>
								<div className={styles.questionBlock}>{fetchedQuestionSet[currentAttempting].questionText}
							</div>
							<div className={styles.optionBlock}>
								{
										fetchedQuestionSet[currentAttempting].options.map((option, index) => (
										<div key={index}
											className={`${styles.option} ${selectedResponse === option.id ? styles.selectedOption : ""}`}
											onClick={() => this.onOptionsClick(option.id)}>
											<span className={styles.optionIndex}>{String.fromCharCode(65 + index)}.</span>
											<span className={styles.optionText}>{option.value}</span>
										</div>
									))
								}
							</div>
						</div>
						<div className='actionBlock'>
							<button onClick={() => this.onPreClick({ questionId: fetchedQuestionSet[currentAttempting].id, wantReview })}>Previous</button>
							<button onClick={() => this.onReview()}>Review Later</button>
							{
								isLastQuestion ? 
									<button onClick={() => this.onSubmit({ questionId: fetchedQuestionSet[currentAttempting].id, wantReview })}>Submit</button>:
									<button onClick={() => this.onNextClick({ questionId: fetchedQuestionSet[currentAttempting].id, wantReview })}>Next</button>
							}
							{/* <button onClick={() => this.onNextClick({ questionId: fetchedQuestionSet[currentAttempting].id, wantReview })}>Next</button> */}
						</div>
					</div>
			}
		</div>

		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ onNext, onOptionsChange, onPre, onSubmit }, dispatch);
}
const mapStateToProps = (state) => {
	const { exam } = state;
	return exam;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Questions));