import React, {useContext} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Homepage from "../homepage/Homepage";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import UserContext from "../auth/UserContext";
import CompanyList from "../companies/CompanyList";
import CompanyDetail from "../companies/CompanyDetail";
import JobList from "../jobs/JobList";

const SiteRoutes =({ login, signup })=>{
    const RenderIfUserExists = (Component, redirectTo) => {
        const { currentUser } = useContext(UserContext);
        return currentUser ? <Component /> : <Navigate to={redirectTo} />;
      };
    return(
        <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/signup" element={<SignupForm signup={signup}/>} />
            <Route path="/login" element={<LoginForm login={login} />} />

                  <Route
                  exact
        path="/companies"
        element={RenderIfUserExists(CompanyList, "/login")}
      />
    <Route
        path="/profile"
        element={RenderIfUserExists(ProfileForm, "/login")}
      />
        <Route
         path="/companies/:handle"
        element={RenderIfUserExists(CompanyDetail, "/login")}
      />
              <Route
         path="/jobs"
        element={RenderIfUserExists(JobList, "/login")}
      />
        </Routes>
        


    )
}

export default SiteRoutes;