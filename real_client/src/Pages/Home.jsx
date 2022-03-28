import React, {useEffect, useState} from "react";
import {ModalApi} from "../components/modalApi";
import GridLayout from 'react-grid-layout';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import axios from "axios";
import {WeatherForecast, WeatherService, WeatherServiceMinMax} from "../components/services/weatherService";
import {YoutubeServiceSubs, YoutubeServiceVideo, YoutubeServiceViews} from "../components/services/youtubeService";
import {GmailService} from "../components/services/gmailService";

const Home = (props) => {

const [widgets, setWidgets] = useState([]);

    const getWidget = () => {
            axios.get("http://localhost:8080/api/widgets/get", {
                headers: {
                    'auth-token': props.token
                }
            }).then(r => {
                setWidgets(r.data)
            }).catch(e => {
                console.log("error " + e);
                alert('Something went wrong');
            })
    }

    useEffect(() => {
        if (props.isLoggedin)
            getWidget()
        }, []);

    const ChooseServices = (props) => {
        if (props.data.serviceName === "weather" && props.data.widgetData.name === 'current') {
            return <WeatherService token={props.token} data={props.data}/>
        }
        if (props.data.serviceName === "weather" && props.data.widgetData.name === 'forecast') {
            return <WeatherForecast token={props.token} data={props.data}/>
        }
        if (props.data.serviceName === "weather" && props.data.widgetData.name === 'minMax') {
            return <WeatherServiceMinMax token={props.token} data={props.data}/>
        }
        if (props.data.serviceName === "youtube" && props.data.widgetData.name === "views") {
            return <YoutubeServiceViews token={props.token} data={props.data} access={props.access}/>
        }
        if (props.data.serviceName === "youtube" && props.data.widgetData.name === "subs") {
            return <YoutubeServiceSubs token={props.token} data={props.data} access={props.access}/>
        }
        if (props.data.serviceName === "youtube" && props.data.widgetData.name === "video") {
            return <YoutubeServiceVideo token={props.token} data={props.data} access={props.access}/>
        }
        if (props.data.serviceName === "gmail" && props.data.widgetData.name === "list") {
            return <GmailService token={props.token} data={props.data} access={props.access}/>
        }
    }

    const displayModal = (token, widgets, logged, access) => {
        if (logged) {
            return(
                <ModalApi accessToken={access} token={token} widgets={widgets} setWidget={(v) => {
                    setWidgets(v)
                }}/>
            )
        }
    }

  return (
      <div className={"main home"}>
          {displayModal(props.token, widgets, props.isLoggedin, props.accessToken.access_token)}
          <GridLayout className="layout"
                      cols={12}
                      rowHeight={30}
                      width={1200}
                      >
              {widgets.map((widget, index) => {
                  let temp = widgets.at(index)

                  return (
                      <div className={"item"} key={index} data-grid={{x: 0, y: 0, w: 3, h: 8}}>
                          <div className={"headerWidget"}>
                              <CancelPresentationIcon className={"iconCloseItem"} onClick={() => {
                                  setWidgets(widgets.filter((v) => {
                                      return(widget._id !== v._id)
                                  }))
                                  axios.delete("http://localhost:8080/api/widgets/deleteWidget", {
                                      headers: {
                                          'auth-token': props.token
                                      },
                                      params: {
                                          id: widget._id
                                      }
                                  }).then(() => {console.log("Widget deleted")}).catch(e => {console.log(e)})
                              }}/>
                          </div>
                          <ChooseServices token={props.token} data={temp} history={props.history} access={props.accessToken}/>
                      </div>
                  )
              })}
          </GridLayout>
      </div>
  )
}

export default Home;