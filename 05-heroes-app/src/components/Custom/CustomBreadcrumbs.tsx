import { Link } from "react-router"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb"
import { SlashIcon } from "lucide-react"

interface Breadcrumb {
    label: string
    to: string
}

interface Props {
    currentPage: string
    breadcrumbs?: Breadcrumb[]
}

export const CustomBreadcrumbs = ({currentPage, breadcrumbs = []}: Props) => {
  return (
    <Breadcrumb>
        <BreadcrumbList className="my-5">
            <BreadcrumbItem>
            <BreadcrumbLink asChild>
                <Link to='/'>Home</Link>
            </BreadcrumbLink>
            </BreadcrumbItem>

            {
                breadcrumbs.map(crumbs => (
                    <div className="flex item-center">
                        <BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <SlashIcon />
                        </BreadcrumbSeparator>
                        <BreadcrumbLink asChild>
                            <Link to={crumbs.to}>{crumbs.label}</Link>
                        </BreadcrumbLink>
                        </BreadcrumbItem>
                    </div>
                ))
            }
            <BreadcrumbSeparator>
                <SlashIcon />
            </BreadcrumbSeparator>

            <BreadcrumbItem>
            <BreadcrumbLink className="text-black">{currentPage}</BreadcrumbLink>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
  )
}
