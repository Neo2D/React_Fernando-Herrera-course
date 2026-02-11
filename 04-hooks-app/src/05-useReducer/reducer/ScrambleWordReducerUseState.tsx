export interface ScrambleWordsState {
    words: string[]
    currentWord: string
    scrambleWord: string
    guess: string
    points: number
    errorCounter: number
    MaxAllowErrors: number
    skipCounter: number
    maxSkips: number
    isGameOver: boolean
}

export type ScrambleWordsAction = { 
    type: 'NO_TENGO_LA_MENOR_IDEA_CUALES_ACCIONES_NECESITO' 
}