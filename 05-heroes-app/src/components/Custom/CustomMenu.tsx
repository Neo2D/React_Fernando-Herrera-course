import { cn } from '@/lib/utils'
import { NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenu } from '../ui/navigation-menu'
import { Link, useLocation } from 'react-router'

export const CustomMenu = () => {

    const { pathname } = useLocation()

    const isActive = (path: string) => {
        return pathname === path
    }

  return (
    <NavigationMenu className='py-5'>
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(isActive('/') && 'bg-slate-200', 'p-2', 'rounded-md')}>
                    <Link to='/'>Home</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(isActive('/search') && 'bg-slate-200', 'p-2', 'rounded-md')}>
                    <Link to='/search'>Search super hero</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
  )
}
