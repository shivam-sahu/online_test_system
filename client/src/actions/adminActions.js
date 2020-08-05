import {
	CHANGE_EXAM,
	DELETE_EXAM,
	GET_EXAM_NAMES,
	GO_LIVE,
	FETCH_QUESTIONS, 
	INSERT_QUESTION,
	LOGIN_ADMIN,
	POST_EXAM,
	REMOVE_QUESTION,
	REGISTER_ADMIN,
	SHOW_POPUP,
	UPDATE_DATE,
	UPDATE_EXAM} from './types';
import axios from '../utils/axios';
import setAuthToken from '../utils/setAuthToken';

export const changeExam = (examName) =>{
	return({
		type:CHANGE_EXAM,
		payload:{examName}
	})
}

export const deleteExam = (examName) =>async dispatch=>{
	const response = await axios.delete("/api/admin/deleteExam", {params:{examName}})
	.then(res=>res.data)
	.catch(err=>{throw err});
	dispatch({
		type:DELETE_EXAM,
		payload:response
	});
};

export const getExamNames = ()=> async dispatch=>{
	const response = await axios.get("/api/admin/getExamNames")
	.then(res=>res.data)
	.catch(err=>{throw err});
	dispatch({
		type:GET_EXAM_NAMES,
		payload:response
	});
};

export const goLive = (data) => async dispatch=>{
	const response = await axios.put("/api/admin/goLive", data)
	.then(res=>res.data)
	.catch(err => {throw err;});
	dispatch({
		type:GO_LIVE,
		payload:response
	})
}

export const fetchQuestions = (examName)=>async dispatch=> {
	await axios.get("/api/admin/getExam",{params:{
		examName
	}})
	.then(res=>{
		if(res.data!== ""){
			dispatch({
				type: FETCH_QUESTIONS,
				payload: res.data
			});
		}
		
	})
	.catch(err=>{console.log("error")});
};

export const insertQuestion = (questionsSet)=>{
	return({
		type:INSERT_QUESTION,
		payload:{questionsSet}
	});
}

export const loginAdmin=(obj)=>async dispatch=>{
	const request = await axios.post("/api/admin/login", obj)
		.then(res=>res.data)
		.catch(err=>{console.log(err)});
	const { token } = request;
	localStorage.setItem('jwtToken', token);
	setAuthToken(token);
}

export const postExam =(exam)=>async dispatch=>{
	const response = await axios.post("/api/admin/postExam", exam)
		.then(res => res.data)
		.catch(err => { console.log(err) });
	console.log(response);
	dispatch({
		type: POST_EXAM,
		payload: { response }
	})
}

export const removeQuestion=(index)=>{
	return({
		type:REMOVE_QUESTION,
		payload:{index}
	});
}

export const showPopup=(detail, value)=>{
	return({
		type:SHOW_POPUP,
		payload:{
			detail,
			value
		}
	});
}

export const updateDate = (data) => {
	return {
		type:UPDATE_DATE,
		payload:data
	}
}

export const updateExam  = (exam)=> async dispatch=>{
	const response  = await axios.put("/api/admin/updateExam", exam)
	.then(res=>res.data)
	.catch(err=>{console.log(err)});
	dispatch({
		type:UPDATE_EXAM,
		payload:{exam:response}
	})
}