import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

const CreateItem = ({ groupId, currentUser }) => { 
    console.log('In create item = ', groupId, ' ', currentUser);
    const history = useHistory();
    var ownerId = ''
    var ownerType = ''
    if (groupId === -1) {
        ownerId = currentUser.id;
        ownerType = 'USER'
    }
    else {
        ownerId = groupId;
        ownerType = 'GROUP'
    }
    const [inputs, setInputs] = useState({
        title: '',
        subtitle: '',
        description: '',
        status: 'AVAILABLE',
        ownerId: ownerId,
        ownerType: ownerType,
        category: '',
        location: '',
        featuredDesc1: '',
        featuredDesc2: '',
        featuredDesc3: '',
        price: 0,
        rentalCost: 0,
        highlights:'',
        visibility: 'PRIVATE',
        thumbnailImage: ''
    });
        
    const handleSubmit = async event => {
      event.preventDefault();
  
      try {
        await fetch('http://localhost:4000/api/items', {
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
          }).then(data => console.log('Item Id = ', data));
        alert("Item successfully created")  
       
      } catch (error) {
        console.error(error);
      }

      history.push( {pathname: '/dashboard'});
    };
  
    const handleChange = event => {
      const { name, value } = event.target;
  
      setInputs({...inputs, [name]: value });
    };
  
    const handleChangeNumeric = e => {
        let valu = e.target.value;
       
        if (!Number(valu)) {
        return;
        }
       
        this.setInputs({...inputs, [e.target.name]: valu });
       };
    return (
        <div className='create-item'>
          <h2 className='title'>Create a new Item</h2>
          <form className='create-item-form' onSubmit={handleSubmit}>
            <FormInput
              type='text'
              name='title'
              value={inputs.title}
              onChange={handleChange}
              label='Item Title'
              required
            />
            <FormInput
            type='text'
            name='subtitle'
            value={inputs.subtitle}
            onChange={handleChange}
            label='Item Subtitle'
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
              type='text'
              name='category'
              value={inputs.category}
              onChange={handleChange}
              label='Category'
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
              name='featuredDesc1'
              value={inputs.featuredDesc1}
              onChange={handleChange}
              label='Featured Description 1'
            />
            <FormInput
              type='text'
              name='featuredDesc2'
              value={inputs.featuredDesc2}
              onChange={handleChange}
              label='Featured Description 2'
            />
            <FormInput
            type='text'
            name='featuredDesc3'
            value={inputs.featuredDesc3}
            onChange={handleChange}
            label='Featured Description 3'
          />
            
            <FormInput
              type='text'
              name='price'
              value={inputs.price}
              onChange={handleChangeNumeric}
              label='Price'
            />
          <FormInput
          type='text'
          name='rentalCost'
          value={inputs.rentalCost}
          onChange={handleChangeNumeric}
          label='Rental Charge'
        /> 
        <FormInput
        type='text'
        name='highlights'
        value={inputs.highlights}
        onChange={handleChange}
        label='Highlights'
      />  
      <FormInput
      type='text'
      name='visibility'
      value={inputs.visibility}
      onChange={handleChange}
      label='Visibility'
      />
      <FormInput
      type='text'
      name='thumbnailImage'
      value={inputs.thumbnailImage}
      onChange={handleChange}
      label='Item Image FileName' 
      />   <div className='buttons'>                          
             <CustomButton type='submit'>Create</CustomButton>
             <CustomButton onClick={() => history.push( {pathname: '/dashboard'})} >
               Cancel
             </CustomButton>          
           </div>    
          </form>
        </div>
      );
  }
  
  export default CreateItem;