import React,{useState} from "react";
import {Button,Form,FormGroup,Input,Label} from 'reactstrap';
import "./SignupForm.css"
import { useNavigate } from "react-router-dom";



const LoginForm = ({login})=>{
    const INITIAL_STATE={
        username: "",
        password: ""
    }
    const navigate = useNavigate();
    const [formData, setFormData] = useState(INITIAL_STATE);
    
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData(d => ({...d, [name]:value}))
    }

    async function handleSubmit(e){
        e.preventDefault();
        let result = await login(formData);
        if(result.success){
            navigate('/')
        }
    }
    return(
        <>
           
            <Form className="form" onSubmit={handleSubmit}>
            <h1>Login</h1>
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



        {/* <p>username: {formData.lastName}</p> */}
        <Button type="submit" onSubmit={handleSubmit} >Submit</Button>
      </Form>
        </>
    )
}

export default LoginForm;
