import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

const CreateGroup = ({ currentUser }) => { 
    console.log('In create group = ', currentUser);
    const history = useHistory();
    const [inputs, setInputs] = useState({
        name: '',
        description: '',
        admin: currentUser.id,
        location: '',
        visibility:'PRIVATE',
        memberLimit: '',
        rsvpStarttime: ''
    });
        
    const handleSubmit = async event => {
      event.preventDefault();
  
      try {
        await fetch('http://localhost:4000/api/groups', {
          method: 'post',
          body: JSON.stringify(inputs),
          headers: {
              'Content-Type': 'application/json'
          }    
        }).then(res => { 
            if (res.status >= 400) {
              throw new Error("Bad response from server");
            }
            return res.json
          }).then(data => console.log('Group Id = ', data));
        alert("Group successfully created")  
       
      } catch (error) {
        console.error(error);
      }

      history.push( {pathname: '/dashboard'});
    };
  
    const handleChange = event => {
      const { name, value } = event.target;
  
      setInputs({...inputs, [name]: value });
    };
  
    return (
        <div className='create-group'>
          <h2 className='title'>Create a new group</h2>
          <form className='create-group-form' onSubmit={handleSubmit}>
            <FormInput
              type='text'
              name='name'
              value={inputs.name}
              onChange={handleChange}
              label='Group Name'
              required
            />
            <FormInput
              type='text'
              name='description'
              value={inputs.description}
              onChange={handleChange}
              label='Description'
              required
            />
            <FormInput
            type='hidden'
            name='admin_id'
            value={inputs.admin}
            onChange={handleChange}
            label=''
            required
          />
            <FormInput
            type='text'
            name='location'
            value={inputs.location}
            onChange={handleChange}
            label='Location'
            required
          />
          <FormInput
          type='text'
          name='visibility'
          value={inputs.visibility}
          onChange={handleChange}
          label='Visibility'
          required
        />
            <FormInput
              type='text'
              name='memberLimit'
              value={inputs.memberLimit}
              onChange={handleChange}
              label='Max Allowed Members'
              required
            />
            <FormInput
              type='text'
              name='rsvpStarttime'
              value={inputs.rsvpStarttime}
              onChange={handleChange}
              label='RSVP Start Date'
              required
            /> 
             <CustomButton type='submit'>Create</CustomButton>
          </form>
        </div>
      );
  }
  
  export default CreateGroup;