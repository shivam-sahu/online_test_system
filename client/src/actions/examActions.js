import { ON_NEXT, ON_OPTIONS_CHANGE, ON_PRE} from './types';

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