import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../header/adminHeader';
import axios from 'axios';

class AdminDashboard extends Component {
  constructor(){
    super();
    this.state = {
      questions:'',
      selectedQuestion:'',
      selectedOptinon:'',
      isEditing:false,

    }
  }
  componentDidMount(){
    this.getData();
  }
  getData = async () => {
    const request = await axios.get("http://localhost:3001/api/admin/profile")
      .then(res => res.data)

    this.setState({
      questions:request
    })

  }
  render() {
    const {questions} = this.state;
    return (<div>
      <Header/>
      { 
        questions ?
        questions.map((queObj, qindex)=>{
          return(
          <div key={qindex}>
            <div>
              <span>{qindex+1}. </span>
              <span>{queObj.question}</span>
            </div>
            <div>
              {   
                queObj.options ?
                queObj.options.map((opt, optindex)=>(
                  <div key={optindex}>
                    <span>{opt.id}. </span>
                    <span>{opt.val}</span>
                  </div>
                ))
                :
                null
              }
            </div>
          </div>
        )
      }):
      null
    }
    </div>);
  }
}

export default AdminDashboard;