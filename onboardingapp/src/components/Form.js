import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import './Form.css'

const FormStyle = styled.div`
    display:flex;
    flex-direction:column;
`;

const formSchema = yup.object().shape({
    name: yup.string().required("Please provide your name"),
    password: yup.string().required("Please provide a password"),
    email: yup.string().email().required("Please provide an email"),
    terms: yup.boolean().oneOf([true], "Please agree to terms of use")
})

function Form() {

    const [ formState, setFormState ] = useState({
        name:"",
        password:"",
        email:"",        
        terms:""
    })

    const [ errors, setErrors ] = useState({
        name:"",
        password:"",
        email:"",        
        terms:""
    })

    const [ users, setUsers ] = useState ([])

    const [ buttonDisable, setButtonDisable ] = useState(true);


    const [ post, setPost ] = useState([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisable(!valid);
        })
    }, [formState]);

    const validateChange = event => {
        yup
            .reach(formSchema, event.target.name)
            .validate(event.target.value)
            .then(valid => {
                setErrors({ ...errors, [event.target.name] : "" });
            })
            .catch( err => {
                setErrors({ ...errors, [event.target.name] : err.errors});
            })
    }

    const formSubmit = event => {
        event.preventDefault();
        axios
            .post('https://reqres.in/api/users', formState)
            .then(response => {
                setPost(response.data);
                setUsers([...users, response.data])
            
                console.log("success", post);

                setFormState({
                    name:"",
                    password:"",
                    email:""
                })
            })
            .catch(err => {
                console.log('you got an error',err.response)
            })
    }

    const inputChange = event => {
        event.persist();
        const newFormData = {
            ...formState,
            [event.target.name] : event.target.type === "checkbox" ? event.target.checked : event.target.value
        }
        validateChange(event);
        setFormState(newFormData);
    }

    return(
        <form onSubmit={formSubmit}>
            <FormStyle>

                <label className="label" htmlFor="name"> Name
                    <input id="name" type="text" name="name" value={formState.name} onChange={inputChange}/>
                    {errors.name.length > 0 ? <p data-cy ="nameError" className="error">{errors.name}</p> : null}
                </label>

                <label className="label" htmlFor="password"> Password
                    <input id="password" type="password" name="password" value={formState.password} onChange={inputChange}/>
                    {errors.password.length > 0 ? <p data-cy ="pwdError" className="error">{errors.password}</p> : null}
                </label>

                <label className="label" htmlFor="email"> Email
                    <input id="email" type="email" name="email" value={formState.email} onChange={inputChange}/>
                    {errors.email.length > 0 ? <p data-cy="emailError" className="error">{errors.email}</p> : null}
                </label>

                <label className="checkbox" htmlFor="terms"> 
                    <input name="terms" type="checkbox" checked={formState.terms} onChange={inputChange}/>Terms and Conditions
                </label> <br/>
                
                <button type="submit" disabled={buttonDisable}>Submit</button>

                <pre>{JSON.stringify(post, null, 2)}</pre>

                {users.map( (e) => {
                    return <div>{e.name}</div>
                })}
            </FormStyle>            
        </form>
    )
}


export default Form;