import { CHANGE_EXAM,GET_EXAM_NAMES, SHOW_POPUP} from '../actions/types';

const initialState = {
	examList:[],
	examName:null,
	showAddQuesPopup:false,
	showNewExamPopup:false
};

const adminSideBarReducer = (state= initialState, action) =>{
	const {payload, type} = action;
	switch(type){
		case(CHANGE_EXAM):{
			const {examName} = payload;
			return{...state, examName:examName.toString()};
		}
		case (GET_EXAM_NAMES):{
			const examList = payload;
			return{...state, examList:[...examList]};
		}
		case(SHOW_POPUP):{
			const {detail, value} = payload;
			if(detail === 'examPopup'){
				return {...state, showNewExamPopup:value};
			}else if(detail === 'quesPopup'){
				return {...state, showAddQuesPopup:value};
			}
			return {state};
		}
		default:
			return state;
	}
}

export default adminSideBarReducer;