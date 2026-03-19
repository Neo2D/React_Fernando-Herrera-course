import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { SearchPage } from "./SearchPage";
import { MemoryRouter } from "react-router";
import { QueryClientProvider } from "node_modules/@tanstack/react-query/build/modern/QueryClientProvider";
import { QueryClient } from "@tanstack/react-query";
import { searchHearoesAction } from "@/herores/actions/search-heroes.action";
import type { Hero } from "@/herores/types/hero.interface";

vi.mock('@/heroes/actions/search-heroes-action')
const mockSearchHeroesAction = vi.mocked(searchHearoesAction)

vi.mock('@/heroes/custom/CustomJumbotron', () => ({
    CustomJumbotron: () => <div data-testid="custom-jumbotron"></div>
}))

vi.mock('@/heroes/components/HeroGrid', () => ({
    HeroGrid: ({heroes}: {heroes: Hero[]}) => (<div data-testid="hero-grid">
        {
            heroes.map(hero => (<div key={hero.id}>{hero.name}</div>))
        }
    </div>)
}))

const queryClient = new QueryClient()

const renderSearchPage = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <QueryClientProvider client={queryClient}>
                <SearchPage />
            </QueryClientProvider>
        </MemoryRouter>
    )
}

describe("SearchPage", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("should render SearchPage with default values", () => {
        const { container } = renderSearchPage()

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: undefined,
            strength: undefined
        })

        expect(container).toMatchSnapshot()
    })

    test('should call search action with name parameter', () => {
        const { container } = renderSearchPage(['/search?name=superman'])

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: 'superman',
            strength: undefined
        })

        expect(container).toMatchSnapshot()
    })

    test('should call search action with strength parameter', () => {
        const { container } = renderSearchPage(['/search?strength=6'])

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: 'superman',
            strength: '6'
        })

        expect(container).toMatchSnapshot()
    })

    test('should call search action with name and strength parameter', () => {
        const { container } = renderSearchPage(['/search?strength=8&name=batman'])

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: 'batman',
            strength: '8'
        })

        expect(container).toMatchSnapshot()
    })

    test('should render hero grid with search results', async() => {
        const mockHeroes = [
            { id: '1', name: 'Clark Kent'} as unknown as Hero,
            { id: '2', name: 'Bruce Wayne'} as unknown as Hero,
        ]

        mockSearchHeroesAction.mockResolvedValue(mockHeroes)

        renderSearchPage()

        await waitFor(() => {
            expect(screen.getByText('Clark Kent')).toBeDefined()
            expect(screen.getByText('Bruce Wayne')).toBeDefined()
        })
    })
})