import { handleActions,createAction} from 'redux-actions';
import * as api from '../../lib/api';
// import produce from 'immer';

const SHOW_MODAL = 'conthist/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'conthist/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'conthist/SHOW_MODAL_FAILURE';

const MODAL_CANCEL = 'conthist/MODAL_CANCEL'

export const gethandleCancel = createAction(MODAL_CANCEL);


export const gethistShowModal = (contId) => async dispatch => {
    dispatch({ type: SHOW_MODAL });
    try {
        const response = await api.getHistList(contId)
        dispatch({
            type: SHOW_MODAL_SUCCESS,
            payload: {
                histList: response.data
            }
        });
    } catch (e) {
        dispatch({
            type: SHOW_MODAL_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}


const initialState = {
    visible: false,
    loadingTable: false,
    histList: [],
}

const conthist = handleActions(
    {
        [SHOW_MODAL]: state => ({
            ...state,
            visible: true,
            loadingTable: true,
        }),
        [SHOW_MODAL_SUCCESS]: (state, action) => ({
            ...state,
            histList:action.payload.histList,
            loadingTable: false,
        }),

        [SHOW_MODAL_FAILURE]: (state) => ({
            ...state,
            loadingTable: false,
        }),

        [MODAL_CANCEL]: (state) => ({
            ...state,
            visible: false,
        })
    },
    initialState,
);

export default conthist;
