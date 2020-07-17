import {GET_EXAM,INPUT_KEYS, ON_NEXT, ON_OPTIONS_CHANGE, ON_PRE} from '../actions/types';
const initialState = {
	fetchedQuestionSet: [],
	currentAttempting:0,
	responseArray: [],
	markedForReview: [],
	isFirstQuestion:true,
	isLastQuestion:false,
	adminKey:"",
	examKey:""
};

const examReducer = (state= initialState, action)=>{
	const {payload, type} = action;
	switch(type){
		case(GET_EXAM):{
			const {exam:{questionsSet:fetchedQuestionSet}} = payload;
			const totalQuestions = fetchedQuestionSet.length;
			const responseArray = [];
			const markedForReview = [];
			for(let i=0;i<totalQuestions;++i){
				responseArray.push({
					attempted:false,
					questionId:null,
					responseId:null
				});
				markedForReview.push(false);
			}
			return {...state, fetchedQuestionSet, responseArray, markedForReview };
		}
		case(INPUT_KEYS):{
			const {adminKey, examKey} = payload;
			return {...state, adminKey, examKey };
		}
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