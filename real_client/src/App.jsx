import React, {useEffect, useState} from "react";
import Home from "./Pages/Home"
import About from "./Pages/About"
import Callback from './Pages/Callback'
import Header from "./components/header"
import Login from './Pages/Login'
import Register from './Pages/Register'
import {BrowserRouter, Switch, Route } from 'react-router-dom'
import {resetUser, setUser, setAToken, getUser, getFromLocalStorage} from "./Storage";
import axios from "axios";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState(null)
    const [accessToken, setAccessToken] = useState(false)

    const doLogOut = () => {
        setIsLoggedIn(false)
        resetUser()
        setToken(null)
        setAccessToken(false)
        window.location.reload(false)
    }

    const doLogIn = (token) => {
        setIsLoggedIn(true)
        setUser(token)
        setToken(token)
    }

    const doAccessToken = (tok) => {
        setAccessToken(tok)
        setAToken(tok)
    }

    const connect = (token) => {
        axios.get('http://localhost:8080/api/auth/authorize', {
                headers: {
                    'auth-token': token
                },
            }
        ).then(r => {
            window.location = r.data
        })
    }

    useEffect(() => {
        const isLogged = getUser()
        if (isLogged==="true") {
            setIsLoggedIn(true)
            setToken(JSON.parse(getFromLocalStorage("token")))
            setAccessToken(JSON.parse(getFromLocalStorage("access")))
        }
        },[]
    )

  return (
      <div>
      <BrowserRouter>
        <Header isLoggedin={isLoggedIn} token={token} handleLogout={doLogOut} connect={(token) => connect(token)} access={accessToken}>
          <Switch>
              <Route exact path="/">
                <Home accessToken={accessToken} token={token} isLoggedin={isLoggedIn}/>
              </Route>
              <Route exact path="/about">
                <About/>
              </Route>
              <Route exact path="/login">
                  <Login handleLogin={(token) => {doLogIn(token)}}/>
              </Route>
              <Route exact path="/register">
                  <Register /> 
              </Route>
              <Route exact path="/callback">
                  <Callback handleAcessToken={(tok) => {doAccessToken(tok)}} token={token}/>
              </Route>
          </Switch>
        </Header>
      </BrowserRouter>
  </div>
  )
    
}

export default App;
