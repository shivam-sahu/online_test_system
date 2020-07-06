import { ON_NEXT, ON_OPTIONS_CHANGE, ON_PRE} from '../actions/types';
import { jsonQuestions} from './data.json';
const initialState = {
	fetchedQuestionSet: jsonQuestions,
	// fetchedQuestionSet:null,
	currentAttempting:0,
	responseArray: [{ attempted: false, questionId: null, responseId: null }, { attempted: false, questionId: null, responseId: null }, { attempted: false, questionId: null, responseId: null}, { attempted: false, questionId: null, responseId: null}, { attempted: false, questionId: null, responseId: null}],
	markedForReview: [false, false, false, false, false],
	isFirstQuestion:true,
	isLastQuestion:false
};

const examReducer = (state= initialState, action)=>{
	const {payload, type} = action;
	switch(type){
		case(ON_OPTIONS_CHANGE):{
			const {response} = payload;
			// console.log(response);
			const { responseArray, currentAttempting} = state;
			const newResponseArray = [...responseArray.slice(0, currentAttempting) ,response ,...responseArray.slice(currentAttempting+1)];
			return { ...state, responseArray: newResponseArray};
		}
		case(ON_NEXT):{
			const{wantReview} = payload;
			const { currentAttempting, fetchedQuestionSet, markedForReview} = state;
			// console.log(currentAttempting);
			const newIndex = currentAttempting < (fetchedQuestionSet.length - 1) ? currentAttempting+1:currentAttempting;
			const isLastQuestion =  newIndex === (fetchedQuestionSet.length-1)? true:false;
			const isFirstQuestion = newIndex === 0 ?true:false;
			const newReviewArray = [...markedForReview.slice(0, currentAttempting), wantReview, ...markedForReview.slice(currentAttempting+1)];
			return {...state, currentAttempting:newIndex, markedForReview:newReviewArray, isFirstQuestion, isLastQuestion};
		}
		case(ON_PRE):{
			const { wantReview } = payload;
			const { currentAttempting, fetchedQuestionSet, markedForReview } = state;
			const newIndex = currentAttempting >0 ? currentAttempting - 1 : currentAttempting;
			const isLastQuestion = newIndex === (fetchedQuestionSet.length - 1) ? true : false;
			const isFirstQuestion = newIndex === 0 ? true : false;
			const newReviewArray = [...markedForReview.slice(0, currentAttempting), wantReview, ...markedForReview.slice(currentAttempting + 1)];
			return { ...state, currentAttempting: newIndex, markedForReview: newReviewArray, isFirstQuestion, isLastQuestion };
		}
		default:
			return state;
	}
}
export default examReducer;