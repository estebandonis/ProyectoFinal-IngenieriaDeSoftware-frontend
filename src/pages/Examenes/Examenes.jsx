import React, { useEffect, useState } from 'react';
import { navigate } from '@store';
import { useStoreon } from 'storeon/react';
import { content, searchContainer, searchInput } from './Examenes.module.css';
import { Navbar, Examen } from '@components'; // Import the Examen component
import { useApi } from '@hooks';
import { styles, examenes_section } from './Examenes.module.css';



const Examenes = () => {
  const { loading, data, handleRequest } = useApi();
  const { user } = useStoreon('user');
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


  const handleClick = async (id, nombre, descripcion) => {
    const nuevo = {
      examenid: id,
      nombre: nombre,
      descripcion: descripcion,
    };
    dispatch('examen/set', nuevo); // Update to use 'examen' store
    console.log('examen: ', examen);
    navigate('/info_examenes');
  };

  return (
    <div className={content}>
      <Navbar />
      <div className={searchContainer}>
        <input type="text" className={searchInput} placeholder="Buscar" value={searchTerm} onChange={handleSearchTermChange} />
        
      </div>
      {
          data!=null?
          <div className={examenes_section}>
            {filteredData.map((card, index) => (
              <Examen onclick={() => handleClick(card.examenid, card.nombre, card.descripcion)} nombre={card.nombre} url={'https://medlineplus.gov/images/Xray_share.jpg'} />
            ))}
          </div>
          :<h2>Cargando...</h2>
        }
    </div>
  );
};

export default Examenes;