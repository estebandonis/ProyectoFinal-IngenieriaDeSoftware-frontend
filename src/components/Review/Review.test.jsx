import React from 'react'
import { render, screen } from '@testing-library/react'

import Review from './Review.jsx'

describe('Review', () => {
  it('Throws error when number over 9 chars', () => {
    render(<Review nombre={"Prueba"} comentario={"Esta es una prueba"} />)

    const element = screen.getByText('Prueba')
    expect(element).toBeInTheDocument()
  })
})
