import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getExam, inputKeys} from '../../../actions/examActions';
// import Exam from './exam';
const UserDashboard=  (props)=>{
	const  exam = useSelector(state => state.exam);
	const {adminKey:oldAdminKey, examKey:oldExamKey} = exam;
	const dispatch = useDispatch();
	const [adminKey, setAdminKey] = useState(oldAdminKey);
	const [examKey, setExamKey] = useState(oldExamKey);
	const inputExamKeys = ()=>{
		dispatch(inputKeys({adminKey, examKey}));
		props.history.push("/user/exam");
	}
	return(
		<div>
				Admin Key:
				<br></br>
				<input value={adminKey} onChange={(e)=>setAdminKey(e.target.value)}></input>
				<br></br>
				Exam Key:
				<br></br>
				<input value={examKey} onChange={(e)=>setExamKey(e.target.value)}></input>
				<br></br>
				<button onClick={()=>inputExamKeys()}>Enter</button>
		</div>
	)
}

// import {connect } from "react-redux";
// import {bindActionCreators} from 'redux';
// class UserDashboard extends React.Component{
// 	constructor(props){
// 		super(props);
// 	}
// 	state={
// 		adminKey:"",
// 		examKey:""
// 	}
// 	setAdminKey=(value)=>{
// 		this.setState({adminKey:value})
// 	}
// 	setExamKey=(value)=>{
// 		this.setState({examKey:value})
// 	}
// 	render(){
// 		console.log(this.props)
// 		return (<div>
//  			{/* <form> */}
//  				Admin Key:
//  				<br></br>
//  				<input value={this.state.adminKey} onChange={(e)=>this.setAdminKey(e.target.value)}></input>
//  				<br></br>
//  				Exam Key:
//  				<br></br>
//  				<input value={this.state.examKey} onChange={(e)=>this.setExamKey(e.target.value)}></input>
//  				<br></br>
//  				<button onClick={()=>{this.props.inputKeys({adminKey:this.state.adminKey, examKey:this.state.examKey})}}>Enter</button>
// 				 {/* <button>click me</button> */}
//  			{/* </form> */}
//  		</div>)
// 	}
// }
// const mapDispatchToProps = dispatch=>{
// 	return bindActionCreators({inputKeys}, dispatch);
// }
// const mapStateToProps= state=>{
// 	const {exam} = state;
// 	return exam;
// }
// export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
export default UserDashboard;