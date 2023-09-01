import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App.jsx'

describe('App/Home', () => {
    it('Renderiza página inicial', () => {
        render(<App />)

        const element = screen.getByText('MedicEasy')
        expect(element).toBeVisible()
    })

    it('Renderiza hospitales en componentes BigPicture', async() => {
        render(<App />);

        const option = { delay: 50 }
        await userEvent.type(screen.getByPlaceholderText('Buscar'), 'Community Health Center', option)
        expect(screen.getByText('Community Health Center')).toBeVisible()

    }, 9000)

    it('Boton perfil despliega un menu dropdown', () => {
        render(<App />)

        fireEvent.click(screen.getByText('Perfil'))
        const elemento = screen.getByText('Iniciar sesión')
        expect(elemento).toBeVisible()
        const element = screen.getByText('Registrarse')
        expect(element).toBeVisible()
    })

    it('Ingresa a pagina para iniciar sesion', () => {
        render(<App />)

        fireEvent.click(screen.getByText('Perfil'))
        fireEvent.click(screen.getByText('Iniciar sesión'))

        expect(screen.getByText('Log In')).toBeVisible()

        fireEvent.click(screen.getByText('Regresar a menu hospitales'))
        expect(screen.getByText('MedicEasy')).toBeVisible()
    })

    it('Ingresa a pagina de examenes', () => {
        render(<App />)

        fireEvent.click(screen.getByText('Exámenes'))

        expect(screen.getByText('Exámenes')).toBeVisible()
    })

    it('Busca un examen', async () => {
        render(<App />)

        fireEvent.click(screen.getByText('Exámenes'))

        const option = { delay: 500 }
        await userEvent.type(screen.getByPlaceholderText('Buscar'), 'Examen A', option)
        expect(screen.getByText('Examen A')).toBeVisible()
    }, 9000)
})

describe('App/Log_In', () => {
    it('Inicia sesión con un usuario', async() => {
        render(<App />)

        fireEvent.click(screen.getByText('Perfil'))
        fireEvent.click(screen.getByText('Iniciar sesión'))

        const options = { delay: 20 }
        await userEvent.type(screen.getByPlaceholderText('Escriba su correo'), 'user2@example.com', options)

        await userEvent.type(screen.getByPlaceholderText('Escriba su contraseña'), 'password2', options)

        expect(screen.getByPlaceholderText('Escriba su contraseña')).toHaveValue('password2')

        fireEvent.click(screen.getByText('Ingresar'))
    }, 9000)
})