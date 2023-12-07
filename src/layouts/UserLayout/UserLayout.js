import AccountSidebar from '../../components/Account/AccountSidebar/AccountSidebar'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import './UserLayout.css'

function UserLayout({ children }) {
    return (
        <>
            <Header />
            <div className="container-xxl">
                <div className="account_user_card">
                    <AccountSidebar />
                    {/* <div className="account_content"> */}
                    {children}
                    {/* </div> */}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UserLayout
