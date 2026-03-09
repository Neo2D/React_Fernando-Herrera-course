import { describe, expect, test, vi } from "vitest";
import { appRouter } from "./app.router";
import { Outlet, RouterProvider } from "react-router";
import { render, screen } from "@testing-library/react";

vi.mock('@/herores/pages/home/HomePage', () => ({
    HomePage: () => <div data-testid="home-page"> <Outlet /> </div>
}))

vi.mock('@/herores/layouts/HeroesLayout', () => ({
    HeroesLayout: () => <div data-testid="hero-layout"></div>
}))

describe('appRouter', () => {
    test('should be configured as expected', () => {
        expect(appRouter.routes).toMatchSnapshot()
    })

    test('should render home page at root path', () => {
        render(<RouterProvider router={appRouter} />)

        expect(screen.getByTestId('home-page')).toBeDefined()
    })
})