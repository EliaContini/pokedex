import {
    FEEDBACK_ERROR,
    FEEDBACK_INFO,
    FEEDBACK_SUCCESS,
    FEEDBACK_WARNING
} from "../actionTypes";

export const initialState = {
    message: null
};

const feedback = (state = initialState, action) => {
    switch (action.type) {
        case FEEDBACK_ERROR: {
            return {
                message: {
                    payload: action.payload,
                    type: "error"
                }
            };
        }
        case FEEDBACK_INFO: {
            return {
                message: {
                    payload: action.payload,
                    type: "info"
                }
            };
        }
        case FEEDBACK_SUCCESS: {
            return {
                message: {
                    payload: action.payload,
                    type: "success"
                }
            };
        }
        case FEEDBACK_WARNING: {
            return {
                message: {
                    payload: action.payload,
                    type: "warning"
                }
            };
        }
        default: {
            return initialState;
        }
    }
};

export default feedback;
