import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onLogin } from '../actions';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

class LoginPage extends Component {
    componentWillReceiveProps(newProps) { 
        if(newProps.authGlobal.username !== ""){
            cookies.set('myCat', newProps.authGlobal.email, { path: '/'})
        }
    }

    onLoginClick = () => {
        var email= this.refs.email.value
        var password= this.refs.password.value

        this.props.onLogin({ email, password })
    }

    render() {
        console.log(this.props.authGlobal.email)
        if (this.props.authGlobal.email === "") {
            console.log(this.props.authGlobal.email)
            return (
                <div className="container-fluid">
                    <div className="col-xs-4 col-xs-push-4">
                        <div className="card card-container">
                            <img className="profile-img-card" src="https://assets.change.org/photos/8/ac/aq/ouaCAQdZspeVZCl-128x128-noPad.jpg" alt="" />                            
                            <p id="profile-name" className="profile-name-card"></p>
                            <form className="form-signin">
                                <span id="reauth-email" className="reauth-email"></span>
                                <input type="email" ref="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus/>
                                <input type="password" ref="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                                <div id="remember" className="checkbox">
                                    <label>
                                        <input type="checkbox" value="remember-me"/> Remember me
                                    </label>
                                </div>
                                <input type="button" className="btn btn-lg btn-primary btn-block btn-signin" value="Sign in" onClick={this.onLoginClick}/>
                                <h3 className="label label-danger">{this.props.authGlobal.error}</h3>
                            </form>
                            <a href="#" className="forgot-password">
                                Forgot the password?
                            </a>                         
                        </div>
                    </div>
                </div>
            );
        }
        return <Redirect to='/' />
    }
}

const mapStateToProps = (state) => {    
    const auth = state.auth;
    return { authGlobal: auth };
}

export default connect(mapStateToProps, { onLogin })(LoginPage);