export default function Login() {
    return (
        <div className="Login">
            <h1>Iniciar sesion</h1>
            <div>
                <div>
                    <h4>Correo</h4>
                    <input type="text" placeholder="Correo Electronico"/>
                    <h4>Contraseña</h4>
                    <input type="text" placeholder="Contraseña"/>
                    <button type="submit">Ingresar</button>
                </div>
            </div>
        </div>
    )
}