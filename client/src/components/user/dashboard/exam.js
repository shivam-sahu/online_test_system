import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getExam} from '../../../actions/examActions';
import Header from '../../header/userHeader';
import ProgressBar from '../../progressBar';
import Questions from './question';

const Exam = () => {
	const { adminKey, examKey: examName, fetchedQuestionSet} = useSelector(state=>state.exam);
	const dispatch = useDispatch();
	useEffect(()=>{
		dispatch(getExam({ adminKey, examName}));
	},[]);
	return (
		<div>
			{
				fetchedQuestionSet.length === 0 ? null :
					<div>
						<Header />
						<ProgressBar />
						<Questions />
					</div>
			}
		</div>
	)
}

export default Exam;