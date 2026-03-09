import { describe, expect, test, vi } from "vitest";
import {renderHook, waitFor} from '@testing-library/react'
import { useHeroSummary } from "./useHeroSummary";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { getSummaryAction } from "../actions/get-summary.action";
import type { SummaryInformationResponse } from "../types/summary-information.response";

vi.mock('../actions/get-summary.action', () => ({
    getSummaryAction: vi.fn()
}))

const mockGetSummaryAction = vi.mocked(getSummaryAction)

const tanStackCustomProvided = () => {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    })

    return ({children}: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

describe('useHeroSummary', () => {
    test('should return the initial state (isLoading)', () => {
        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvided()
        })

        expect(result.current.isLoading).toBeTruthy()
        expect(result.current.isError).toBe(false)
        expect(result.current.data).toBe(undefined)
    })

    test('should return success state with data when API call succeed', async() => {
        const mockSummaryData = {
            totalHeroes: 10,
            strongestHero: {
                id: '1',
                name: 'Superman'
            },
            smartestHero: {
                id: '2',
                name: 'Batman'
            },
            heroCount: 18,
            villainCount: 7
        } as SummaryInformationResponse

        mockGetSummaryAction.mockResolvedValueOnce(mockSummaryData)

        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvided()
        })

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy()
        })

        expect(result.current.isError).toBe(false)
        expect(mockGetSummaryAction).toHaveBeenCalled()
    })

    test('should return errro state when API call fails', async() => {
        const mockError = new Error('Failed to getch summary')

        mockGetSummaryAction.mockRejectedValue(mockError)

        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvided()
        })

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy()
        })

        expect(result.current.error).toBeDefined()
        expect(result.current.isLoading).toBe(false)
        expect(mockGetSummaryAction).toHaveBeenCalled()
        expect(mockGetSummaryAction).toHaveBeenCalledTimes(1)
    })
})