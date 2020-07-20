import {GET_EXAM,
	INPUT_KEYS, 
	ON_NEXT, 
	ON_OPTIONS_CHANGE, 
	ON_PRE, 
	ON_REVIEW,
	ON_SUBMIT,
	QUES_NUM_CLK
} from '../actions/types';
const initialState = {
	fetchedQuestionSet: [],
	currentAttempting:0,
	responseArray: [],
	markedForReview: [],
	isFirstQuestion:true,
	isLastQuestion:false,
	adminKey:"",
	examKey:"",
	score:0,
	timer:30
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
			const { responseArray, currentAttempting} = state;
			const newResponseArray = [...responseArray.slice(0, currentAttempting) ,response ,...responseArray.slice(currentAttempting+1)];
			return { ...state, responseArray: newResponseArray};
		}
		case(ON_NEXT):{
			const { currentAttempting, fetchedQuestionSet} = state;
			const newIndex = currentAttempting < (fetchedQuestionSet.length - 1) ? currentAttempting+1:currentAttempting;
			const isLastQuestion =  newIndex === (fetchedQuestionSet.length-1)? true:false;
			const isFirstQuestion = newIndex === 0 ?true:false;
			return {...state, currentAttempting:newIndex, isFirstQuestion, isLastQuestion};
		}
		case(ON_PRE):{
			const { currentAttempting, fetchedQuestionSet } = state;
			const newIndex = currentAttempting >0 ? currentAttempting - 1 : currentAttempting;
			const isLastQuestion = newIndex === (fetchedQuestionSet.length - 1) ? true : false;
			const isFirstQuestion = newIndex === 0 ? true : false;
			return { ...state, currentAttempting: newIndex, isFirstQuestion, isLastQuestion };
		}
		case (ON_REVIEW):{
			const {currentAttempting, markedForReview:oldReviewArray} = state;
			const currentValue = !oldReviewArray[currentAttempting];
			const markedForReview = [...oldReviewArray.slice(0, currentAttempting), currentValue, ...oldReviewArray.slice(currentAttempting+1)];
			return {...state, markedForReview};
		}
		case(ON_SUBMIT):{
			const {score} = payload;
			return {...state, score};
		}
		case(QUES_NUM_CLK):{
			const {questionIndex} = payload;
			return { ...state, currentAttempting:questionIndex};
		}
		default:
			return state;
	}
}
export default examReducer;