import { describe, test, expect } from 'vitest'
import {render, screen} from '@testing-library/react'

import { MyAwesomeApp } from './MyAwesomeApp'

describe('MyAwesomeApp', () => { 
    test('should render firstName and lastName - screen', () => {
        render(<MyAwesomeApp />)
        screen.debug()

        const h1 = screen.getByTestId('first-name-title')
        expect(h1.innerHTML).toContain('Nombre')
    })

    test('should match snapshot', () => {
        render(<MyAwesomeApp />)

        expect(screen.getByTestId('div-app')).toMatchSnapshot()
    })
})