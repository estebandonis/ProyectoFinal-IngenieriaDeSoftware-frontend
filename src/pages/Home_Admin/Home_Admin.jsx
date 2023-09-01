import React, { useState, useEffect } from 'react';
import { Navbar } from '@components';
import { useApi } from '@hooks';

const Home_Admin = () => {
    const [users, setUsers] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [hospitalss, setHospitalss] = useState([]);

    const { loading, data, handleRequest } = useApi();

    const fetchUserData = async () => {
        const response = await fetch(`http://localhost:3000/api/v1/users`)
            .then(res => res.json());
        setUsers(response);
    };

    const fetchHospitalsData = async () => {
        const response = await fetch(`http://localhost:3000/api/v1/hospitales`)
            .then(res => res.json());
        setHospitals(response);
    };

    const fetchHospitalsEsperaData = async () => {
        const response = await fetch(`http://localhost:3000/api/v1/hospitales/estados`)
            .then(res => res.json());
        setHospitalss(response);
    };

    const updateHospitalEstado = async (hospitalId, newEstado) => {
        const response = await fetch(`http://localhost:3000/api/v1/hospitales/updateEstado/${hospitalId}/${newEstado}`, {
            method: 'PUT',
        });

        const data = await response.json();
        return data;
    };


    useEffect(() => {
        fetchUserData();
        fetchHospitalsData();
        fetchHospitalsEsperaData();
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                <h4>Usuarios</h4>
                {/* ... (código para mostrar la tabla de usuarios) */}
                <h4>Hospitales</h4>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>Zona</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hospitals.map((hospital) => (
                            <tr key={hospital.hospital_id}>
                                <td>{hospital.hospital_id}</td>
                                <td>{hospital.nombre}</td>
                                <td>{hospital.direccion}</td>
                                <td>{hospital.zona}</td>
                                <td>{hospital.descripcion}</td>
                                <td>
                                    {hospital.estado}{' '}
                                   
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h4>Hospitales En espera</h4>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>Zona</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hospitalss.map((hospital) => (
                            <tr key={hospital.hospital_id}>
                                <td>{hospital.hospital_id}</td>
                                <td>{hospital.nombre}</td>
                                <td>{hospital.direccion}</td>
                                <td>{hospital.zona}</td>
                                <td>{hospital.descripcion}</td>
                                <td>{hospital.estado}</td>
                                <td>
                                    {hospital.estado === 'aprobado' && (
                                        <div>
                                            <button
                                                className="estado-button"
                                                style={{ backgroundColor: 'red' }}
                                                onClick={async () => {
                                                    await updateHospitalEstado(hospital.hospital_id, 'denegado');
                                                    fetchHospitalsEsperaData();
                                                }}
                                            >
                                                Denegar
                                            </button>
                                            <button
                                                className="estado-button"
                                                style={{ backgroundColor: 'grey' }}
                                                onClick={async () => {
                                                    await updateHospitalEstado(hospital.hospital_id, 'espera');
                                                    fetchHospitalsEsperaData();
                                                }}
                                            >
                                                En espera
                                            </button>
                                        </div>
                                    )}
                                    {hospital.estado === 'espera' && (
                                        <div>
                                            <button
                                                className="estado-button"
                                                style={{ backgroundColor: 'green' }}
                                                onClick={async () => {
                                                    await updateHospitalEstado(hospital.hospital_id, 'aprobado');
                                                    fetchHospitalsEsperaData();
                                                }}
                                            >
                                                Aprobar
                                            </button>
                                            <button
                                                className="estado-button"
                                                style={{ backgroundColor: 'grey' }}
                                                onClick={async () => {
                                                    await updateHospitalEstado(hospital.hospital_id, 'denegado');
                                                    fetchHospitalsEsperaData();
                                                }}
                                            >
                                                Denegar
                                            </button>
                                        </div>
                                    )}
                                    {hospital.estado === 'denegado' && (
                                        <div>
                                            <button
                                                className="estado-button"
                                                style={{ backgroundColor: 'green' }}
                                                onClick={async () => {
                                                    await updateHospitalEstado(hospital.hospital_id, 'aprobado');
                                                    fetchHospitalsEsperaData();
                                                }}
                                            >
                                                Aprobar
                                            </button>
                                            <button
                                                className="estado-button"
                                                style={{ backgroundColor: 'grey' }}
                                                onClick={async () => {
                                                    await updateHospitalEstado(hospital.hospital_id, 'espera');
                                                    fetchHospitalsEsperaData();
                                                }}
                                            >
                                                En espera
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home_Admin;
