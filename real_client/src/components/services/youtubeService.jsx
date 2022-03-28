import React, {useEffect, useState} from 'react'
import axios from "axios";

export const YoutubeServiceViews = (props) => {

    const [widgets, setWidget] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/api/youtube/getChannelData", {
            headers: {
                'Authorization': 'Bearer ' + props.access.access_token,
                'auth-token': props.token
            },
            params: {
                params: {
                    forUsername: props.data.widgetData.params[0].data,
                }
            }
        }).then(r => {
            console.log(r.data.items)
            setWidget(r.data.items)
        })

        setInterval(() => {
            axios.get("http://localhost:8080/api/youtube/getChannelData", {
                headers: {
                    'Authorization': 'Bearer ' + props.access.access_token,
                    'auth-token': props.token
                },
                params: {
                    params: {
                        forUsername: props.data.widgetData.params[0].data,
                    }
                }
            }).then(r => {
                console.log(r.data.items)
                setWidget(r.data.items)
            })
        }, 30000)
    }, [])

    return (
        <div className={"services"}>
            {widgets.map((widget) => {
                return(
                    <div>
                    <h1>Channel name: {props.data.widgetData.params[0].data}</h1>,
                    <h2>Number of views: {widget.statistics.viewCount}</h2>
                    </div>
                )
            })}
        </div>
    )
}

export const YoutubeServiceSubs = (props) => {

    const [widgets, setWidget] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/api/youtube/getChannelData", {
            headers: {
                'Authorization': 'Bearer ' + props.access.access_token,
                'auth-token': props.token
            },
            params: {
                params: {
                    forUsername: props.data.widgetData.params[0].data,
                }
            }
        }).then(r => {
            console.log(r.data.items)
            setWidget(r.data.items)
        })

        setInterval(() => {
            axios.get("http://localhost:8080/api/youtube/getChannelData", {
                headers: {
                    'Authorization': 'Bearer ' + props.access.access_token,
                    'auth-token': props.token
                },
                params: {
                    params: {
                        forUsername: props.data.widgetData.params[0].data,
                    }
                }
            }).then(r => {
                console.log(r.data.items)
                setWidget(r.data.items)
            })
        }, 30000)
    }, [])

    return (
        <div className={"services"}>
            {widgets.map((widget) => {
                return(
                    <div>
                        <h1>Channel name: {props.data.widgetData.params[0].data}</h1>,
                        <h2>Number of views: {widget.statistics.subscriberCount}</h2>
                    </div>
                )
            })}
        </div>)
}

export const YoutubeServiceVideo = (props) => {

    const [widgets, setWidget] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/api/youtube/getVideoData", {
            headers: {
                'Authorization': 'Bearer ' + props.access.access_token,
                'auth-token': props.token
            },
            params: {
                params: {
                    id: props.data.widgetData.params[0].data,
                }
            }
        }).then(r => {
            console.log(r.data.items)
            setWidget(r.data.items)
        })

        setInterval(() => {
            axios.get("http://localhost:8080/api/youtube/getVideoData", {
                headers: {
                    'Authorization': 'Bearer ' + props.access.access_token,
                    'auth-token': props.token
                },
                params: {
                    params: {
                        id: props.data.widgetData.params[0].data,
                    }
                }
            }).then(r => {
                console.log(r.data.items)
                setWidget(r.data.items)
            })
        }, 30000)
    }, [])

    return (
        <div className={"services"}>
            {widgets.map((widget) => {
                return(
                    <div>
                        <h2>Title: {widget.snippet.title}</h2>
                        <p>Number of views: {widget.statistics.viewCount}</p>
                        <p>Number of likes: {widget.statistics.likeCount}</p>
                        <p>Number of comments: {widget.statistics.commentCount}</p>
                    </div>
                )
            })}
        </div>)
}