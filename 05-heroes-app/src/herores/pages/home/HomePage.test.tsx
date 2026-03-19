import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router";
import { usePaginatedHero } from "@/herores/hooks/usePaginatedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteHeroProvided } from "@/context/FavoriteHeroContext";

vi.mock('@/heroes/hooks/usePaginatedHero')

const mockUsePaginatedHero = vi.mocked(usePaginatedHero)

mockUsePaginatedHero.mockReturnValue({ 
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
} as unknown as ReturnType<typeof mockUsePaginatedHero>) 

const queryClient = new QueryClient()

const renderHomePage = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <FavoriteHeroProvided>
                <QueryClientProvider client={queryClient}>            
                    <HomePage />
                </QueryClientProvider>
            </FavoriteHeroProvided>
        </MemoryRouter>
    )
}

describe("HomePage", () => {
    test("should render homepage correctly", () => {
        const {container} = renderHomePage();

        expect(container).toMatchSnapshot();
    })

    test('should call usePaginatedHero with default values', () => {
        renderHomePage()

        expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 6, 'all')
    })

    test('should call usePaginatedHero with custom query params values', () => {
        renderHomePage(['/?page=2&limit=10&category=villains'])

        expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 6, 'all')
    })

    test('should call usePaginatedHero with default page and same limit on tab clicked', () => {
        renderHomePage(['/?tab=favorites&page=2&limit=10'])

        const [, , , villainsTab] = screen.getAllByRole('tab')

        fireEvent.click(villainsTab)

        expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 10, 'villain')
    })
})