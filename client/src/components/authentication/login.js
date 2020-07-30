import React,{useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {loginAdmin} from '../../actions/adminActions';
import {loginUser} from '../../actions/examActions';
import styles from './login.module.css';
import waveImage from '../../assets/images/wave.svg';

const Login = (props)=>{
	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");
	// const [success, setSuccess] = useState(false);
	const [user, setUser] = useState("student");
	const dispatch = useDispatch();

	const loginBtnClk =async (e)=>{
		e.preventDefault();
		if(!userId || !password){
			console.log("enter username and password");
		} else if (password < 8) {
			console.log("password must contain at least 8 characters!");
		}else{
			if(user === 'student'){
				const credentials={
					userId:userId,
					password
				}
				await dispatch(loginUser(credentials));
				props.history.push("/user/dashboard");
			}else if(user === 'admin'){
				const credentials={
					adminId: userId,
					password
				}
				await dispatch(loginAdmin(credentials));
				props.history.push("/admin/dashboard");
			}
		}
	}

	return(<div className={styles.loginPage}>
		<div className={styles.loginHeader}>
			<span className={user === "student" ? styles.selectedUserType:styles.notSelectedUserType} 
			onClick={()=>setUser("student")}>Student  </span>
			<span className={user === "admin" ? styles.selectedUserType : styles.notSelectedUserType} 
			onClick={()=>setUser("admin")}>Admin</span>
		</div>
		<div className={styles.container}>
			<div className={styles.loginHeading}>
				Login
			</div>
			<div className={styles.inputWrapper}>
				<input className={styles.inputArea} type='text' value={userId} onChange={e => setUserId(e.target.value)} />
				<div className={styles.inputPlaceHolder}>Username/Email</div>
			</div>
			<div className={styles.inputWrapper}>
				<input className={styles.inputArea} type='password' value={password} onChange={e => setPassword(e.target.value)} />
				<div className={styles.inputPlaceHolder}>Password</div>
			</div>
			<div className={styles.authRedirect}>Not registered,<a> Sign Up</a> instead</div>
			<div className={styles.loginBtn} onClick={(e)=>loginBtnClk(e)}>Login</div>
		</div>
		<img className={styles.wave} src={waveImage}/>
	</div>);
}

export default withRouter(Login);