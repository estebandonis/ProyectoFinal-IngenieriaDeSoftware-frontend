import React, { useState } from "react";
import { SignInForm, SignUpForm } from "@components";
import { navigate } from '@store'
import "./styles.css";

const LogIn = () => {
  const [type, setType] = useState("signIn");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return '';
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  
  return (
    <div className="eltodo">
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 onClick={() => {navigate('/')}}>MEDIEASY</h1>
              <p>(Para regresar al menú principal presione el las letras de 'MEDIEASY')</p>
              <span>
                Registrate para compartir tu experiencia con otros usuarios o si quieres registrar tu centro de salud
              </span>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Iniciar Sesión
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 onClick={() => {navigate('/')}}>MEDIEASY</h1>
              <p>(Para regresar al menú principal precione el las letras de 'MEDIEASY')</p>
              <span>¡Bienvenido! Ingrese sus datos para contar tus experiencias o revisar los datos de su centro</span>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* changes and refactoring made */

export default LogIn