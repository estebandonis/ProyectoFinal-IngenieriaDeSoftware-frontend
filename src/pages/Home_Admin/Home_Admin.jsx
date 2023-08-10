import React, { useState, useEffect } from 'react'
import { Navbar } from '@components'
import { useApi } from '@hooks'

const Home_Admin = () => {
    const [users, setUsers] = useState([])
    const [hospitals, setHospitals] = useState([])

    const { loading, data, handleRequest } = useApi()

    const fetchUserData = async() => {
        const response = await fetch(`http://localhost:3000/api/v1/users`)
            .then(res => res.json())
        console.log("Hospitales: ", response)
        setUsers(response)
    }

    const fetchHospitalsData = async() => {
        const response = await fetch(`http://localhost:3000/api/v1/hospitales`)
            .then(res => res.json())
        console.log("Hospitales: ", response)
        setHospitals(response)
    }

    useEffect (() => {
        fetchUserData()
        fetchHospitalsData()
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                <h4>Usuarios</h4>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Correo</th>
                        <th>Tipo</th>
                        <th>DPI</th>
                        <th>Estado</th>
                    </tr>
                    {users != null ? 
                        users.map((user) => (
                        <tr>
                            <td>{user.user_id}</td>
                            <td>{user.correo}</td>
                            <td>{user.tipo}</td>
                            <td>{user.dpi}</td>
                            <td>{user.estado}</td>
                        </tr>
                    )): null}
                </table>
                <h4>Hospitales</h4>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Zona</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                    </tr>
                    {hospitals != null ?
                        hospitals.map((hospital) => (
                        <tr>
                            <td>{hospital.hospital_id}</td>
                            <td>{hospital.nombre}</td>
                            <td>{hospital.direccion}</td>
                            <td>{hospital.zona}</td>
                            <td>{hospital.descripcion}</td>
                            <td>{hospital.estado}</td>
                        </tr>
                    )): null}
                </table>
            </div>
        </div>
    )
}

export default Home_Admin
