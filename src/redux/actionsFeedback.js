import {
    FEEDBACK_ERROR,
    FEEDBACK_INFO,
    FEEDBACK_SUCCESS,
    FEEDBACK_WARNING
} from "./actionTypes";

export const error = (actionPerformed, item) => {
    return (dispatch) => {
        dispatch({
            payload: {
                actionPerformed,
                item
            },
            type: FEEDBACK_ERROR
        });
    };
};

export const info = (actionPerformed, item) => {
    return (dispatch) => {
        dispatch({
            payload: {
                actionPerformed,
                item
            },
            type: FEEDBACK_INFO
        });
    };
};

export const success = (actionPerformed, item) => {
    return (dispatch) => {
        dispatch({
            payload: {
                actionPerformed,
                item
            },
            type: FEEDBACK_SUCCESS
        });
    };
};

export const warning = (actionPerformed, item) => {
    return (dispatch) => {
        dispatch({
            payload: {
                actionPerformed,
                item
            },
            type: FEEDBACK_WARNING
        });
    };
};
