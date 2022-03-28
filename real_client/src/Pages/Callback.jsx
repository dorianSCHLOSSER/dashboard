import axios from "axios"
import * as React from "react"
import {useLocation} from "react-router-dom";
import {withRouter} from "react-router-dom"
import {useEffect} from "react";
import {getFromLocalStorage} from "../Storage";


const Callback = (props) => {
    const history = props.history
    const token = JSON.parse(getFromLocalStorage("token"))
    const search = useLocation().search
    const code = new URLSearchParams(search).get('code')

    useEffect(async() => {
        await axios.post('http://localhost:8080/api/auth/getToken', {
            code:code
        }, {
            headers: {
                'auth-token': token
            }
        }).then(r => {
                props.handleAcessToken(r.data)
            }
        )
        history.push("/")
    }, [])
    return (
        <div>
        </div>
    )
}

export default withRouter(Callback)