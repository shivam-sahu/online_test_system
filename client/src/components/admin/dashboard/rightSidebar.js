import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Files from "react-files";
import {
  KeyboardDateTimePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { deleteExam, insertQuestion, postExam, removeQuestion, showPopup, updateExam } from "../../../actions/adminActions";

import styles from './rightSidebar.module.css';
import plusIcon from '../../../assets/icons/plus.svg'
import logoutIcon from '../../../assets/icons/logout.svg';
import uploadIcon from '../../../assets/icons/upload.svg';
const RightSidebar = (props)=>{
  const dispatch = useDispatch();
  const { adminSidebar:{examName}, setExam} = useSelector(state => state);
  const [startDate, handleStartDateChange] = useState(new Date());
  const [endDate, handleEndDateChange] = useState(new Date());
  const [selectedDate, handleDateChange] = useState(new Date());
  const onSave = () => {
    const { _id, questionsSet,
      id,
      start,
      end,
      owner,
      timeLimit,
      userGivenExam
    } = setExam;
    const exam = {
      questionsSet,
      id,
      start,
      end,
      owner,
      timeLimit,
      userGivenExam
    };
    if (_id === null) {
      dispatch(postExam(exam));
    } else {
      dispatch(updateExam({ ...exam, _id }));
    }
  }
	const onFilesChange = (files)=>{
		console.log(files);
	};
	const onFilesError = (error, file)=>{
		console.log("error code " + error.code + ": " + error.message);
  }
  const logout = ()=>{
    localStorage.removeItem('jwtToken');
    props.history.push('/')
  }
	return (
    <div className={styles.rightSidebar}>
      <div className={styles.adminInfo}>
        <div className={styles.nameLogout}>
          <span className={styles.adminName}>Admin</span>
          <img src={logoutIcon} alt="logout" onClick={logout} />
        </div>
        <div className={styles.adminId}>id:admin01</div>
      </div>
      <div className={styles.options}>
        <div className={styles.topBtnWrapper}>
          <div
            className={`${styles.saveBtn} ${styles.btnWrapper}`}
            onClick={onSave}
          >
            <div className={styles.btnTxt}>Save</div>
          </div>
          <div
            className={`${styles.deleteBtn} ${styles.btnWrapper}`}
            onClick={() => dispatch(deleteExam(examName))}
          >
            <div className={styles.btnTxt}>Delete</div>
          </div>
        </div>
        <div className={styles.dateTimeContainer}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <div className={styles.datePicker}>
              <KeyboardDateTimePicker
                value={startDate}
                onChange={handleStartDateChange}
                label="Start Time"
                placeholder="04/08/2020 12:00 am"
                onError={console.log}
                // minDate={new Date()}
                format="DD/MM/yyyy hh:mm a"
              />
            </div>
            <div className={styles.datePicker}>
              <KeyboardDateTimePicker
                value={endDate}
                onChange={handleEndDateChange}
                label="End Time"
                placeholder="04/08/2020 12:00 am"
                onError={console.log}
                minDate={startDate}
                format="DD/MM/yyyy hh:mm a"
              />
            </div>
            <div className={styles.datePicker}>
              <KeyboardTimePicker
                ampm={false}
                label="Duration"
                placeholder="01:00"
                mask="__:__ _M"
                value={selectedDate}
                onChange={(date) => handleDateChange(date)}
              />
            </div>
          </MuiPickersUtilsProvider>
        </div>

        <div className={styles.addQuesWrapper}>
          <div
            className={`${styles.addQues} ${styles.btnWrapper}`}
            onClick={() => dispatch(showPopup("quesPopup", true))}
          >
            <img src={plusIcon} className={styles.plusIcon} />
            <div className={styles.btnTxt}>Add Question</div>
          </div>
          <div style={{marginTop:"1rem"}}>or</div>

          <div className={styles.files}>
            <Files
              className={`files-dropzone ${styles.dropZone}`}
              onChange={onFilesChange}
              onError={onFilesError}
              accepts={[".json"]}
              multiple
              maxFiles={3}
              maxFileSize={10000000}
              minFileSize={0}
              clickable
            >
              <img src={uploadIcon} />
              <div>Upload json here</div>
            </Files>
          </div>
        </div>
        <div className={styles.goliveWrapper}>
          <div className={`${styles.goLiveBtn} ${styles.btnWrapper}`}>
            <div className={styles.btnTxt}>Go live</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withRouter(RightSidebar);
