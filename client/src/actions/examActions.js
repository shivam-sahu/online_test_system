import { GET_EXAM, 
  INPUT_KEYS, 
  ON_NEXT, 
  ON_OPTIONS_CHANGE, 
  ON_PRE,
  ON_SUBMIT,
  SET_TIMER
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
}

export const inputKeys = (keys) =>{
  return{
    type:INPUT_KEYS,
    payload:keys
  }
}
export const onNext=(details)=>{
	const { questionId, wantReview } = details;
	return {
    type: ON_NEXT,
    payload: {
      questionId,
      wantReview
    }
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

export const onPre = (details) => {
  const { questionId, wantReview } = details;
  return {
    type: ON_PRE,
    payload: {
      questionId,
      wantReview
    }
  };
};
export const onSubmit = userResponse=> async dispatch=>{
  const response =await axios.post("/api/user/sendResponse", userResponse)
  .then(res=>res.data)
  .catch(err=>{throw err;});
  console.log(response);
  dispatch({
    type:ON_SUBMIT,
    payload:response
  })
}

export const setTimer = (timerVal)=>{
  return {
    type:SET_TIMER,
    payload:{
      timer:timerVal
    }
  }
}