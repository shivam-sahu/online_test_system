import { GET_EXAM, 
  INPUT_KEYS,
  LOGIN_USER,
  REGISTER_USER,
  ON_NEXT, 
  ON_OPTIONS_CHANGE, 
  ON_PRE,
  ON_REVIEW,
  ON_SUBMIT,
  SET_TIMER,
  QUES_NUM_CLK
} from './types';
import axios from '../utils/axios';
import setAuthToken from '../utils/setAuthToken';
export const getExam =keys=>async dispatch=>{
  const response = await axios.get('/api/user/getExam',{params: keys})
  .then(res=>res.data)
  .catch(err=>{throw err;});
  dispatch({
    type:GET_EXAM,
    payload:response
  });
};

export const inputKeys = (keys) =>{
  return{
    type:INPUT_KEYS,
    payload:keys
  };
};

export const loginUser =obj=> async dispatch=>{
  const request = await axios.post("/api/user/login", obj)
    .then(res => res.data)
    .catch(err=>{console.log(err)});
  const { token } = request;
  localStorage.setItem('jwtToken', token);
  setAuthToken(token);
}

export const onNext=()=>{
	return {
    type: ON_NEXT,
    payload:null
  };
};

export const onOptionsChange=(response)=>{
  return {
    type:ON_OPTIONS_CHANGE,
    payload:{
      response
    }
  };
};

export const onPre = () => {
  return {
    type: ON_PRE,
    payload: null
  };
};
export const onSubmit = userResponse=> async dispatch=>{
  const response =await axios.post("/api/user/sendResponse", userResponse)
  .then(res=>res.data)
  .catch(err=>{throw err;});
  dispatch({
    type:ON_SUBMIT,
    payload:response
  });
};

export const onReview = ()=>{
  return {
    type:ON_REVIEW,
    payload:null
  };
};

export const setTimer = (timerVal)=>{
  return {
    type:SET_TIMER,
    payload:{
      timer:timerVal
    }
  };
};
export const quesNumClk = (questionIndex)=>{
  return {
    type:QUES_NUM_CLK,
    payload:{
      questionIndex
    }
  };
};