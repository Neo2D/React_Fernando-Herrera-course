import { StrictMode } from "react";
import { ItemCounter } from "./shopping-cart/ItemCounter";

interface ItemInCart {
    productName: string,
    quantity: number
}

const itemsInCart: ItemInCart[] = [
    {productName: 'Nintendo Switch 2', quantity: 1},
    {productName: 'Pro controller', quantity: 2},
    {productName: 'Super Smash Bros', quantity: 5}
]

export function FirstStepsApp() {
    return (
        <StrictMode>
            <h1>Carrito de compras</h1>
            {
                itemsInCart.map( ({productName, quantity}) => (
                    <ItemCounter key={productName} name={productName} quantity={quantity} />
                ) )
            }



            {/* <ItemCounter name="Nintendo Switch 2" quantity={10} />
            <ItemCounter name="Pro controller" quantity={5} />
            <ItemCounter name="Super Smash Bros" quantity={20} /> */}
        </StrictMode>
    )
}