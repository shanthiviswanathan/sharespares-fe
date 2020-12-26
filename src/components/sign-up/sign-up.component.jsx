import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      memberId: '',
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      location:'',
      securityQuestion1: '',
      securityAnswer1: '',
      securityQuestion2: '',
      securityAnswer2: '',      
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;
    
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.setState({'memberId': user.uid})
      await createUserProfileDocument(user, { displayName });

      await fetch('http://localhost:4000/register', {
        method: 'post',
        body: JSON.stringify(this.state),
        headers: {
            'Content-Type': 'application/json'
        }    
      }).then(res => { 
          if (res.status >= 400) {
            throw new Error("Bad response from server");
          }
          return res.json
        }).then(data => console.log('memberId = ', data.id));

      this.setState({
        memberId:'',
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        location: '',
        securityQuestion1: '',
        securityAnswer1: '',
        securityQuestion2: '',
        securityAnswer2: ''         
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword, location, securityQuestion1, securityAnswer1, securityQuestion2, securityAnswer2  } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Confirm Password'
            required
          />
          <FormInput
          type='text'
          name='location'
          value={location}
          onChange={this.handleChange}
          label='Location'
          required
          />
          <FormInput
            type='text'
            name='securityQuestion1'
            value={securityQuestion1}
            onChange={this.handleChange}
            label='Security Question 1'
            required
          />
          <FormInput
            type='text'
            name='securityAnswer1'
            value={securityAnswer1}
            onChange={this.handleChange}
            label='Security Answer 1'
            required
          /> 
          <FormInput
            type='text'
            name='securityQuestion2'
            value={securityQuestion2}
            onChange={this.handleChange}
            label='Security Question 2'
            required
          />
          <FormInput
            type='text'
            name='securityAnswer2'
            value={securityAnswer2}
            onChange={this.handleChange}
            label='Security Answer 2'
            required
          />                             
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;