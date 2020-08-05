import React, {useEffect, Fragment} from 'react';
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
		<Fragment>
			{
				fetchedQuestionSet.length === 0 ? null :
					<div style={{
						display:'flex',
						flexDirection:'column',
						height:"100%",
						width:'100%'
					}}>
						<Header />
						<ProgressBar />
						<Questions />
					</div>
			}
		</Fragment>
	)
}

export default Exam;