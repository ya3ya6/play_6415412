import React,{useContext, useState} from "react";
import UserContext from "../auth/UserContext";
import {Link} from 'react-router-dom';
import "./Homepage.css"

const Homepage = ()=>{
    const {currentUser} = useContext(UserContext);
    console.log('homepage current user:', currentUser)
    return(
        <div className="homepage">
            <div>
            <h1>Jobly</h1> 
                <p>All the jobs in one, convenient place.</p>

            </div>

            {currentUser
            ? <h2>Welcome back, {currentUser.firstName || currentUser.username} !</h2>
            : (
            <div className="homepage-logged-out">


                <p className="buttons">
                    <Link className="btn btn-primary btn-lg mr-3" 
                          to="/login">
                            Log in
                    </Link>
                    <Link className="btn btn-primary btn-lg" 
                          to="/signup">
                          Sign up
                    </Link>
                </p>
            
            
            </div>
            
            
            )
            }
        </div>
    )
}

export default Homepage;