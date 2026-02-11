import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";


describe('SearchBar', () => {

    test('should render searchbar correctly', () => {
        const { container } = render(<SearchBar placeholder = 'Buscar' onQuery={()=>{}} />)

        expect(container).toMatchSnapshot()
        expect(screen.getByRole('textbox')).toBeDefined()
        expect(screen.getByRole('button')).toBeDefined()
    })

    test('should call onQuery with the correct value after 700ms', async () => {
        const onQuery = vi.fn()
        render(<SearchBar placeholder = 'Buscar' onQuery={onQuery} />)

        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: {value: 'test'} })

        // await new Promise(resolve => setTimeout(resolve, 701))
        await waitFor(() => {
            expect(onQuery).toHaveBeenCalled()
            expect(onQuery).toHaveBeenCalledWith('test')
        })
    })

    test('should call only once with the last value debounce', () => {
        const onQuery = vi.fn();
        render(<SearchBar placeholder = 'Buscar' onQuery={onQuery} />)

        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: {value: 'test'} })
    })

    test('should call onQuery when button clicked with the input value', () => {
        const onQuery = vi.fn();
        render(<SearchBar placeholder = 'Buscar' onQuery={onQuery} />)

        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: {value: 'test'} })

        const button = screen.getByRole('button')
        fireEvent.click(button)

        expect(onQuery).toHaveBeenCalledTimes(1)
        expect(onQuery).toHaveBeenCalledWith('test')
    })

    test('should the input has the correct placeholder value', () => {
        
        const value = 'Buscar gif'

        render(<SearchBar placeholder = {value} onQuery={()=>{}} />)

        expect(screen.getByPlaceholderText(value)).toBeDefined()


    })
})