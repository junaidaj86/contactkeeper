import React, { useReducer} from 'react';
import contactContext from './contactContext';
import contactReducer from './contactReducer';

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

 const ContactState = props =>{
    const initialState = {
        contacts: [
            {
                id:1,
                name:"junaid",
                email:"junaid@gmail.com",
                phone:"9538763844",
                type:"professional"
            }
        ]
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Add contact
    const addContact = (contact)=>{
        dispatch({type:ADD_CONTACT, payload: contact});
    }

    //Delete Contact

    //Update Contact

    //Set current contact

    //clear current contact

    //filter contact

    //clear filter


    return (
        <contactContext.Provider value={
            {
                contacts: state.contacts,
                addContact
            }
        }>
            {props.children}
        </contactContext.Provider>
    )
 };


 export default ContactState;


