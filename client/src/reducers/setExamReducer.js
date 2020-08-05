import { DELETE_EXAM, FETCH_QUESTIONS,GO_LIVE, INSERT_QUESTION, POST_EXAM, REMOVE_QUESTION, UPDATE_DATE, UPDATE_EXAM} from "../actions/types";
const initialState = {
	questionsSet:[],
	id:null,
	start:null,
	end:null,
	owner:null,
	timeLimit:null,
	userGivenExam:[],
	_id:null,
	responses:[],
	isLive:false
};

const setExamReducer = (state= initialState, action)=>{
	const {type, payload} = action;
	switch(type){
		case(FETCH_QUESTIONS):{
			const {exam, responses} = payload;
			return {...state,  ...exam, responses:[...responses]};
		}
		case(GO_LIVE):{
			const {live:isLive} = payload;
			return {...state, isLive};
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
		case (UPDATE_DATE):{
			const {date, ref} = payload;
			const end = new Date(state.end);
			if(ref === 'startDate'){
				if(date > end){
					return {...state, start:date, end:date};
				}
				else 
					return{...state, start:date};
			}
			else if(ref === 'endDate')
				return {...state, end:date};
			else if(ref === 'timeLimit')
				return {...state, timeLimit:date};
			return {...state};
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

