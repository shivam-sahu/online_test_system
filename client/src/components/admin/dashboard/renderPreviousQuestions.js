import React,{useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {removeQuestion} from '../.../../../../actions/adminActions';
import crossIcon from '../../../assets/icons/crossWhite.svg';
import crossIconRed from '../../../assets/icons/crossred.svg';
import './renderPreviousQuestion.css'
const  RenderPreviousQuestion=(props) =>{
		
		const dispatch = useDispatch();

		const [isQuestionCrossHover, setQuestionCrossHover] = useState(false);
		const {value, index  } = props;
		const { options, questionText, id, correctAnsId } = value;
		return(
			<div key={index} className='question' >
				<div className='questionTextWrapper'>
					<span>{index + 1}. {questionText}</span>
					<span
						onMouseEnter={() => setQuestionCrossHover( true) }
						onMouseLeave={() => setQuestionCrossHover(false)}
						onClick={() => { dispatch(removeQuestion(index)) }} >
						{
							isQuestionCrossHover ?
								<img className='crossIcon' src={crossIconRed} alt='remove' />
								:
								<img className='crossIcon' src={crossIcon} alt='remove' />
						}

					</span>
				</div>
				<div>
					{options.map((val, idx) => {
						return (
							<div key={idx} 
							className={`options ${parseInt(correctAnsId) === idx ? "optionsCorrect" :""} `}
							>
								{String.fromCharCode(65 + idx)}. <label>{val.value}</label> 
							</div>
						);
					})}
				</div>
			</div>
		)
}

export default RenderPreviousQuestion;