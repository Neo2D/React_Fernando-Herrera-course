const useState = (texto:string) => {
    return [texto, (nombre:string) => {console.log(nombre)}] as const
}

const [name, setName] = useState('Goku')

console.log(name)
setName('Vegeta')