import React, { Component } from 'react';
import './Register.scss';
// import firebase from '../../../config/firebase';
import Button from '../../../components/atoms/Button';
import { connect } from 'react-redux';
import { registerUserAPI } from '../../../config/redux/action';

class Register extends Component {
    state = {
        email   :'',
        password:'',
    }

    handleChangeText = (e) => {
        // console.log(e.target.id)
        this.setState({
            [e.target.id] :e.target.value,
           
        })
    }   

    handleRegisterSubmit = async () => {
        // console.log('email :',this.state.email);
        // console.log('password :',this.state.password);

        const {email, password } = this.state;
        const res = await this.props.registerAPI({email,password}).catch(err => err);
        if (res) {
            this.setState({
                email:'',
                password:''
            })
        }
        
    }

    render(){
        return(
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Register Page</p>
                    <input className="input" id="email" type="text" placeholder="Email" onChange={this.handleChangeText} value={this.state.email}/>
                    <input className="input" id="password" type="password" placeholder="Password" onChange={this.handleChangeText} value={this.state.password}/>
                    <Button onClick={this.handleRegisterSubmit} title="Register" loading={this.props.isLoading}/>
                </div>
                {/* <button>Go to Dashboard</button> */}
            </div>
        )
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    registerAPI: (data) => dispatch(registerUserAPI(data))
})

export default connect(reduxState,reduxDispatch) (Register);