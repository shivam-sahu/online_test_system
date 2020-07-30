import { DELETE_EXAM, 
	FETCH_QUESTIONS, 
	INSERT_QUESTION,
	LOGIN_ADMIN,
	POST_EXAM,
	REMOVE_QUESTION,
	REGISTER_ADMIN,
	UPDATE_EXAM} from './types';
import axios from '../utils/axios';
import setAuthToken from '../utils/setAuthToken';

export const deleteExam = (examName) =>async dispatch=>{
	const response = await axios.delete("/api/admin/deleteExam", {params:{examName}})
	.then(res=>res.data)
	.catch(err=>{throw err});
	dispatch({
		type:DELETE_EXAM,
		payload:response
	})
}

export const fetchQuestions = (examName)=>async dispatch=> {
	await axios.get("/api/admin/getExam",{params:{
		examName
	}})
	.then(res=>{
		if(res.data!== "")
		dispatch({
			type: FETCH_QUESTIONS,
			payload: res.data
		});
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
	const response= await axios.post("/api/admin/updateExam", exam)
		.then(res => res.data)
		.catch(err => { console.log(err) });
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

export const updateExam  = (exam)=> async dispatch=>{
	const response  = await axios.put("/api/admin/updateExam", exam)
	.then(res=>res.data)
	.catch(err=>{console.log(err)});
	dispatch({
		type:UPDATE_EXAM,
		payload:{exam:response}
	})
}