import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { onRegister } from '../actions'

class RegisterPage extends Component {

    onRegisterClick = () => {
        this.props.onRegister({
            username: this.refs.username.value,
            email: this.refs.email.value,
            password: this.refs.password.value,
        })
    }
    render() {
        if (this.props.authGlobal.email != "") {
            console.log(this.props.authGlobal.email)
            return <Redirect to='/' />
        }
        return (
            <div className="login-background">
                <div className="container">
                    <div className="card card-container">
                        <img className="profile-img-card" src="https://assets.change.org/photos/8/ac/aq/ouaCAQdZspeVZCl-128x128-noPad.jpg" alt="" />                        
                        <p id="profile-name" className="profile-name-card"></p>
                        <form className="form-signin">
                            <span id="reauth-email" className="reauth-email"></span>
                            <input type="text" ref="username" id="inputUsername" className="form-control" placeholder="Nama" required autofocus/>
                            <input type="email" ref="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus/>
                            <input type="password" ref="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                            <div id="remember" className="checkbox">
                                <label>
                                    <input type="checkbox" value="remember-me"/> Remember me
                                </label>
                            </div>
                            <input type="button" className="btn btn-lg btn-primary btn-block btn-signin" value="Register" onClick={this.onRegisterClick}/>
                        </form>
                        <a href="#" className="forgot-password">
                            Forgot the password?
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const auth = state.auth;
    return { authGlobal: auth };
}
export default connect(mapStateToProps, { onRegister })(RegisterPage);
