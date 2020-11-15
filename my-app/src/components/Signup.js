import React, { useState, useEffect } from "react";
import * as yup from 'yup';
import { axiosWithAuth } from '../utils/axiosWithAuth';



const formSchema = yup.object().shape({
    username: yup.string().required("Name is a required field."),
    password: yup.string().required("Must create a password"),
    terms: yup.boolean().oneOf([true], "Please agree to the terms of use"),
});

const initialCredentials = {
  credentials: { username: "", password: "" },
  terms: "",
  error: "",
};


function Signup() {

const [formState, setFormState] = useState(initialCredentials);

const [errors, setErrors] = useState({
    username: "",
    password: "",
    terms: "",
  });


const [newForm, setNewForm] = React.useState([]);


const [buttonDisabled, setButtonDisabled] = useState(true);

useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

const handleSignupChange = e => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    validateChange(e);
    setFormState(newFormData);
  };

  const handleSignupSubmit = e => {
      e.preventDefault();
      axiosWithAuth()
      .post("https://how-to-backend-lambda.herokuapp.com/api/register", formState)
      .then((res)=>{
        window.localStorage.setItem('token', res.data.payload);
          setNewForm(res.data);
          
          setFormState({
              username: "",
              password: "",
              terms: "",
          });   
      })
      .catch(err => console.log(err.response));
  }

 const validateChange = event => {
    yup
    .reach(formSchema, event.target.name)
    .validate(event.target.value)
    .then(valid => {
      setErrors({
        ...errors,
        [event.target.name]: ""
      });
    })
    .catch(err => {
      setErrors({
        ...errors,
        [event.target.name]: err.errors[0]
      });
    });
};

  return (
    <div className="container is-fluid" style={{ padding: '50px' }}>
    <div className="container has-text-centered box" style={{ maxWidth: '300px' }}>
    <h4 className="title">Sign up</h4>
    <form onSubmit={handleSignupSubmit}>
    <label htmlFor='username'>
      <input
        className="input is-rounded"
        onChange={handleSignupChange}
        type="text"
        name="username"
        value={formState.name}
        placeholder="Username"
      />
      {errors.username.length > 0 ? <p className='error'>{errors.username}</p> : null}
      </label>

      <label htmlFor='password'>
      <input
        className="input is-rounded"
        onChange={handleSignupChange}
        type="password"
        name="password"
        value={formState.password}
        placeholder="Password"
      />

{errors.password.length > 0 ? (
          <p className='error'>{errors.password}</p>
        ) : null}
        </label>


<label htmlFor='terms' className='checkbox'>
        <input
          type='checkbox'
          name='terms'
          checked={formState.terms}
          onChange={handleSignupChange}
        />
        Terms & Conditions
      </label>
      {/* <pre>{JSON.stringify(newForm, null, 2)}</pre> */}
      <button className="button is-medium is-primary is-fullwidth" type="submit" disabled={buttonDisabled}>Add User</button>
    </form>
    </div>
    </div>
);
  }

export default Signup;