import {combineReducers} from 'redux';
import examReducer from './examReducer';
import setExamReducer from './setExamReducer';
export default combineReducers({
	'exam' : examReducer,
	'setExam': setExamReducer
});