import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {changeExam, getExamNames, showPopup} from '../../../actions/adminActions';
import styles from './examNavigator.module.css';
import plusIcon from '../../../assets/icons/plus.svg';
import barIcon from '../../../assets/icons/bar.svg';
import transparentBarIcon from '../../../assets/icons/trasnparentBar.svg'

const ExamNavigator = ()=>{
	const {examList, examName} = useSelector(state => state.adminSidebar);
	const dispatch = useDispatch();
	useEffect(()=>{
		dispatch(getExamNames());
	},[]);
	return(<div className={styles.examNavigator}>
		<div className={styles.addExam}>
			<img src={plusIcon} alt='Add' className={styles.plusIcon} onClick={() => dispatch(showPopup("examPopup",true))}/>
			<span className={styles.examsText}>Exams</span>
		</div>
		<div style={{overflow:'auto'}}>
		{
			examList.map(({name}, index)=>
				<div className={examName === name ? styles.selectedExamName :styles.notSelectedExamNames} 
				key={index} onClick={()=>dispatch(changeExam(name))} >
					{
						examName === name ? 
					<img src={barIcon} className={styles.bar} />
					:
					<img src={transparentBarIcon} className={styles.bar}/>
					}
				{name}
				</div>
			)
		}
		</div>
	</div>)
}

export default ExamNavigator;