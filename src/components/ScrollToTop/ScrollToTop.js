import { useEffect, useState } from 'react'
import './ScrollToTop.css'
import { BsArrowUpSquare } from "react-icons/bs";
import { BackTop } from 'antd'

function ScrollToTop() {
    const [heightPage, setHeightPage] = useState(0)
    const handleScroll = () => {
        setHeightPage(window.pageYOffset)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [])

    return (
        <section className="scroll">
            {heightPage > 1000 ? (
                <div>
                    <BackTop
                        className="scrolltotop"
                        style={{ color: 'white', right: '35px', bottom: '45px' }}
                    >
                        <BsArrowUpSquare style={{fontSize: '4.6rem', backgroundColor: 'rgb(109, 121, 181)', borderRadius: '6px'}} />
                    </BackTop>
                </div>
            ) : (
                ''
            )}
        </section>
    )
}

export default ScrollToTop
