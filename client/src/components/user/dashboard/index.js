import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {inputKeys} from '../../../actions/examActions';
import waveImage from '../../../assets/images/wave.svg';
import styles from './index.module.css';
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
		<div className={styles.indexPage}>
			<div className={styles.container}>
				<div className={styles.heading}>
					Enter Your Keys
			</div>
				<div className={styles.inputWrapper}>
					<input className={styles.input}
					 value={adminKey} onChange={(e) => setAdminKey(e.target.value)}></input>
					<div className={styles.inputPlaceHolder}>Admin Key</div>
				</div>
				<div className={styles.inputWrapper}>
					<input className={styles.input} value={examKey} onChange={(e) => setExamKey(e.target.value)}></input>
					<div className={styles.inputPlaceHolder}>Exam Key</div>
				</div>
				<button className={styles.inputBtn} onClick={() => inputExamKeys()}>Enter</button>
			</div>
			<img className={styles.wave} src={waveImage} />
		</div>
	)
}
export default UserDashboard;