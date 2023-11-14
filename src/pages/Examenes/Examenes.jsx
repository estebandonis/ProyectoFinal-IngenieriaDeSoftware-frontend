import React, { useEffect, useState } from 'react';
import { navigate } from '@store';
import { useStoreon } from 'storeon/react';
import { content, searchContainer, searchInput } from './Examenes.module.css';
import { Navbar, Examen } from '@components'; // Import the Examen component
import { useApi } from '@hooks';
import { styles, examenes_section } from './Examenes.module.css';

const Examenes = () => {
  const { data, handleRequest } = useApi();
  const { dispatch, examen } = useStoreon('examen'); // Update to use 'examen' store

  const reson = async () => {
    const response = await handleRequest('GET', '/examenes'); // Fetch data from 'examenes'
    return response.data;
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) reson();
    return () => {
      ignore = true;
    };
  }, []);

  // Agregar estado para almacenar el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Función para actualizar el término de búsqueda
  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  // Función para buscar examenes que coincidan con el término de búsqueda
  const handleSearch = () => {
    const filteredData = data.filter(examen => examen.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredData(filteredData);
  };

  useEffect(() => {
    if (data) {
      const filteredData = data.filter(examen => examen.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredData(filteredData);
    }
  }, [data, searchTerm]);


  const handleClick = async (id, nombre, descripcion, imagenes) => {
    const nuevo = {
      examen_id: id,
      nombre: nombre,
      descripcion: descripcion,
      imagenes: imagenes
    };
    dispatch('examen/set', nuevo); // Update to use 'examen' store
    navigate('/info_examen');
  };

  return (
    <div className={content}>
      <Navbar showBackButton={true}/>
      <div className={searchContainer}>
        <input type="text" className={searchInput} placeholder="Buscar" value={searchTerm} onChange={handleSearchTermChange} />
        
      </div>
      {
          data!=null?
          <div className={examenes_section}>
            {filteredData.map((card, index) => (
              <Examen key={index} onclick={() => handleClick(card.examen_id, card.nombre, card.descripcion, card.imagenes)} nombre={card.nombre} url={card.imagenes} />
            ))}
          </div>
          :<h2>Cargando...</h2>
        }
    </div>
  );
};

export default Examenes;