import React from 'react';
import {useSelector} from 'react-redux';
import SetExam from './setExam';
import ExamNavigator from './examNavigator';
import RightSideBar from './rightSidebar';
import EditQuestion from './editQuestion/editQuestion';
import NewExamPopup from './newExamPopup';
import styles from './index.module.css';

const AdminDashboard = ()=> {
  // console.log("error")
  const { adminSidebar: { showAddQuesPopup, showNewExamPopup}} = useSelector(state => state);
    return (
      <div className={styles.container}>
        {showAddQuesPopup ? (
          <div style={{ position: "absolute" }}>
            <EditQuestion />
          </div>
        ) : null}
        {showNewExamPopup ? (
          <div style={{ position: "absolute" }}>
            <NewExamPopup />
          </div>
        ) : null}
        <ExamNavigator />
        <SetExam />
        <RightSideBar />
      </div>
    );
}
export default AdminDashboard;