import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import BigPicture from './BigPicture'

describe('Componente BigPicture', () => {
  it('Renderiza bien el componente', () => {
    render(<BigPicture nombre={"Hospital A"} />)

    const element = screen.getByText('Hospital A')
    expect(element).toBeInTheDocument()
  })

  it('Se puede presionar', () => {
    const spy = vi.fn()
    render(<BigPicture nombre={"Hospital A"} click={spy} />)
    
    const element = screen.getByText('Hospital A')
    fireEvent.click(element)
    fireEvent.click(element)
    fireEvent.click(element)
    
    expect(spy).toHaveBeenCalledTimes(3)
  })

  it('Funciona el presionar', () => {
    const handleClick = async () => {
      render(<BigPicture nombre={"Zona 5"} />)
    }

    render(<BigPicture nombre={"Zona 2"} click={() => handleClick()} />)

    const element = screen.getByText('Zona 2')
    const options = { delay: 1000 };
    fireEvent.click(element, options)

    const element1 = screen.getByText('Zona 5')
    expect(element1).toBeInTheDocument()
  })
})
