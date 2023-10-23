const hospital = store => {
  store.on('@init', () => ({ hospital: { hospitalid: 0, nombre: '', descripcion: '', direccion: '', estado: '', tipo: '', zona: 0, image_url: '' } }))
  store.on('hospital/set', (state, nuevoHospital) => {
    return { hospital: { hospitalid: nuevoHospital.hospitalid, nombre: nuevoHospital.nombre, descripcion: nuevoHospital.descripcion, direccion: nuevoHospital.direccion, estado: nuevoHospital.estado, tipo: nuevoHospital.tipo, zona: nuevoHospital.zona, image_url: nuevoHospital.image_url } };
  });
}

export default hospital