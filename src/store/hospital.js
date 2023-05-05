
const hospital = store => {
  store.on('@init', () => ({ hospital: { hospitalid: 0, nombre: '', descripcion: '', direccion: '', estado: '', tipo: '', zona: 0 } }))
  store.on('hospital/set', (state, nuevoHospital) => {
    console.log("Number: "+nuevoHospital)
    return { hospital: { hospitalid: nuevoHospital.hospitalid, nombre: nuevoHospital.nombre, descripcion: nuevoHospital.descripcion, direccion: nuevoHospital.direccion, estado: nuevoHospital.estado, tipo: nuevoHospital.tipo, zona: nuevoHospital.zona } };
  });
}

export default hospital