import { renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useGifs } from "./useGifs";
// import * as gifActions from "../actions/get-gifs-by-query.action";

describe('useGifs', () => {

    test('should return default value and methods', () => {
        const { result } = renderHook(() => useGifs())

        expect(result.current.gifs.length).toBe(0)
        expect(result.current.previousTerms.length).toBe(0)
        expect(result.current.handleSearch).toBeDefined()
        expect(result.current.handleTermClick).toBeDefined()
    })

    // test('should return a list of gifs', async () => {
    //     const { result } = renderHook(() => useGifs())

    //     await act(async () => {
    //         await result.current.handleSearch('goku')
    //     })

    //     expect(result.current.gifs.length).toBe(10)
    // })

    // test('should return a list of gifs when handleTermClicked is called', async () => {
    //     const { result } = renderHook(() => useGifs())

    //     await act(async () => {
    //         await result.current.handleTermClick('goku')
    //     })

    //     expect(result.current.gifs.length).toBe(10)
    // })

    // test('should return a list of gifs from cache', async () => {
    //     const { result } = renderHook(() => useGifs())

    //     await act(async () => {
    //         await result.current.handleTermClick('goku')
    //     })

    //     expect(result.current.gifs.length).toBe(10)

    //     vi.spyOn(gifActions, 'getGifsByQuery').mockRejectedValue(
    //         new Error('This is my custom error')
    //     )

    //     await act(async () => {
    //         await result.current.handleTermClick('goku')
    //     })

    //     expect(result.current.gifs.length).toBe(10)
    // })

    // test('should return no more than 8 previous terms', async () => {
    //     const { result } = renderHook(() => useGifs())
        
    //     vi.spyOn(gifActions, 'getGifsByQuery').mockRejectedValue([])

    //     await act (async () => {
    //         await result.current.handleSearch('goku1')
    //     })
    // })
})
