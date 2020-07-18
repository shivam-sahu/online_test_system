import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getExam} from '../../../actions/examActions';
import Header from '../../header/userHeader';
import ProgressBar from '../../progressBar';
import Questions from './question';

const Exam = (props) => {
	const {adminKey, examKey:examName} = useSelector(state=>state.exam);
	const dispatch = useDispatch();
	useEffect(()=>{
		dispatch(getExam({ adminKey, examName}));
	},[]);
	return (<div>
		<Header />
		<ProgressBar/>
		<Questions />
	</div>)
}

export default Exam;