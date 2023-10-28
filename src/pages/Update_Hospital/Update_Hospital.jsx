import React, {useState, useEffect} from "react";
import { useStoreon } from 'storeon/react'
import { useApi } from "@hooks"
import { Navbar, Hospital } from "@components";
import {navigate} from "@store";
import * as estilos from "./Update_Hospital.module.css";

const Update_Hospital = () => {
    const [hospitals, setHospitals] = useState([])
    const [selectedOption, setSelectedOption] = useState(-1)
    const [formData, setFormData] = useState({
        id: "",
        nombre: "",
        direccion: "",
        descripcion: "",
        zona: "",
        estado: ""
    })

    const { handleRequest, apiUrl } = useApi()
    const { user } = useStoreon('user')

    console.log("User: ", user)
    
    const fetchHospitalsData = async () => {
        const response = await fetch(`${apiUrl}/hospitales/hospitalsByManager/${user.correo}`)
            .then(res => res.json());
        console.log("Hospitales: ", response);
        setHospitals(response);
    };

    const handleOptionChange = (event) => {
        const val = event.target.value
        setSelectedOption(val)
        setFormData({
            id: hospitals[val].hospital_id,
            nombre: hospitals[val].nombre,
            direccion: hospitals[val].direccion,
            descripcion: hospitals[val].descripcion,
            zona: hospitals[val].zona,
            estado: hospitals[val].estado
        })

    } 

    const handleFormSubmit = async(event) => {
        event.preventDefault();
        const response = await handleRequest(
            'PUT', 
            `/hospitales/updateHospitalInfo/${formData.id}&${formData.nombre}&${formData.direccion}&${formData.descripcion}&${formData.zona}`)
        if (response) {
            alert("Hospital actualizado exitosamente")
            navigate("/")
        }
    }

    useEffect(() => {
        fetchHospitalsData();
    }, []);

    return (
        <div>
            <header>
                <Navbar showBackButton={true} />
            </header>

            <div className={estilos.styles}>
                <div className={estilos.informacion}>
                    <div className={estilos.formulario_section}>
                        <div className={estilos.formulario}>
                            <div className={estilos.title}> Actualizar Informacion de Hospitales</div>
                            <select value={selectedOption} onChange={handleOptionChange}>
                                <option value="-1">Seleciona un Hospital</option>
                                {hospitals.map((hospital, index) => (
                                    <option value={index}>
                                        {hospital.nombre}
                                    </option>
                                ))}
                            </select>
                            <form onSubmit={handleFormSubmit}>
                                <div className={estilos.details}>
                                    <div className={estilos.inputbox}>
                                    <label htmlFor="">Nombre</label><br />
                                    <input type="text" value={formData.nombre} onChange={event => setFormData({...formData, nombre: event.target.value })}/><br />
                                    </div>
                                    <div className={estilos.inputbox}>
                                    <label htmlFor="">Direccion</label><br />
                                    <input type="text" value={formData.direccion} onChange={event => setFormData({...formData, direccion: event.target.value })}/><br />
                                    </div>
                                    <div className={estilos.inputbox}>
                                    <label htmlFor="">Descripcion</label><br />
                                    <textarea type="text" value={formData.descripcion} onChange={event => setFormData({...formData, descripcion: event.target.value })}/><br />
                                    </div>
                                    <div className={estilos.inputbox}>
                                    <label htmlFor="">Zona</label><br />
                                    <input type="text" value={formData.zona} onChange={event => setFormData({...formData, zona: event.target.value })}/><br />
                                    </div>
                                </div>
                                <button type="submit">Actualizar</button>
                            </form>
                        </div>
                    </div>
                    <div className={estilos.hospitales_section}>
                        <div className={estilos.hospitales}>
                            {hospitals.map((card, index) => (
                                <Hospital
                                    key={index}
                                    nombre={card.nombre}
                                    descrip={card.descripcion}
                                    direc={card.direccion}
                                    zona={card.zona}
                                    img={'https://chlapaz.files.wordpress.com/2021/01/chlp-zona14.jpg'}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Update_Hospital