import { describe, test, expect } from 'vitest'
import {render, screen} from '@testing-library/react'
import { CustomHeader } from './CustomHeader'


describe('CustomHeader', () => { 
    const title = 'Ejemplo'
    const description = "Ejemplo de descripcion"

    test('should render the title', () => {
        render(<CustomHeader title={title} />)

        expect(screen.getByText(title)).toBeDefined()
    });
    
    test('should render the description', () => {
        render(<CustomHeader title='Ejemplo' description={description} />)

        expect(screen.getByText(description)).toBeDefined()
    });

    test('should not render description when not provided', () => {
        const { container } = render(<CustomHeader title={'Ejemplo'} />)

        const divElement = container.querySelector('.content-center')

        const h1 = divElement?.querySelector('h1')
        expect(h1?.innerHTML).toBe(title)

        const p = divElement?.querySelector('p')
        expect(p).toBeNull()
    })
 })