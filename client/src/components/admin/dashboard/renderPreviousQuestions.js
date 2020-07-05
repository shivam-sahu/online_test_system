import React from 'react';
import crossIcon from '../../../assets/icons/crossWhite.svg';
import crossIconRed from '../../../assets/icons/crossred.svg';
import './renderPreviousQuestion.css'
class RenderPreviousQuestion extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isQuestionCrossHover: false
		}
	}
	render(){
		const {value, index  } = this.props;
		const { options, questionText, id, correctAnsId } = value;
		return(
			<div key={index} className='question' >
				<div className='questionTextWrapper'>
					<span>{index + 1}. {questionText}</span>
					<span
						onMouseEnter={() => this.setState({ isQuestionCrossHover: true })}
						onMouseLeave={() => this.setState({ isQuestionCrossHover: false })}
						onClick={() => { this.props.removeQuestion(index) }} >
						{
							this.state.isQuestionCrossHover ?
								<img className='crossIcon' src={crossIconRed} alt='remove' />
								:
								<img className='crossIcon' src={crossIcon} alt='remove' />
						}

					</span>
				</div>
				<div>
					{options.map((val, idx) => {
						return (
							<div key={idx} className='options'>
								{String.fromCharCode(65 + idx)}. <label>{val.value}</label> 
							</div>
						);
					})}
				</div>
			</div>
		)
	}
}

export default RenderPreviousQuestion;