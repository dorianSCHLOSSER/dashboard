import React, {useEffect, useState} from 'react'
import axios from "axios";

export const WeatherService = (props) => {

    const [widget, setWidget] = useState({
        main: {}
    })

    useEffect(() => {
        axios.get("http://localhost:8080/api/weather/" + "current" + "Weather", {
            headers: {
                'auth-token': props.token
            },
            params: {
                params: {
                    q: props.data.widgetData.params[0].data,
                }
            }
        }).then(r => {
            console.log(r.data)
            setWidget(r.data)
        })
        setInterval(() => {
            axios.get("http://localhost:8080/api/weather/" + "current" + "Weather", {
                headers: {
                    'auth-token': props.token
                },
                params: {
                    params: {
                        q: props.data.widgetData.params[0].data,
                    }
                }
            }).then(r => {
                console.log(r.data)
                setWidget(r.data)
            })
        }, 30000)
    }, [])

    return (
        <div className={"services"}>
            <h3 className={"h3_list_api"}>{props.data.serviceName}</h3>
            <h4>The city of <span>{widget.name}</span></h4>
            <p>feels_like   <span>{widget.main.feels_like}</span></p>
            <p>humidity     <span>{widget.main.humidity}</span></p>
            <p>pressure     <span>{widget.main.pressure}</span></p>
            <p>temp         <span>{widget.main.temp}</span></p>
        </div>
    )
}

export const WeatherForecast = (props) => {

    const [widget, setWidget] = useState([])


    useEffect(() => {
        axios.get("http://localhost:8080/api/weather/" + "forecast" + "Weather", {
            headers: {
                'auth-token': props.token
            },
            params: {
                params: {
                    q: props.data.widgetData.params[0].data,
                    days: props.data.widgetData.params[1].data
                }
            }
        }).then(r => {
            console.log(r.data)
            console.log(r.data.forecast.forecastday)
            setWidget(r.data.forecast.forecastday)
        })
        setInterval(() => {
            axios.get("http://localhost:8080/api/weather/" + "forecast" + "Weather", {
                headers: {
                    'auth-token': props.token
                },
                params: {
                    params: {
                        q: props.data.widgetData.params[0].data,
                        days: props.data.widgetData.params[1].data
                    }
                }
            }).then(r => {
                console.log(r.data.forecast.forecastday)
                setWidget(r.data.forecast.forecastday)
            })
        }, 30000)
    }, [])

    return (
        <div className={"services"}>
            <h1>City: <span>{props.data.widgetData.params[0].data}</span></h1>
            {widget.map((widget, index) => {
                return(<h2>Day {index}: <span>{widget.day.avgtemp_c}</span></h2>)
            })}
        </div>
    )
}

export const WeatherServiceMinMax = (props) => {

    const [widget, setWidget] = useState({
        main: {}
    })

    useEffect(() => {
        axios.get("http://localhost:8080/api/weather/" + "current" + "Weather", {
            headers: {
                'auth-token': props.token
            },
            params: {
                params: {
                    q: props.data.widgetData.params[0].data,
                }
            }
        }).then(r => {
            console.log(r.data)
            setWidget(r.data)
        })
        setInterval( () => {
            axios.get("http://localhost:8080/api/weather/" + "current" + "Weather", {
                headers: {
                    'auth-token': props.token
                },
                params: {
                    params: {
                        q: props.data.widgetData.params[0].data,
                    }
                }
            }).then(r => {
                console.log(r.data)
                setWidget(r.data)
            })
        }, 30000)
    }, [])

    return (
        <div className={"services"}>
            <h3 className={"h3_list_api"}>{props.data.serviceName}</h3>
            <h4>The city of <span>{widget.name}</span></h4>
            <p>temp_max     <span>{widget.main.temp_max}</span></p>
            <p>temp_min     <span>{widget.main.temp_min}</span></p>
        </div>
    )
}