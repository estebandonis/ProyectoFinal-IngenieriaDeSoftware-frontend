const examen = store => {
  store.on('@init', () => ({ examen: { examenid: 0, nombre: '', descripcion: '' } }))
  store.on('examen/set', (state, nuevoExamen) => {
    return { examen: { examenid: nuevoExamen.examenid, nombre: nuevoExamen.nombre, descripcion: nuevoExamen.descripcion } };
  });
}

export default examen