import React, {useState, useContext} from "react";
import JoblyApi from "../api/api";
import UserContext from "../auth/UserContext";
import {Alert, Button,Form,FormGroup,Input,Label} from 'reactstrap';
import './ProfileForm.css'



const ProfileForm = ()=>{
    const { currentUser, setCurrentUser } = useContext(UserContext);
      // switch to use our fancy limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useState(false);
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
      });
      const [formErrors, setFormErrors] = useState([]);

      async function handleSubmit(evt) {
        evt.preventDefault();
    
        let profileData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        };
    
        let username = formData.username;
        let updatedUser;
    
        try {
          updatedUser = await JoblyApi.saveProfile(username, profileData);
        } catch (errors) {
          debugger;
          setFormErrors(errors);
          return;
        }
    
        setFormData(f => ({ ...f, password: "" }));
        setFormErrors([]);
        // setSaveConfirmed(true);
        setSaveConfirmed(true);
        // trigger reloading of user information throughout the site
        setCurrentUser(updatedUser);
      }


        /** Handle form data changing */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

    return(
        <div className="profile-form">
        
        <Form className="form-profile" onSubmit={handleSubmit}>
        <h1>Profile </h1>
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
        {formErrors.length
                  ? <Alert type="danger" messages={formErrors} />
                  : null}
        {saveConfirmed
                  ?
                  <div className="alert alert-success">Updated successfully! </div>
                  : null}
        
        <Button  onSubmit={handleSubmit}>Save Changes</Button>
      </Form>
        </div>
    )
}

export default ProfileForm;