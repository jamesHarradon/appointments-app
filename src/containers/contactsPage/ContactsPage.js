import React from "react";
import { useState, useEffect } from "react";
import { ContactForm } from "../../components/contactForm/ContactForm";
import { TileList } from "../../components/tileList/TileList";

export const ContactsPage = (props) => {
  /*
  Define state variables for 
  contact info and duplicate check
  */
  
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ email, setEmail ] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();
    /*
    Add contact info and clear data
    if the contact name is not a duplicate
    */
    if (props.contacts && props.contacts.filter(item => {
      return item.itemOne === firstName && item.itemTwo === lastName && item.itemThree === phone;
    }).length > 0) {
      alert('This contact has already been added!');
      return;
    }
    
    let newContact = {
      id : Date.now(),
      itemOne: firstName,
      itemTwo: lastName,
      itemThree: phone,
      itemFour: email
    }
    props.setContacts((prev) => [newContact, ...prev]);

    clearForm();
  };

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
  }

  const removeItem = (idToRemove) => {
    props.setContacts(prev => (prev.filter(item => item.id !== idToRemove)));
    localStorage.setItem('contacts', JSON.stringify(props.contacts));
  };
    
  



  const sortContacts = () => {
    props.contacts.sort(function(a, b){
      let x = a.itemTwo.toLowerCase();
      let y = b.itemTwo.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
  }

  useEffect(() => {
    sortContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.contacts])

  /*
  Using hooks, check for contact name in the 
  contacts array variable in props
  */

  return (
    <div>
      <section>
        <h2>Add Contact</h2> 
        <ContactForm 
          handleSubmit={handleSubmit} 
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
        />
      </section>
      <hr />
      <section>
        <h2>Contacts</h2>
        <TileList removeItem={removeItem} data={props.contacts}/>
      </section>
    </div>
  );
};
