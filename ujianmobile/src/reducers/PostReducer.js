import {
    IMAGE_FORM,
    POST_IMAGE
} from '../actions/types';

const INITIAL_STATE = {
    caption: '',
    imageurl: '',
    email: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POST_IMAGE:
            return INITIAL_STATE;
        case IMAGE_FORM:
            return { ...state, [action.payload.prop]: action.payload.value };
        default:
            return state;
    }
};
