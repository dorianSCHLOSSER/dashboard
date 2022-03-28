import axios from "axios"
import * as React from "react"
import {useEffect, useState} from "react";

const About = () => {

    const [about, setAbout] = useState({})

    const getAbout = () => {
        axios.get('http://localhost:8080/about/').then(async r => {
            setAbout(r.data)
        }).catch(err => console.log(err))
    }

    useEffect(getAbout, [])

    return (
        <div>
            <pre>{JSON.stringify(about, null, 2).replaceAll('"', "")}</pre>
        </div>
    )
}

export default About