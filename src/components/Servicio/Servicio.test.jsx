import React from 'react'
import { render, screen } from '@testing-library/react'

import Servicio from './Servicio'

describe('Componente Servicio', () => {
  it('Renderiza bien el componente', () => {
    render(<Servicio examen={"Colonoscopia"} />)

    const element = screen.getByText('Colonoscopia')
    expect(element).toBeInTheDocument()
  })

  it('Despliega un precio', () => {
    render(<Servicio precio={"1000"} />)

    const element = screen.getByText('1000')
    expect(element).toBeInTheDocument()
  })

  it('Despliega un nombre y un precio', () => {
    render(<Servicio examen={"Colonoscopia"} precio={"1000"} />)

    const element = screen.getByText('Colonoscopia' && '1000')
    expect(element).toBeInTheDocument()
  })
})
