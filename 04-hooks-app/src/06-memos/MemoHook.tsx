import { useCallback, useState } from "react"
import { MyTitle } from "./ui/MyTitle"
import { MySubTitle } from "./ui/MySubTitle"

const handleMyAPICall = (myValue: string) => {
    console.log('texto' + myValue)
}

export const MemoHook = () => {
    const [title, setTitle] = useState('Hola')
    const [subTitle, setSubTitle] = useState('Mundo')

  return (
    <div className="bg-gradient flex flex-col gap-4">
        <h1 className="text-2xl font-thin text-white">|MemoApp</h1>

        <MyTitle title={title} />
        <MySubTitle subtitle={subTitle} callMyAPI={handleMyAPICall} />

        <h6>Mi Subtitulo</h6>

        <button className="bg-blue-500 text-white px-4 py-2 rounder-md cursor-pointer"
            onClick={() => setTitle('Hello')}
        >
            Cambiar titulo
        </button>

        <button className="bg-blue-500 text-white px-4 py-2 rounder-md cursor-pointer"
            onClick={() => setSubTitle('World')}
        >
            Cambiar subtitulo
        </button>
    </div>
  )
}
