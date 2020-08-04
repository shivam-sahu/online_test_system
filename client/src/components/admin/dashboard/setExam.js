import React, { useState, useEffect, Component} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RenderPreviousQuestion from './renderPreviousQuestions';

import { fetchQuestions,  removeQuestion } from "../../../actions/adminActions";
import styles from './setExam.module.css';
import Bar from '../../../assets/icons/horizontalBarWhite.svg';
import BarTransparent from '../../../assets/icons/horizontalBarTransparent.svg';

const SetExam =()=> {
  const dispatch = useDispatch();
  const { setExam: { questionsSet, responses }, adminSidebar: { examName}} = useSelector(state=>state);
  const [tab, setTab] = useState('question');
  useEffect(() => {
    if(examName!== null)
      dispatch(fetchQuestions(examName));
  }, [examName]);
    return (
      <div className={styles.setQuestionWrapper}>
        <div className={styles.selectionTab}>
          <span className={`${styles.tabWrapper}`} onClick={()=>setTab('question')}>
          {
            tab === 'question' ? <img className={styles.bar} src={Bar} alt="" />:
            <img className={styles.bar} src={BarTransparent} alt="" />
          }
            
          Questions
          </span>
          <span className={`${styles.tabWrapper}`}  onClick={()=>setTab('response')}>
            {
              tab === 'response' ? <img className={styles.bar} src={Bar} alt="" /> :
                <img className={styles.bar} src={BarTransparent} alt="" />
            }
            Responses
          </span>
        </div>
        {
          tab === 'question' ? <div className={styles.setQuestionContainer}>
            { 
              questionsSet.length !== 0 ?
              questionsSet.map((value, index) => {
                return <RenderPreviousQuestion key={index} value={value} index={index} removeQuestion={removeQuestion} />
              }):<div>No questions here.</div>
            }
          </div>
          : 
          <div>
            { 
              responses.length !== 0 ?
              responses.map((response, index)=>{
                return (<div key={index}>
                  {response.userId} {response.score}
                </div>)
              }):<div>No one has given the exam</div>
            }
          </div>
        }
      </div>
      
    );
}

export default (SetExam);
