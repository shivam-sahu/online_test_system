import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import setAuthToken from '../../utils/setAuthToken';

class AdminLogin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userId: '',
			password: '',
			success: false,
			error: ''
		}
	}
	componentDidMount() {


	}

	postData = async (obj) => {
		const request = await axios.post("http://localhost:3001/api/user/login", obj)
			.then(res => res.data
			)
		const { token } = request;
		localStorage.setItem('jwtToken', token);
		setAuthToken(token);
		// const decoded =  jwt_decode(token);
		// console.log(decoded);
		if (request.isAuth) {
			this.props.history.push("/user/dashboard");
		}
	}


	render() {
		const { userId, password } = this.state;
		return (<div>

			<form>
				Username/Id:<br></br>
				<input type="text" value={userId} onChange={(e) => this.handleUserIdChange(e)}></input><br></br>
        password:<br></br>
				<input type="password" value={password} onChange={(e) => this.handlePasswordChange(e)}></input><br></br>
				<button onClick={(e) => this.loginbtnClk(e, userId, password)}>Login</button>
			</form>
			<Link to={`/user/dashboard`}> user </Link>
		</div>
		);
	}

	handleUserIdChange = (e) => {
		this.setState({
			userId: e.target.value
		});
	}

	handlePasswordChange = (e) => {
		this.setState({
			password: e.target.value
		});
	}



	loginbtnClk = (e, userId, password) => {
		e.preventDefault();
		if (!userId || !password) {
			console.log("enter username and password");
		} else if (password.length < 8) {
			console.log("password must contain at least 8 characters!");
		}
		else {
			const credentials = {
				userId,
				password
			}
			this.postData(credentials);
			this.setState({
				userId: '',
				password: '',
				success: true
			});
		}
	}

}

export default AdminLogin;