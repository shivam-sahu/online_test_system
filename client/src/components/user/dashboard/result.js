import React from 'react';
import { useSelector} from 'react-redux';


const Result = (props)=>{
	const {score} = useSelector(state => state.exam);
	const onExit = ()=>{
		props.history.push("/user/dashboard");
	}
	return(<div>
		{`Your Score is : ${score}`}
		<br></br>
		<button onClick={()=>onExit()}>Exit</button>
	</div>)
}

export default Result;