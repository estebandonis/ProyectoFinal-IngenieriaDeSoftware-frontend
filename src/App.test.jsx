import React from 'react'
import {render, screen, fireEvent, act} from '@testing-library/react'
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

        const option = { delay: 100 }
        await userEvent.type(screen.getByPlaceholderText('Buscar'), 'Hospital Alpha', option)
        expect(screen.getByText('Hospital Alpha')).toBeVisible()

    }, 15000)

    it('Boton perfil despliega un menu dropdown', () => {
        render(<App />)

        fireEvent.click(screen.getByText('Perfil'))
        const elemento = screen.getByText('Ingresar')
        expect(elemento).toBeVisible()
    })

    // it('Ingresa a pagina para iniciar sesion', async() => {
    //     vitest.useFakeTimers()
    //
    //     render(<App />)
    //
    //     fireEvent.click(screen.getByText('Perfil'))
    //     fireEvent.click(screen.getByText('Iniciar sesión'))
    //
    //     expect(screen.getByText('Iniciar Sesión')).toBeVisible()
    //
    //     fireEvent.click(screen.getByText('Regresar a menu hospitales'))
    //
    //     // const option = { delay: 2000 }
    //     // await userEvent.type(screen.getByPlaceholderText('Escriba su correo'), 'user1@example.com', option)
    //
    //     act(() => {
    //         vitest.advanceTimersByTime(6000)
    //     });
    //
    //     test('delayed test', () => {
    //         // test logic
    //     }, 3000)
    //
    //     await timeout(3000)
    //
    //     expect(screen.getByText('MedicEasy')).toBeVisible()
    //
    // }, 16000)

    it('Ingresa a pagina de examenes', () => {
        render(<App />)

        fireEvent.click(screen.getByText('Exámenes'))

        expect(screen.getByText('Exámenes')).toBeVisible()
    })

    it('Busca un examen', async () => {
        render(<App />)

        fireEvent.click(screen.getByText('Exámenes'))

        const option = { delay: 500 }
        await userEvent.type(screen.getByPlaceholderText('Buscar'), 'Radiografía', option)
        expect(screen.getByText('Radiografía')).toBeVisible()
    }, 9000)
})

describe('App/Log_In', () => {
    it('Inicia sesión con un usuario', async() => {
        render(<App />)

        fireEvent.click(screen.getByText('Perfil'))
        fireEvent.click(screen.getByText('Ingresar'))

        const options = { delay: 20 }
        await userEvent.type(screen.getByPlaceholderText('Escriba su correo'), 'user2@example.com', options)

        await userEvent.type(screen.getByPlaceholderText('Escriba su contraseña'), 'password2', options)

        expect(screen.getByPlaceholderText('Escriba su contraseña')).toHaveValue('password2')

        fireEvent.click(screen.getByText('Ingresar'))
    }, 9000)
})