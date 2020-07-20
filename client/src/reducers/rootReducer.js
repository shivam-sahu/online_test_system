import {combineReducers} from 'redux';
import examReducer from './examReducer';
import setExamReducer from './setExamReducer';
import timerReducer  from './timerReducer';
export default combineReducers({
	'exam' : examReducer,
	'setExam': setExamReducer,
	'time': timerReducer
});