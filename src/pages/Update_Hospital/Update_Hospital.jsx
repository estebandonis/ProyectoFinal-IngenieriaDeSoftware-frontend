import React, {useState, useEffect} from "react";
import {useApi} from "@hooks"

const Update_Hospital = () => {
    const [hospitals, setHospitals] = useState([])
    const [selectedOption, setSelectedOption] = useState(0)
    const [formData, setFormData] = useState({
        nombre: "",
        direccion: "",
        descripcion: "",
        zona: ""
    })
    
    const fetchHospitalsData = async () => {
        const response = await fetch(`http://localhost:3000/api/v1/hospitales`)
            .then(res => res.json());
        console.log("Hospitales: ", response);
        setHospitals(response);
    };

    const handleOptionChange = (event) => {
        const val = event.target.value
        setSelectedOption(val)
        setFormData({
            nombre: hospitals[selectedOption].nombre,
            direccion: hospitals[selectedOption].direccion,
            descripcion: hospitals[selectedOption].descripcion,
            zona: hospitals[selectedOption].zona
        })

    } 

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(formData.nombre);
        console.log(formData.descripcion);
        console.log(formData.direccion);
        console.log(formData.zona);
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
                <label htmlFor="">Nombre</label>
                <input type="text" value={formData.nombre} onChange={event => setFormData({...formData, nombre: event.target.value })}/>
                <label htmlFor="">Direccion</label>
                <input type="text" value={formData.direccion} onChange={event => setFormData({...formData, direccion: event.target.value })}/>
                <label htmlFor="">Descripcion</label>
                <input type="text" value={formData.descripcion} onChange={event => setFormData({...formData, descripcion: event.target.value })}/>
                <label htmlFor="">Zona</label>
                <input type="text" value={formData.descripcion} onChange={event => setFormData({...formData, zona: event.target.value })}/>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    )
}

export default Update_Hospital