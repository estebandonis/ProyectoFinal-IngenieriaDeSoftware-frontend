import React, { useEffect, useState } from 'react';
import { navigate } from '@store';
import { useStoreon } from 'storeon/react';
import { content, searchContainer, searchInput, searchButton } from './Home.module.css';
import { Navbar, BigPicture } from '@components';
import { useApi } from '@hooks';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const { loading, data, handleRequest } = useApi();
  const { user } = useStoreon('user');
  const { dispatch, hospital } = useStoreon('hospital');

  const reson = async () => {
    const response = await handleRequest('GET', '/hospitales');
    return response.data;
  };
  console.log('usuario: ' + user.correo);
  console.log('hospital: ' + hospital.nombre);

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

  // Función para buscar hospitales que coincidan con el término de búsqueda
  const handleSearch = () => {
    const filteredData = data.filter(hospital => hospital.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredData(filteredData);
  };

  useEffect(() => {
    if (data) {
      const filteredData = data.filter(hospital => hospital.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredData(filteredData);
    }
  }, [data, searchTerm]);

  const sliderSettings = {
    slidesToShow: filteredData.length < 3 ? filteredData.length : 3,
    slidesToScroll: 1,
    infinite: false,
  };

  const handleClick = async (id, nombre, descripcion, direccion, estado, tipo, zona) => {
    const nuevo = {
      hospitalid: id,
      nombre: nombre,
      descripcion: descripcion,
      direccion: direccion,
      estado: estado,
      tipo: tipo,
      zona: zona,
    };
    dispatch('hospital/set', nuevo);
    console.log('hospital: ' + hospital);
    navigate('/info_hospitales');
  };

  return (
    <div className={content}>
      <Navbar />
      <div className={searchContainer}>
        <input type="text" className={searchInput} placeholder="Buscar" value={searchTerm} onChange={handleSearchTermChange} />
        <button className={searchButton} onClick={handleSearch}>
          Buscar
        </button>
      </div>

      {loading ? (
        <h2>Cargando</h2>
      ) : (
        <Slider {...sliderSettings}>
          {filteredData.map((card, index) => (
            <BigPicture
              key={index}
              nombre={card.nombre}
              tipo={card.tipo}
              zona={card.zona}
              direccion={card.direccion}
              imagen={'https://chlapaz.files.wordpress.com/2021/01/chlp-zona14.jpg'}
              click={() =>
                handleClick(
                  card.hospital_id,
                  card.nombre,
                  card.descripcion,
                  card.direccion,
                  card.estado,
                  card.tipo,
                  card.zona
                )
              }
            />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Home;
