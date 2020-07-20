import { GET_EXAM, 
  INPUT_KEYS, 
  ON_NEXT, 
  ON_OPTIONS_CHANGE, 
  ON_PRE,
  ON_REVIEW,
  ON_SUBMIT,
  SET_TIMER,
  QUES_NUM_CLK
} from './types';
import axios from '../utils/axios';

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