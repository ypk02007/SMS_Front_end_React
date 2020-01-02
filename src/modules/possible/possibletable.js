import { handleActions } from 'redux-actions';
import * as api from '../../lib/api';


export const GET_CONTRACT = 'possibletable/GET_CONTRACT';
export const GET_CONTRACT_SUCCESS = 'possibletable/GET_CONTRACT_SUCCESS';
export const GET_CONTRACT_FAILURE = 'possibletable/GET_CONTRACT_FAILURE';

const DELETE_CONTRACT = 'possibletable/DELETE_CONTRACT';
const DELETE_CONTRACT_SUCCESS = 'possibletable/DELETE_CONTRACT_SUCCESS';
const DELETE_CONTRACT_FAILURE = 'possibletable/DELETE_CONTRACT_FAILURE'


export const getDeleteData = selectedRowKeys => async dispatch => {
    dispatch({type: DELETE_CONTRACT});
    try{
        await api.getDeleteContracts(selectedRowKeys);
        dispatch({type: DELETE_CONTRACT_SUCCESS});
    }catch(e){
        dispatch({
            type: DELETE_CONTRACT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }

    dispatch({ type: GET_CONTRACT });
    try {
        const response = await api.getTempContracts();
        dispatch({
            type: GET_CONTRACT_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_CONTRACT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}

export const getContractList = () => async dispatch => {
    dispatch({ type: GET_CONTRACT });
    try {
        const response = await api.getTempContracts();
        dispatch({
            type: GET_CONTRACT_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_CONTRACT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

const initialState = {
    visible: false,
    contractList: null,
    loadingTable: false
}

const possibletable = handleActions(
    {

        [DELETE_CONTRACT]: state =>({
            ...state,
            loadingTable:true
        }),

        [DELETE_CONTRACT_SUCCESS]: state =>({
            ...state,
            loadingTable: false,
        }),

        [DELETE_CONTRACT_FAILURE]: state =>({
            ...state,
            loadingTable: false,
        }),


        [GET_CONTRACT]: state => ({
            ...state,
            loadingTable: true
        }),
        [GET_CONTRACT_SUCCESS]: (state, action) => ({
            ...state,
            loadingTable: false,
            contractList: action.payload,
        }),
        [GET_CONTRACT_FAILURE]: (state, action) => ({
            ...state,
            loadingTable: false
        }),
    },
    initialState,
);

export default possibletable;