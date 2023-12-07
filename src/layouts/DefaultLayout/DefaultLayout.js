// import { Outlet } from 'react-router-dom'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import './DefaultLayout.css'

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div className="container-xxl">{children}</div>
            <Footer />
        </>
    )
}

export default DefaultLayout
