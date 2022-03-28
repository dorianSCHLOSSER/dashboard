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

export const ModalYoutube = (props) => {

    const [views, setViews] = useState(false)
    const [subs, setSubs] = useState(false)
    const [video, setVideo] = useState(false)

    const close = () => {
        props.setServices(false)
    }

    const stepViews = () => {
        setViews(true)
        close()
    }

    const stepSubs = () => {
        setSubs(true)
        close()
    }

    const stepVideo = () => {
        setVideo(true)
        close()
    }

    const handleSubmitViews = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let nameWid = undefined;
        if (views) nameWid = "views"
        else if (subs) nameWid = "subs"

        axios.post("http://localhost:8080/api/widgets/create", {
            serviceName: "youtube",
            position: "1",
            widgetData: {
                name: nameWid,
                params: [{
                    name: 'forUsername',
                    data: data.get('forUsername'),
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

    const handleSubmitSubs = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let nameWid = undefined;
        if (views) nameWid = "views"
        else if (subs) nameWid = "subs"

        axios.post("http://localhost:8080/api/widgets/create", {
            serviceName: "youtube",
            position: "1",
            widgetData: {
                name: nameWid,
                params: [{
                    name: 'forUsername',
                    data: data.get('forUsername'),
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

    const handleSubmitVideo = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios.post("http://localhost:8080/api/widgets/create", {
            serviceName: "youtube",
            position: "1",
            widgetData: {
                name: 'video',
                params: [{
                    name: 'id',
                    data: data.get('id'),
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
        <div className={"modalYoutube"}>
            <Modal style={customStyles} isOpen={props.service} ariaHideApp={false}>
                <CloseIcon className={"iconClose"} type={"button"} onClick={close} />
                <h3 className={"h3_list_api"}>Youtube options</h3>
                <div className={"list_api"} onClick={stepViews}>Get Viewers</div>
                <div className={"list_api"} onClick={stepSubs}>Get Subscriptions</div>
                <div className={"list_api"} onClick={stepVideo}>Get Video Data</div>
            </Modal>

            <Modal style={customStyles} isOpen={views} ariaHideApp={false}>
                <div>
                    <CloseIcon className={"iconClose"} type={"button"} onClick={() => setViews(false)} />
                    <h3 className={"h3_list_api"}>Configurator widget Views</h3>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Box component="form" onSubmit={handleSubmitViews} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="forUsername"
                                        label="forUsername"
                                        name="forUsername"
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

            <Modal style={customStyles} isOpen={subs} ariaHideApp={false}>
                <div>
                    <CloseIcon className={"iconClose"} type={"button"} onClick={() => setSubs(false)} />
                    <h3 className={"h3_list_api"}>Configurator widget Subscriptions</h3>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Box component="form" onSubmit={handleSubmitSubs} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="forUsername"
                                        label="forUsername"
                                        name="forUsername"
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
            <Modal style={customStyles} isOpen={video} ariaHideApp={false}>
                <div>
                    <CloseIcon className={"iconClose"} type={"button"} onClick={() => setVideo(false)} />
                    <h3 className={"h3_list_api"}>Configurator widget Video</h3>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Box component="form" onSubmit={handleSubmitVideo} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="id"
                                        label="id"
                                        name="id"
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