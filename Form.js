import React from 'react'
import { useState, useEffect } from 'react';

function Form() {
    const startvalues = { username:"", email:"", password:""};
    const [formvalues,setFormValues] = useState(startvalues);
    const [formerrors,setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const{name,value} = e.target;
        setFormValues({...formvalues,[name]:value});
        console.log(formvalues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formvalues));
        setIsSubmit(true);
    }

    useEffect(() => {
        if(Object.keys(formerrors).length === 0 && isSubmit) {
            console.log(formvalues);
        }
    },[formerrors]);

    const validate = (values) => {
        const error = {};
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.username) {
            error.username = "Username is required!";
        }
        if(!values.email) {
            error.email = "Email is required!";
        } else if (valid.test(values.email)) {
            error.email = "Email is Invalid";
        }
        if(!values.password) {
            error.password = "Password is required!";
        } else if (values.password < 4) {
            error.password = "Password must not be less than 4";
        }
        return error;
    }

    return (
        <div className="padding">
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Dynamic Form</h1>
                <hr width="400px"></hr>
                <div>
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Enter Username" value={formvalues.username} onChange={handleChange} />
                </div>
                <p>{formerrors.username}</p><br></br>
                <div>
                    <label>Email </label><br></br>
                    <input type="text" name="email" placeholder="Enter email" value={formvalues.email} onChange={handleChange}/>
                </div>
                <p>{formerrors.email}</p><br></br>
                <div>
                    <label>Password </label>
                    <input type="password" name="password" placeholder="Enter password" value={formvalues.password} onChange={handleChange}/>
                </div>
                <p>{formerrors.password}</p><br></br>
                <button>Submit</button>
            </form>
         </div>
         </div>
    )
}

export default Form;