import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { FirstStepsApp } from "./firstStepsApp";


const mockItemCounter = vi.fn( (_props:unknown) => {
    return <div data-testid="ItemCounter" />
})

vi.mock('./shopping-cart/ItemCounter', () => ({
    ItemCounter: (props:unknown) => mockItemCounter(props)
}))

// vi.mock('./shopping-cart/ItemCounter', () => ({
//     ItemCounter: (props:unknown) => <div data-testid="ItemCounter" name={props.name} quantity={props.quantity} />
// }))

describe('FirstStepsApp', () => {

    afterEach(() => {
        vi.clearAllMocks()
    })

    test('should render the correct number of item components', () => {
        render(<FirstStepsApp />)

        const itemCounters = screen.getAllByTestId('ItemCounter')

        expect(itemCounters.length).toBe(3)

        screen.debug()
    })

    test('should render ItemCounter with correct props', () => {
        render(<FirstStepsApp />)

        expect(mockItemCounter).toHaveBeenCalledTimes(6)
        expect(mockItemCounter).toHaveBeenCalledWith(
            {name: 'Nintendo Switch 2', quantity: 1}
        )
    })

})