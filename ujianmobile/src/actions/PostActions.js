import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import { POST_IMAGE, IMAGE_FORM, IMAGE_GETLIST_SUCCESS } from './types';

export const postImageForm = (prop, value) => {
    return {
        type: IMAGE_FORM,
        payload: { prop, value }
    };
};

export const imageDataPost = (caption, imageurl) => {
    const { currentUser } = firebase.auth();
    const { email } = currentUser
    return (dispatch) => {
        firebase.database().ref(`/posts`)
        .push({ caption, imageurl, email })
        .then(() => {
            dispatch({ type: POST_IMAGE });
        });
    };
};

export const getPostsList = () => {
    return (dispatch) => {
        firebase.database().ref(`/posts`)
            .on('value', snapshot => {
                dispatch({ type: IMAGE_GETLIST_SUCCESS, payload: snapshot.val() })
            })
        }
}