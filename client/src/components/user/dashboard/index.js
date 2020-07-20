import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {inputKeys} from '../../../actions/examActions';
const UserDashboard=  (props)=>{
	const  exam = useSelector(state => state.exam);
	const {adminKey:oldAdminKey, examKey:oldExamKey} = exam;
	const dispatch = useDispatch();
	const [adminKey, setAdminKey] = useState(oldAdminKey);
	const [examKey, setExamKey] = useState(oldExamKey);
	const inputExamKeys = ()=>{
		dispatch(inputKeys({adminKey, examKey}));
		props.history.push("/user/exam");
	}
	return(
		<div>
				Admin Key:
				<br></br>
				<input value={adminKey} onChange={(e)=>setAdminKey(e.target.value)}></input>
				<br></br>
				Exam Key:
				<br></br>
				<input value={examKey} onChange={(e)=>setExamKey(e.target.value)}></input>
				<br></br>
				<button onClick={()=>inputExamKeys()}>Enter</button>
		</div>
	)
}
export default UserDashboard;