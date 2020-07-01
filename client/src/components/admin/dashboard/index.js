import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../header/adminHeader';
import axios from 'axios';
import SetExam from './setExam';

class AdminDashboard extends Component {
  render(){
    return (<SetExam/>)
  }
}
export default AdminDashboard;