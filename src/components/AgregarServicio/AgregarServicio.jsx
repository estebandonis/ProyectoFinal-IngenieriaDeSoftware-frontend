import { styles, info, boton, datos } from './AgregarServicio.module.css'

const AgregarServicio = ({ examenesData, examenOnChange, priceOnChange}) => {

    const examenChange = (examen) => {
      examenOnChange(examen.target.value)
    }

    const priceChange = (valor) => {
      priceOnChange(valor.target.value)
    }

    return (
        <div className={styles}>
          <div className={info}>
            <div className={datos}>
                <h2>Examen</h2>
                
                {
                    examenesData.length !== 0?
                    <select onChange={examenChange}>
                      <option value={'Default'} >Default</option>
                    {examenesData.map((name, index) => (
                        <option key={index} value={name.nombre}>{name.nombre}</option>
                    ))}
                    </select> : <select><option>Default</option></select>
                }
                
              <h2>Precio</h2>
              <input type="number" onChange={priceChange}/>
            </div>
          </div>
        </div>
    );
};

export default AgregarServicio;