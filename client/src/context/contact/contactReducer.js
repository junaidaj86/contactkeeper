import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    FILTER_CONTACT
} 
 from '../types';

export default (state, action) =>{
    switch(action.type){
        case ADD_CONTACT:
            return {
                ...state,
                contacts:[...state.contacts, action.payload]
            };
        default: return state;
    }
}