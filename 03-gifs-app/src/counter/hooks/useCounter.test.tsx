import { renderHook, act } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";

describe('useCounter', () => {

    test('should initiliaze with default value of 10', () => {
        const { result } = renderHook(() => useCounter())
        expect(result.current.counter).toBe(5)
    });

    test('should initiliaze with value of 20', () => {
        const { result } = renderHook(() => useCounter(20))
        expect(result.current.counter).toBe(20)
    });

    test('should increment counter when handleAdd is called', () => {
        const { result } = renderHook(() => useCounter())

        act(() => {
            result.current.handleAdd()
        })

        expect(result.current.counter).toBe(6)
    });

    test('should decrease counter when handleSubstract is called', () => {
        const { result } = renderHook(() => useCounter())

        act(() => {
            result.current.handleSubstract()
        })

        expect(result.current.counter).toBe(4)
    });

    test('should reset the counter when handleReset is called', () => {
        const { result } = renderHook(() => useCounter())

        act(() => {
            result.current.handleReset()
        })

        expect(result.current.counter).toBe(5)
    })
})
