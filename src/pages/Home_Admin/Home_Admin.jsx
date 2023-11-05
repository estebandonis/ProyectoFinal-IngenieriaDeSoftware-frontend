import React, { useState, useEffect } from 'react';
import { Navbar } from '@components';
import { useApi } from '@hooks';
import * as estilos from './Home_Admin.module.css';

const Home_Admin = () => {
    const [users, setUsers] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [window, setWindow] = useState('Cambiar a Usuarios');
    const [selectedEstado, setSelectedEstado] = useState('todos');
    const [selectedUserEstado, setSelectedUserEstado] = useState('todos');



    const { loading, data, handleRequest, apiUrl } = useApi();

    const fetchUserData = async () => {
        return await fetch(`${apiUrl}/users`)
            .then(res => res.json())
    }

    const setUsersData = async () => {
        setUsers(await fetchUserData())
    }

    const fetchHospitalsData = async () => {
        return await fetch(`${apiUrl}/hospitales/estados`)
            .then(res => res.json())
    }

    const setHospitalsData = async () => {
        setHospitals(await fetchHospitalsData())
    }

    const updateHospitalEstado = async (hospitalId, newEstado) => {
        await fetch(`${apiUrl}/hospitales/updateEstado/${hospitalId}&${newEstado}`, {
          method: 'PUT',
        });
      
        setHospitalsData();
      };
      

    const updateUserEstado = async (userID, newEstado) => {
        await fetch(`${apiUrl}/users/changeEstado/${userID}&${newEstado}`, {
            method: 'PUT',
        })

        setUsersData()
    }

    const onclick = async () => {
        if (window === 'Cambiar a Usuarios') {
            setWindow('Cambiar a Hospitales')
        } else {
            setWindow('Cambiar a Usuarios')
        }
    }

    const handleUserEstadoChange = (estado) => {
        setSelectedUserEstado(estado);
      };
    
    const filteredUsers = selectedUserEstado === 'todos'
        ? users
        : users.filter((user) => user.estado === selectedUserEstado);


    const handleEstadoChange = (estado) => {
        setSelectedEstado(estado);
      };
      
    const filteredHospitals = selectedEstado === 'todos'
        ? hospitals
        : hospitals.filter((hospital) => hospital.estado === selectedEstado);


    useEffect(() => {
        setUsersData()
        setHospitalsData()
    }, [])

    return (
        <div>
            <Navbar />
            <div className={estilos.main}>
                <div className={estilos.report}>
                    <button onClick={onclick}>{window}</button>
                </div>
                {window === 'Cambiar a Usuarios'?
                    <div className={estilos.hospitals}>
                        <select onChange={(e) => handleEstadoChange(e.target.value)} value={selectedEstado}>
                            <option value="todos">Todos</option>
                            <option value="aprobado">Aprobados</option>
                            <option value="espera">En Espera</option>
                            <option value="denegado">Denegados</option>
                        </select>
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
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredHospitals.map((hospital) => (
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
                                                    }}
                                                >
                                                    Denegar
                                                </button>
                                                <button
                                                    className="estado-button"
                                                    style={{ backgroundColor: 'grey' }}
                                                    onClick={async () => {
                                                        await updateHospitalEstado(hospital.hospital_id, 'espera');
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
                                                    }}
                                                >
                                                    Aprobar
                                                </button>
                                                <button
                                                    className="estado-button"
                                                    style={{ backgroundColor: 'grey' }}
                                                    onClick={async () => {
                                                        await updateHospitalEstado(hospital.hospital_id, 'denegado');
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
                                                    }}
                                                >
                                                    Aprobar
                                                </button>
                                                <button
                                                    className="estado-button"
                                                    style={{ backgroundColor: 'grey' }}
                                                    onClick={async () => {
                                                        await updateHospitalEstado(hospital.hospital_id, 'espera');
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
                    : <div className={estilos.users}>
                        <select onChange={(e) => handleUserEstadoChange(e.target.value)} value={selectedUserEstado}>
                            <option value="todos">Todos</option>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                        <h4>Usuarios</h4>
                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Correo</th>
                                <th>Tipo</th>
                                <th>DPI</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.user_id}>
                                    <td>{user.user_id}</td>
                                    <td>{user.correo}</td>
                                    <td>{user.tipo}</td>
                                    <td>{user.dpi}</td>
                                    <td>{user.estado}</td>
                                    <td>
                                        {user.estado === 'activo' && (
                                            <div>
                                                <button
                                                    className="estado-button"
                                                    style={{ backgroundColor: 'red' }}
                                                    onClick={async () => {
                                                        await updateUserEstado(user.user_id, 'inactivo')
                                                    }}
                                                >
                                                    desactivar
                                                </button>
                                            </div>
                                        )}
                                        {user.estado === 'inactivo' && (
                                            <div>
                                                <button
                                                    className="estado-button"
                                                    style={{ backgroundColor: 'green' }}
                                                    onClick={async () => {
                                                        await updateUserEstado(user.user_id, 'activo');
                                                    }}
                                                >
                                                    activar
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    );
};

export default Home_Admin;