import { describe, test, vi, expect } from "vitest";
import { MyCounterApp } from "./MyCounterApp";
import { fireEvent, render, screen } from "@testing-library/react";

const handleAddMock = vi.fn()
const handleSubstractMock = vi.fn()
const handleResetMock = vi.fn()

vi.mock('../hooks/useCounter', () => ({
    useCounter: () => ({
        counter: 20,
        handleAdd: handleAddMock,
        handleSubstract: handleSubstractMock,
        handleReset: handleResetMock
    })
}))

describe('MyCounterApp', () => {
    test('should render the component', () => {
        render(<MyCounterApp />)

        expect(screen.getByRole('heading', {level: 1}).innerHTML).toContain(
            'counter: 20'
        )

        expect(screen.getByRole('button', {name: '+1'})).toBeDefined()
        expect(screen.getByRole('button', {name: '-1'})).toBeDefined()
        expect(screen.getByRole('button', {name: 'Reset'})).toBeDefined()
    });

    test('should call handleAdd if botton is clicked', () => {
        render(<MyCounterApp />)

        const button = screen.getByRole('button', {name: '+1'})

        fireEvent.click(button)

        expect(handleAddMock).toHaveBeenCalled()

    })
})