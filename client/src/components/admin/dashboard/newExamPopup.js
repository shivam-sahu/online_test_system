import React,{useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {  showPopup, postExam } from '../../../actions/adminActions';
import crossIconBlack from '../../../assets/icons/crossBlack.svg';
import styles from './newExamPopup.module.css';
const NewExamPopup = ()=>{
	const dispatch = useDispatch();
	const [value, setValue] = useState("");
	const onCancel = ()=>{
		dispatch(showPopup('examPopup', false));
	}
	const createExam =async ()=>{
		if(value!== "")
		await dispatch(postExam({name:value}));

		dispatch(showPopup('examPopup', false));
	}
	return (<div className='popupBackground' onClick={onCancel}>
		<img className='crossIconBlack' src={crossIconBlack} alt='cancel' onClick={onCancel}/>
		<div className={styles.popupWrapper} onClick={(event) =>{event.stopPropagation()}}>
			<input className={styles.input} type='text' value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Exam Name"/>
			<div className={styles.nextBtn} onClick={createExam} >Next</div>
		</div>
	</div>)
}

export default NewExamPopup;