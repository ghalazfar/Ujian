const INITIAL_STATE = { username: "", email: "", error: "", cookieCheck: false }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "USER_LOGIN_SUCCESS" :
            return action.payload;
        case "USER_LOGIN_FAIL" :
            return {...state, error: "Wrong Email or Password"};
        case "USER_LOGOUT":
            return { ...INITIAL_STATE, cookieCheck: true}
        case "COOKIES_CHECKED":
            return {...state, cookieCheck: true};
        default :
            return state
    }
}