import React, { useEffect, useState } from 'react';
import { navigate } from '@store';
import { useStoreon } from 'storeon/react';
import { content, searchContainer, searchInput, zoneFilterContainer, zoneButton, zoneFilterInput, zoneDropdown, zoneDropdownContent } from './Home.module.css';
import { Navbar, BigPicture } from '@components';
import { useApi } from '@hooks';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ZoneFilter = ({ selectedZone, zonasUnicas, onSelectZone, showDropdown, toggleDropdown }) => {
  return (
    <div className={zoneFilterContainer}>
      <input
        type="text"
        className={zoneFilterInput}
        placeholder="Filtrar por zona"
        value={selectedZone}
        onClick={toggleDropdown}
        readOnly
      />
      {showDropdown && (
        <div className={zoneDropdown}>
          <ul className={zoneDropdownContent}>
            {zonasUnicas.map((zona, index) => (
              <li key={index}>
                <button
                  className={`dropdown-item ${zoneButton}`} // Aplicar una clase de estilo específica
                  onClick={() => onSelectZone(zona)}
                >
                  Zona {zona}
                </button>
              </li>
            ))}
            <li>
              <button className={`dropdown-item ${zoneButton}`} onClick={() => onSelectZone('')}>
                Quitar filtro
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};


const Home = () => {
  const { loading, data, handleRequest } = useApi();
  const { user } = useStoreon('user');
  const { dispatch, hospital } = useStoreon('hospital');

  const reson = async () => {
    const response = await handleRequest('GET', '/hospitales');
    return response.data;
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) reson();
    return () => {
      ignore = true;
    };
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showZoneDropdown, setShowZoneDropdown] = useState(false);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleZoneChange = (zone) => {
    setSelectedZone(zone);
    setShowZoneDropdown(false);
  };

  const handleSearch = () => {
    let filteredData = data;

    if (selectedZone) {
      filteredData = filteredData.filter((hospital) => hospital.zona === selectedZone);
    }

    if (searchTerm) {
      filteredData = filteredData.filter((hospital) =>
        hospital.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filteredData);
  };

  useEffect(() => {
    if (data) {
      handleSearch();
    }
  }, [data, searchTerm, selectedZone]);

  const obtenerZonasUnicas = (data) => {
    if (!data) return [];

    const zonasUnicas = [...new Set(data.map((hospital) => hospital.zona))];
    return zonasUnicas;
  };

  const zonasUnicas = obtenerZonasUnicas(data);

  const sliderSettings = {
    slidesToShow: filteredData.length < 3 ? filteredData.length : 3,
    slidesToScroll: 1,
    infinite: false,
  };

  const handleClick = async (id, nombre, descripcion, direccion, estado, tipo, zona, image_url) => {
    const nuevo = {
      hospitalid: id,
      nombre: nombre,
      descripcion: descripcion,
      direccion: direccion,
      estado: estado,
      tipo: tipo,
      zona: zona,
      image_url: image_url,
    };
    dispatch('hospital/set', nuevo);
    navigate('/info_hospitales');
  };

  return (
    <div className={content}>
      <Navbar />
      <div className={searchContainer}>
        <input
          type="text"
          className={searchInput}
          placeholder="Buscar"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <ZoneFilter
          selectedZone={selectedZone}
          zonasUnicas={zonasUnicas}
          onSelectZone={handleZoneChange}
          showDropdown={showZoneDropdown}
          toggleDropdown={() => setShowZoneDropdown(!showZoneDropdown)}
        />
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
              imagen={card.image_url}
              click={() =>
                handleClick(
                  card.hospital_id,
                  card.nombre,
                  card.descripcion,
                  card.direccion,
                  card.estado,
                  card.tipo,
                  card.zona,
                  card.image_url
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
