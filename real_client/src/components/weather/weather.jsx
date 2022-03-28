import React, {useState} from 'react'
import CloseIcon from "@mui/icons-material/Close";
import Modal from "react-modal";
import axios from "axios";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const customStyles = {
    content: {
        position: 'absolute',
        width: '30%',
        padding: '0',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
    },
};

const theme = createTheme();

export const ModalWeather = (props) => {

    const [current, setCurrent] = useState(false)
    const [forecast, setForecast] = useState(false)
    const [minMax, setMinMax] = useState(false)

    const close = () => {
       props.setServices(false)
    }

    const stepCurrent = () => {
        setCurrent(true)
        close()
    }

    const stepForecast = () => {
        setForecast(true)
        close()
    }

    const stepMinMax = () => {
        setMinMax(true)
        close()
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let nameWid = undefined;
        if (current) nameWid = "current"
        else if (minMax) nameWid = "minMax"

        axios.post("http://localhost:8080/api/widgets/create", {
            serviceName: "weather",
            position: "1",
            widgetData: {
                name: nameWid,
                params: [{
                    name: 'city',
                    data: data.get('city'),
                }]
            }}, {
            headers: {
                'auth-token' : props.token
            }
        }).then((r) => {
            console.log(r)
            props.setWidget([... props.widgets, r.data]
            )


        }).catch(e => {
            console.log(e);
            alert('Something went wrong');
        });
    };

    const handleSubmitForecast = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let nameWid = undefined;
        if (forecast) nameWid = "forecast"

        axios.post("http://localhost:8080/api/widgets/create", {
            serviceName: "weather",
            position: "1",
            widgetData: {
                name: nameWid,
                params: [{
                    name: 'city',
                    data: data.get('city'),
                }, {
                    name: 'days',
                    data: data.get('days')
                }]
            }}, {
            headers: {
                'auth-token' : props.token
            }
        }).then((r) => {
            console.log(r)
            props.setWidget([... props.widgets, r.data]
            )


        }).catch(e => {
            console.log(e);
            alert('Something went wrong');
        });
    };

    return (
        <div className={"modalWeather"}>
            <Modal style={customStyles} isOpen={props.service} ariaHideApp={false}>
                <CloseIcon className={"iconClose"} type={"button"} onClick={close} />
                <h3 className={"h3_list_api"}>Weather options</h3>
                <div className={"list_api"} onClick={stepCurrent}>Current</div>
                <div className={"list_api"} onClick={stepForecast}>Forecast</div>
                <div className={"list_api"} onClick={stepMinMax}>MinMax</div>

            </Modal>

            <Modal style={customStyles} isOpen={current} ariaHideApp={false}>
                <div>
                    <CloseIcon className={"iconClose"} type={"button"} onClick={() => setCurrent(false)} />
                    <h3 className={"h3_list_api"}>Configurator widget Current</h3>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="city"
                                        label="city"
                                        name="city"
                                        autoFocus
                                    />
                                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                        Create service
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </div>
            </Modal>

            <Modal style={customStyles} isOpen={forecast} ariaHideApp={false}>
                <div>
                    <CloseIcon className={"iconClose"} type={"button"} onClick={() => setForecast(false)} />
                    <h3 className={"h3_list_api"}>Configurator widget Forecast</h3>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Box component="form" onSubmit={handleSubmitForecast} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="city"
                                        label="city"
                                        name="city"
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="days"
                                        label="days"
                                        name="days"
                                        autoFocus
                                    />
                                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                        Create service
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </div>
            </Modal>
            <Modal style={customStyles} isOpen={minMax} ariaHideApp={false}>
                <div>
                    <CloseIcon className={"iconClose"} type={"button"} onClick={() => setMinMax(false)} />
                    <h3 className={"h3_list_api"}>Configurator widget minMax</h3>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="city"
                                        label="city"
                                        name="city"
                                        autoFocus
                                    />
                                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                        Create service
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </div>
            </Modal>
        </div>
    )
}