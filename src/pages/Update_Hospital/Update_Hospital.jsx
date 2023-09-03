import React, {useState, useEffect} from "react";
import {useApi} from "@hooks"

const Update_Hospital = () => {
    const [hospitals, setHospitals] = useState([])
    const [selectedOption, setSelectedOption] = useState(0)
    const [formData, setFormData] = useState({
        id: "",
        nombre: "",
        direccion: "",
        descripcion: "",
        zona: ""
    })

    const {handleRequest} = useApi()
    
    const fetchHospitalsData = async () => {
        const response = await fetch(`http://localhost:3000/api/v1/hospitales`)
            .then(res => res.json());
        console.log("Hospitales: ", response);
        setHospitals(response);
    };

    const handleOptionChange = (event) => {
        const val = event.target.value
        console.log(val)
        setSelectedOption(val)
        setFormData({
            id: hospitals[selectedOption].hospital_id,
            nombre: hospitals[selectedOption].nombre,
            direccion: hospitals[selectedOption].direccion,
            descripcion: hospitals[selectedOption].descripcion,
            zona: hospitals[selectedOption].zona
        })

    } 

    const handleFormSubmit = async(event) => {
        event.preventDefault();
        const response = await handleRequest(
            'PUT', 
            `hospitales/updateHospitalInfo/
            ${formData.id}&${formData.nombre}&${formData.direccion}&${formData.descripcion}&${formData.zona}`)
    }

    useEffect(() => {
        fetchHospitalsData();
    }, []);

    return (
        <div>
            <select value={selectedOption} onChange={handleOptionChange}>
                {hospitals.map((hospital, index) => (
                    <option value={index}>
                        {hospital.nombre}
                    </option>
                ))}
            </select>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="">Nombre</label><br />
                <input type="text" value={formData.nombre} onChange={event => setFormData({...formData, nombre: event.target.value })}/><br />
                <label htmlFor="">Direccion</label><br />
                <input type="text" value={formData.direccion} onChange={event => setFormData({...formData, direccion: event.target.value })}/><br />
                <label htmlFor="">Descripcion</label><br />
                <input type="text" value={formData.descripcion} onChange={event => setFormData({...formData, descripcion: event.target.value })}/><br />
                <label htmlFor="">Zona</label><br />
                <input type="text" value={formData.zona} onChange={event => setFormData({...formData, zona: event.target.value })}/><br />
                <button type="submit">Actualizar</button>
            </form>
        </div>
    )
}

export default Update_Hospital