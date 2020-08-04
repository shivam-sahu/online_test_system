import { DELETE_EXAM, FETCH_QUESTIONS, INSERT_QUESTION, POST_EXAM, REMOVE_QUESTION, UPDATE_EXAM} from "../actions/types";
const initialState = {
	questionsSet:[],
	id:null,
	start:null,
	end:null,
	owner:null,
	timeLimit:null,
	userGivenExam:[],
	_id:null,
	responses:[]
};

const setExamReducer = (state= initialState, action)=>{
	const {type, payload} = action;
	switch(type){
		case(FETCH_QUESTIONS):{
			const {exam, responses} = payload;
			return {...state,  ...exam, responses:[...responses]};
		}
		case(INSERT_QUESTION):{
			const {questionsSet} = payload;
			return {...state, questionsSet};
		}
		case(POST_EXAM):{
			return {...state};
		}
		case (REMOVE_QUESTION):{
			const {index} = payload;
			const {questionsSet} = state;
			console.log(index)
			if(index>-1){
				questionsSet.splice(index, 1);
				return {...state, questionsSet:[...questionsSet]};
			}else return {...state};
		}
		case(UPDATE_EXAM):{
			const {exam} = payload;
			return {...state, ...exam};
		}
		default:
			return state;
	}
}

export default setExamReducer;

