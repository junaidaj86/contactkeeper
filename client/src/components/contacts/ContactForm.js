import React, {useState, useContext} from 'react';
import ContactContext from '../../context/contact/contactContext';

function ContactForm() {
    const contactContext = useContext(ContactContext);
    const [contact, setContact] = useState({
        name:'',
        email:'',
        phone:'',
        type:'personal'
    });

   
    const onInputChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = (event)=>{
        event.preventDefault();
        contactContext.addContact(contact);
        setContact({
            name:'',
            email:'',
            phone:'',
            type:'personal'
        });
    }
    const {name, email, phone, type} = contact;


    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">Add Contact</h2> 
            <input type='text' placeholder='name'  name='name' value={name} onChange={onInputChange}/>
            <input type="email" placeholder="email" name="email" value={email} onChange={onInputChange}/>
            <input type="text" placeholder="phone" name="phone" value={phone} onChange={onInputChange}/>
           <h5>Contact Type</h5>
           <input type="radio" name="type" value="personal" checked={type === "personal"}/>Personal {' '}
           <input type="radio" name="type" value="professional" checked={type === "professional"}/>Professional {' '}
           <div>
                <input type="submit" value="Add Contact" className="btn btn-primary btn-block"/>
           </div>
        </form>
    )
}

export default ContactForm
