import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onNext, onOptionsChange, onPre } from '../../../actions/examActions';

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
		// console.log(2);
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
	onSubmit = () => {

	}

	render() {
		const { wantReview } = this.state;
		const { currentAttempting, fetchedQuestionSet } = this.props;
		const { id: questionId, question, options } = fetchedQuestionSet[currentAttempting];
		console.log(this.props.markedForReview);
		return (
			<div>
				<div>{question}</div>
				<div>
					{
						options.map((value, index) => (
							<div key={index} onClick={() => this.onOptionsClick(value.id)}> {value.val} </div>
						))
					}
				</div>
				<div>
					<button onClick={() => this.onReview()}>Review Later</button>
					<button onClick={() => this.onPreClick({ questionId, wantReview })}>Previous</button>
					<button onClick={() => this.onNextClick({ questionId, wantReview })}>Next</button>
				</div>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ onNext, onOptionsChange, onPre }, dispatch);
}
const mapStateToProps = (state) => {
	const { exam } = state;
	return exam;
}
export default connect(mapStateToProps, mapDispatchToProps)(Questions);