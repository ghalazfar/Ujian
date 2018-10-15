const INITIAL_STATE = { selectedMovie: 0 }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "MOVIE_SELECT" :
            return action.payload;
        default :
            return state
    }
}