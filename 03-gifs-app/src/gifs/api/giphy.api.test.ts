import { describe, expect, test } from "vitest";
import { giphyAPI } from "./giphy.api";


describe('giphyAPI', () => {
    test('should be configured correctly', () => {
        const params = giphyAPI.defaults.params

        expect(giphyAPI.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs')
        expect(params.lang).toBe('es')
        expect(params.api_key).toBe(import.meta.env.VITE_GIPHY_API_KEY)

        expect(params).toStrictEqual({
            lang: 'es',
            api_key: import.meta.env.VITE_GIPHY_API_KEY
        })
    })
})