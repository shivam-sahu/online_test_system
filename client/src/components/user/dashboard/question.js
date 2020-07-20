import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onNext, onOptionsChange, onPre, onSubmit, onReview } from '../../../actions/examActions';
import styles from  './question.module.css';
import { withRouter } from 'react-router-dom';
class Questions extends React.Component {
	constructor(props) {
		super(props);
	}

	onOptionsClick = (optionId) => {
		const { currentAttempting, fetchedQuestionSet, responseArray } = this.props;
		const { id: questionId } = fetchedQuestionSet[currentAttempting];
		const { responseId:oldResponseId } = responseArray[currentAttempting];
		const responseId = oldResponseId === optionId ? null : optionId;
		const response = {
			attempted:true,
			questionId,
			responseId
		}
		this.props.onOptionsChange(response);
	}

	onSubmit =async () => {
		const {adminKey, examKey, responseArray} = this.props;
		await this.props.onSubmit({adminKey, examName:examKey, responseArray});
		this.props.history.push('/user/result');
	}

	render() {
		const { currentAttempting, 
			fetchedQuestionSet, 
			isLastQuestion, 
			responseArray, 
			onNext,
			onPre,
			onReview
		} = this.props;
		const { questionText, options } = fetchedQuestionSet[currentAttempting];
		const {responseId} = responseArray[currentAttempting];
		return (
		<div>
			{
				fetchedQuestionSet.length === 0 ? null:
					<div className={styles.questionWrapper}>
						<div className={styles.questionContainer}>
								<div className={styles.questionBlock}>{questionText}
							</div>
							<div className={styles.optionBlock}>
								{
										options.map((option, index) => (
											<div key = { index }
												className={`${styles.option} ${responseId === option.id ? styles.selectedOption : ""}`}
												onClick = {() => this.onOptionsClick(option.id)}>
												<span className={styles.optionIndex}>{String.fromCharCode(65 + index)}.</span>
												<span className={styles.optionText}>{option.value}</span>
											</div>
										))
								}
							</div>
						</div>
						<div className='actionBlock'>
							<button onClick={() => onPre()}>Previous</button>
							<button onClick={() => onReview()}>Review Later</button>
							{
								isLastQuestion ? 
									<button onClick={() => this.onSubmit()}>Submit</button>:
									<button onClick={() => onNext()}>Next</button>
							}
						</div>
					</div>
			}
		</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ 
		onNext, 
		onOptionsChange, 
		onPre, 
		onReview, 
		onSubmit 
	}, dispatch);
}
const mapStateToProps = (state) => {
	const { exam } = state;
	return exam;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Questions));