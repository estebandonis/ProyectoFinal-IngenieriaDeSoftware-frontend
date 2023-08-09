import React from 'react'
import { Navbar } from '@components'
import { useApi } from '@hooks'

const Home_Admin = () => {

    const fetchUsersData = () => {

    }

    const fetchHospitalsData = () => {
        
    }

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
                    {fetchUsersData}
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
                    {fetchHospitalsData}
                </table>
            </div>
        </div>
    )
}
