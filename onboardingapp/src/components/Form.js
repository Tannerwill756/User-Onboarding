import React, { useState } from 'react';
import * as yup from 'yup';


function Form() {

    const [ formState, setFormState ] = useState({
        name:"hello",
        email:"",
        password:"",
    })

    const formSubmit = event => {
        event.preventDefault();
        console.log('Form Submitted!');
    }

    const inputChange = event => {
        console.log("input changed!", event.target.value);
        setFormState({ name: event.target.value});
    }

    return(
        <form onSubmit={formSubmit}>
            <label htmlFor="name"> Name
                <input id="name" type="text" value={formState.name} onChange={inputChange}/>
            </label>
            <label htmlFor="email"> Email
                <input id="email" type="text" value={formState.email} onChange={inputChange}/>
            </label>
            <label htmlFor="password"> Password
                <input id="password" type="text" value={formState.password} onChange={inputChange}/>
            </label>
            <label htmlFor="terms"> 
                <input name="terms" type="checkbox" onChange={inputChange}/>Terms and Conditions
            </label>
            <button>Submit</button>
        </form>
    )
}


export default Form;