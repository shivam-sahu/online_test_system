import React,{useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {onSubmit, setTimer} from '../../../actions/examActions';
import styles from './index.module.css';

const UserHeader = (props) =>{
	const dispatch = useDispatch();
	const {adminKey, examKey:examName, responseArray} = useSelector(state=>state.exam);
	const {timer} = useSelector(state=>state.time);
	const submitFun = async () => {
		await dispatch(onSubmit({ adminKey, examName, responseArray }));
		props.history.push('/user/result')
	}
	// console.log(timer);
	let time = timer;
	const days = Math.floor(time /(24*60*60));
	time %= (24*60*60);
	const hours = Math.floor(time/(60*60));
	time %= (60*60);
	const minutes = Math.floor(time/(60));
	time %= 60;
	const seconds = time;

	useEffect(()=>{
		const interval = setInterval(()=>{
			if(timer!== null)
				dispatch(setTimer(timer-1));
		}, 1000)
		if(timer === 0 ){
			clearInterval(interval);
			submitFun();
		}
		return ()=> clearInterval(interval);
	},[timer]);

	return(<div className={styles.timerHeader}>
		<div className={timer < 60 ? styles.redTimer :styles.timer}>
		{ `Time Left: ${hours}h:${minutes}m:${seconds}s` }
	</div>
	</div>);
}

export default withRouter(UserHeader);