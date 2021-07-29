import React from "react";


export const ContactPicker = (props) => {
  return (
    <select onChange={props.addContact} name='contacts' id='contacts'>
      <option id='default' key='1' selected disabled hidden value='Please select contact'>Please select contact</option>
      {props.contacts.map(contact => {
        return <option key={contact.id} id={contact.id}  value={`${contact.itemOne} ${contact.itemTwo}`}>{contact.itemOne} {contact.itemTwo}</option>
      })}
    </select>
  )
};

// need to find out how to reset to default select value on submit!!
