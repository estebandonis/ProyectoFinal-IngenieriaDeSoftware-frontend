import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import Examen from './Examen'

describe('Examen', () => {
  it('Se le puede colocar un nombre al componente', () => {
    render(<Examen nombre={"Radiografía"} />)

    const element = screen.getByText('Radiografía')
    expect(element).toBeInTheDocument()
  })

  it('Se puede presionar', () => {
    const spy = vi.fn()
    render(<Examen nombre={"Radiografía"} onclick={spy} />)
    
    const element = screen.getByText('Radiografía')
    fireEvent.click(element)
    fireEvent.click(element)
    fireEvent.click(element)
    fireEvent.click(element)
    fireEvent.click(element)
    
    expect(spy).toHaveBeenCalledTimes(5)
  })

  it('Realiza una función al presionar', () => {
    const handleClick = async () => {
      render(<Examen nombre={"Vasectomía"} onclick={() => handleClick()} />)
    }

    render(<Examen nombre={"Radiografía"} onclick={() => handleClick()} />)
    
    const element = screen.getByText('Radiografía')

    const options = { delay: 1000 };
    fireEvent.click(element, options)

    const element1 = screen.getByText('Vasectomía')
    expect(element1).toBeInTheDocument()
  })
})
