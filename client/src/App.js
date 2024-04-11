import './App.css';
import {BrowserRouter} from "react-router-dom";
import SiteRoutes from './routes-nav/SiteRoutes';
import JoblyApi from "./api/api";
import UserContext from "./auth/UserContext";
import React, {useState, useEffect} from 'react';
// import jwt from "jsonwebtoken";
import useLocalStorage from "./hooks/useLocalStorage";
import {jwtDecode} from "jwt-decode";
// import jwt from "jsonwebtoken";
import SiteNavigation from './routes-nav/SiteNavigation';
export const TOKEN_STORAGE_ID = "jobly-token";




function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);


    // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwtDecode(token);
          // put the token on the Api class so it can use it to call the API.
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);
  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */
  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }


    /** Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */
    async function login(loginData) {
      try {
        let token = await JoblyApi.login(loginData);
        setToken(token);
        return { success: true };
      } catch (errors) {
        console.error("login failed", errors);
        return { success: false, errors };
      }
    }


  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }
  if (!infoLoaded) return <p>loading...</p>;
  return (
    <div className="App">
    <BrowserRouter>
        <UserContext.Provider
            value={{ currentUser, setCurrentUser}}>
            <SiteNavigation logout={logout} />
            <SiteRoutes login={login} signup={signup} />
        </UserContext.Provider>
    </BrowserRouter>
    </div>
  );
}

export default App;
