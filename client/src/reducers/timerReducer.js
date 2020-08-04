const { SET_TIMER } = require("../actions/types");

const initialState = {
	timer:36000
};

const timerReducer = (state=initialState, action)=>{
	const {payload, type} = action;
	switch(type){
		case(SET_TIMER):{
			const { timer } = payload;
			return { ...state, timer };
		}
		default:
			return state;
	}
}

export default timerReducer;