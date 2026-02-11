import { StrictMode, type CSSProperties } from "react";

const firstName = 'Nombre'
const lastName = 'Apellido'

const games = ['Sonic', 'Metal Gear', 'Zelda']
const isActive = true

const address = {
    zipCode: 'Num',
    country: 'RD'
}

const myStyles: CSSProperties = {
        backgroundColor: 'grey',
        borderRadius: isActive ? 10 : 20,
        padding: 10,
        marginTop: 30
}

export function MyAwesomeApp() {
    return (
        <div data-testid="div-app">
            <h1 data-testid="first-name-title">{firstName}</h1>
            <h3>{lastName}</h3>

            <p className="mi-clase-favorita">{games.join(', ')}</p>
            <h1>{isActive ? 'Active' : 'Inactive'}</h1>

            <p style={ myStyles }>
                {JSON.stringify(address)}
            </p>
        </div>
    )
}