import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import styles from './index.module.css';
import {quesNumClk} from '../../actions/examActions';

class ProgressBar extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		const { markedForReview, currentAttempting, responseArray} = this.props;
	return (
	<div className={styles.progressBar}>
		{
			markedForReview.map((value, index)=>{
			return(
				<div key={index} 
				className={`${styles.checkpoint} ${
					index === currentAttempting ? styles.blueItem :
					(value === true ? styles.yellowItem :
						responseArray[index].attempted === true ? styles.greenItem :
							styles.greyItem)}`}

					onClick ={()=>this.props.quesNumClk(index)}>
					{index+1}</div>
				)
				})
		}
		
	</div>
	);
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ quesNumClk }, dispatch);
}
const mapStateToProps = (state) => {
	const { exam } = state;
	return exam;
}
export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);