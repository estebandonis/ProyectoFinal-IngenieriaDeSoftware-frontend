import React from 'react'
import { render, screen } from '@testing-library/react'

import Review from './Review'

describe('Componente Review', () => {
  it('Se puede escribir un nombre', () => {
    render(<Review nombre={"Esteban"} />)

    const element = screen.getByText('Esteban')
    expect(element).toBeInTheDocument()
  })

  it('Se puede escribir un comentario', () => {
    render(<Review comentario={"Su servicio es bastante ágil y rápido"} />)

    const element = screen.getByText('Su servicio es bastante ágil y rápido')
    expect(element).toBeInTheDocument()
  })

  it('Se puede escribir un nombre y un comentario', () => {
    render(<Review nombre={"Esteban"} comentario={"Su servicio es bastante ágil y rápido"} />)

    const element = screen.getByText('Esteban' && 'Su servicio es bastante ágil y rápido')
    expect(element).toBeInTheDocument()
  })
})
