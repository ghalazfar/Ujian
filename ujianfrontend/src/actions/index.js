import axios from 'axios'
import { API } from '../supports/api-url/API'

export const onLogin = (user) => {
    return(dispatch) => {
        axios.get(API + '/users', {
            params: {
                email: user.email,
                password: user.password
            }
        }).then(user => {
            dispatch({
                type: "USER_LOGIN_SUCCESS",
                payload: { 
                    username: user.data[0].username,
                    email: user.data[0].email,
                    error: "",
                    cookieCheck: true
                }
            })      
        }).catch(err => {
            console.log(err)
            dispatch({
                type: "USER_LOGIN_FAIL"
            })
        })
    }
}

export const keepLogin = (email) => {
    return(dispatch) => {
        axios.get(API + '/users', {
            params: {
                email: email
            }
        }).then(user => {
            dispatch({
                type: "USER_LOGIN_SUCCESS",
                payload: { 
                    username: user.data[0].username,
                    email: user.data[0].email,
                    error: "",
                    cookieCheck: true
                }
            })      
        }).catch(err => {
            console.log(err)
            dispatch({
                type: "USER_LOGIN_FAIL"
            })
        })
    }
}

export const onLogout = () => {
    return {
        type: "USER_LOGOUT"
    }
}

export const cookiesChecked = () => {
    return {
        type: "COOKIES_CHECKED"
    }
}

export const onRegister = (user) => {
    return (dispatch) => {
        axios.post(API + '/users', user
        ).then((res) => {
            console.log(res)
            dispatch({
                type: "USER_LOGIN_SUCCESS",
                payload: { 
                    username: res.data.username,
                    email: res.data.email
                }
            })
        }).catch((err) => {
            console.log(err)
        })
     }
}

export const onMovieSelect = (movieID) => {
    return {
        type: "MOVIE_SELECT",
        payload: {
            selectedMovie: movieID
        }
    }
}