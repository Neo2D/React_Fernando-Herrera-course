import { describe, expect, test, vi } from "vitest";
import { appRouter } from "./app.router";
import { createMemoryRouter, Outlet, RouterProvider, useParams } from "react-router";
import { render, screen } from "@testing-library/react";

vi.mock('@/herores/pages/home/HomePage', () => ({
    HomePage: () => <div data-testid="home-page"> <Outlet /> </div>
}))

vi.mock('@/herores/layouts/HeroesLayout', () => ({
    HeroesLayout: () => <div data-testid="hero-layout"></div>
}))

vi.mock('@/herores/pages/hero/HeroPage', () => ({
    HeroPage: () => {
        const { idSlug = '' } = useParams()

        return (
            <div data-testid="hero-page">
                HeroPage - {idSlug}
            </div>
        )
    }
}))

vi.mock('@/herores/pages/search/SearchPage', () => ({
    default: () => <div data-testid="search-page"></div>
}))

describe('appRouter', () => {
    test('should be configured as expected', () => {
        expect(appRouter.routes).toMatchSnapshot()
    })

    test('should render home page at root path', () => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/']
        })

        render(<RouterProvider router={router} />)

        expect(screen.getByTestId('home-page')).toBeDefined()
    })

    test('should render hero page at /heroes.:idSlug path', () => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/heroes/superman']
        })

        render(<RouterProvider router={router} />)

        expect(screen.getByTestId('hero-page').innerHTML).toContain('superman')
    })
    
    test('should render search page at /search path', async() => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/heroes/superman']
        })

        expect(await screen.findByTestId('search-page')).toBeDefined()

        render(<RouterProvider router={router} />)
    })

    test('should redirect to home page for unknown routes', async() => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/unknown-router']
        })

        expect(await screen.findByTestId('home-page')).toBeDefined()

        render(<RouterProvider router={router} />)
    })
})