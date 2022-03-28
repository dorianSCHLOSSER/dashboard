import React, {useEffect, useState} from 'react'
import axios from "axios";

export const GmailService = (props) => {

    const [mailData, setMailData] = useState([])
    const [mailData2, setMailData2] = useState([])
    const [mailData3, setMailData3] = useState([])

    useEffect(() => {

        axios.get("http://localhost:8080/api/gmail//getMailList", {
            headers: {
                'Authorization': 'Bearer ' + props.access.access_token,
                'auth-token': props.token
            },
            params: {
                params: {
                    q: props.data.widgetData.params[0].data
                }
            }
        }).then(r => {
            r.data.messages.map((widget, index) => {
                axios.get("http://localhost:8080/api/gmail/getMailData", {
                    headers: {
                        'Authorization': 'Bearer ' + props.access.access_token,
                        'auth-token': props.token
                    },
                    params: {
                        params: {
                            id: widget.id
                        }
                    }
                }).then(r => {
                    if (index === 0) {
                        setMailData(r.data.payload.headers)
                    }
                    if (index === 1) {
                        setMailData2(r.data.payload.headers)
                    }
                    if (index === 2) {
                        setMailData3(r.data.payload.headers)
                    }

                })
            })
        })

        setInterval(() => {
            axios.get("http://localhost:8080/api/gmail//getMailList", {
                headers: {
                    'Authorization': 'Bearer ' + props.access.access_token,
                    'auth-token': props.token
                },
                params: {
                    params: {
                        q: props.data.widgetData.params[0].data
                    }
                }
            }).then(r => {
                r.data.messages.map((widget, index) => {
                    axios.get("http://localhost:8080/api/gmail/getMailData", {
                        headers: {
                            'Authorization': 'Bearer ' + props.access.access_token,
                            'auth-token': props.token
                        },
                        params: {
                            params: {
                                id: widget.id
                            }
                        }
                    }).then(r => {
                        if (index === 0) {
                            setMailData(r.data.payload.headers)
                        }
                        if (index === 1) {
                            setMailData2(r.data.payload.headers)
                        }
                        if (index === 2) {
                            setMailData3(r.data.payload.headers)
                        }

                    })
                })
            })
        }, 30000)
    },[])


    return (
        <div className={"services"}>
            <h2>Mail 1</h2>
            {mailData.map((data) => {
               if (data.name === "Subject" ||data.name === "From" ||data.name === "To") {
                   return(<p>{data.name}: {data.value}</p>)
               }
            })}
            <h2>Mail 2</h2>
            {mailData2.map((data) => {
                if (data.name === "Subject" ||data.name === "From" ||data.name === "To") {
                    return(<p>{data.name}: {data.value}</p>)
                }
            })}
            <h2>Mail 3</h2>
            {mailData3.map((data) => {
                if (data.name === "Subject" ||data.name === "From" ||data.name === "To") {
                    return(<p>{data.name}: {data.value}</p>)
                }
            })}
        </div>
    )
}
