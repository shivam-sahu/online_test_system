import {combineReducers} from 'redux';
import examReducer from './examReducer';
import setExamReducer from './setExamReducer';
import timerReducer  from './timerReducer';
import adminSidebarReducer from './adminSidebarReducer';
export default combineReducers({
	'exam' : examReducer,
	'setExam': setExamReducer,
	'time': timerReducer,
	'adminSidebar':adminSidebarReducer
});