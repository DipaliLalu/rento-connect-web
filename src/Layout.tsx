import { Outlet } from "react-router-dom"
import Footer from "./components/sections/footer"
import Header from "./pages/header"


function Layout() {
    return (
        <div className="flex flex-col bg-[var(--color-muted-foreground)]/5">
            <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <Header />
            </div>
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout
