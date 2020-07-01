import { FETCH_QUESTIONS, INSERT_QUESTION } from "../actions/types";
const initialState = {
	questions:[],
	payload:null
};

const setExamReducer = (state= initialState, action)=>{
	const {type, payload} = action;
	switch(type){
		case(FETCH_QUESTIONS):{
			const {questions} = payload;
			return {...state, questions, payload};
		}
		// case(INSERT_QUESTION):{

		// }
		default:
			return state;
	}
}

export default setExamReducer;

