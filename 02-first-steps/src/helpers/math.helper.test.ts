import {describe, expect, test} from 'vitest'
import { sum, subtract } from './math.helper'

describe('op', () => {
    test('Should add 2 positive numbers', () => {
        const a = 1
        const b = 2

        const result = sum(a, b)

        expect(result).toBe(3)
    })
})

describe('new op', () => {
    test('Should subtract 1 positive numbers', () => {
        const a = 1
        const b = 2

        const result = subtract(a, b)

        expect(result).toBe(-1)
    })

    test('Should subtract 1 positive numbers', () => {
        const a = 3
        const b = 2

        const result = subtract(a, b)

        expect(result).toBe(1)
    })
})


