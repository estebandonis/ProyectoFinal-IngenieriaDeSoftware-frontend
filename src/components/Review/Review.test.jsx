import React from 'react'
import { render, screen } from '@testing-library/react'

import Review from './Review'

describe('Review', () => {
  it('Throws error when number over 9 chars', () => {
    render(<Review nombre={"Prueba"} comentario={"Esta es una prueba"} />)

    screen.debug()
  })
})
