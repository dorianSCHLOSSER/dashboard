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

export const ModalGmail = (props) => {

    const [list, setList] = useState(false)

    const close = () => {
        props.setServices(false)
    }

    const stepList = () => {
        setList(true)
        close()
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let q = data.get('q')

        if (!q) {
            q = "is:unread"
        }
        console.log(q)
        axios.post("http://localhost:8080/api/widgets/create", {
            serviceName: "gmail",
            position: "1",
            widgetData: {
                name: "list",
                params: [{
                    name: 'q',
                    data: q,
                }
                    ]
            }}, {
            headers: {
                'auth-token' : props.token
            }
        }).then((r) => {
            console.log(r)
            props.setWidget([... props.widgets, r.data])
        }).catch(e => {
            console.log(e);
            alert('Something went wrong');
        });
    }

    return (
        <div className={"modalWeather"}>
            <Modal style={customStyles} isOpen={props.service} ariaHideApp={false}>
                <CloseIcon className={"iconClose"} type={"button"} onClick={close} />
                <h3 className={"h3_list_api"}>Gmail options</h3>
                <div className={"list_api"} onClick={stepList}>Liste mails</div>

            </Modal>
            <Modal style={customStyles} isOpen={list} ariaHideApp={false}>
                <div>
                    <CloseIcon className={"iconClose"} type={"button"} onClick={() => setList(false)} />
                    <h3 className={"h3_list_api"}>Configurator widget Forecast</h3>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="q"
                                        label="q"
                                        name="q"
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