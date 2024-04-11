import React, {useState} from "react";
import {Button,Form,FormGroup,Input,Label} from 'reactstrap';
import "./SignupForm.css"
import { useNavigate } from "react-router-dom";
const SignupForm = ({signup})=>{
    const INITIAL_STATE = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    }
    const navigate = useNavigate();
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData(data => ({...data, [name]:value}))
    }

    async function handleSubmit(e){
        e.preventDefault();
        let result = await signup(formData);
        if(result.success){
          navigate('/')
        }else{
          console.log('failed')
        }

    }
    return(
        <>
            
            <Form className="form" onSubmit={handleSubmit}>
            <h1>Signup</h1>
            <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              value= {formData.username}
              onChange= {handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              value= {formData.password}
              onChange= {handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              value= {formData.firstName}
              onChange= {handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              value= {formData.lastName}
              onChange= {handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="example@example.com"
              value= {formData.email}
              onChange= {handleChange}
            />
          </FormGroup>
        {/* <p>username: {formData.lastName}</p> */}
        <Button type="submit" onSubmit={handleSubmit}>Submit</Button>
      </Form>
        </>
    )
}


export default SignupForm;