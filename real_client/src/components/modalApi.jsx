import React, {useState} from 'react'
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import {tabApi} from "./allTab";
import {ModalWeather} from "./weather/weather";
import {ModalGmail} from "./gmail/gmail";
import {ModalYoutube} from "./youtube/youtube";

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

export const ModalApi = (props) => {
    const [visible, setModal] = useState(false);
    const [servicesW, setServicesW] = useState(false)
    const [servicesY, setServicesY] = useState(false)
    const [servicesG, setServicesG] = useState(false)


    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }

    const openServices = (id) => {
        closeModal()
        if (id.toString() === "Weather") setServicesW(true)
        else if (id.toString() === "Youtube") setServicesY(true)
        else if (id.toString() === "Gmail") setServicesG(true)
    }

    const HandleChoice = tabApi.map(({id}) => {
        if ((props.accessToken && (id === "Youtube" || id === "Gmail")) || id === "Weather")
        return (
            <div className={"list_api"} key={id} onClick={() => openServices(id)}>
                {id}
            </div>
        )
    })



    return (
        <div className={"modal"}>
            <AddCircleOutlineIcon className={"iconOpen"} type={"button"} onClick={openModal}/>
            <Modal style={customStyles} isOpen={visible} ariaHideApp={false}>
                <CloseIcon className={"iconClose"} type={"button"} onClick={closeModal}/>
                <h3 className={"h3_list_api"}>List of services</h3>
                {HandleChoice}
            </Modal>
            <ModalWeather token={props.token}
                          service={servicesW}
                          setServices={(bool) => {setServicesW(bool)}}
                          widgets={props.widgets}
                          setWidget={props.setWidget}
            />
            <ModalGmail token={props.token}
                       service={servicesG}
                       setServices={(bool) => {setServicesG(bool)}}
                       widgets={props.widgets}
                       setWidget={props.setWidget}
            />
            <ModalYoutube token={props.token}
                          service={servicesY}
                          setServices={(bool) => {setServicesY(bool)}}
                          widgets={props.widgets}
                          setWidget={props.setWidget}
            />
        </div>
    )
}