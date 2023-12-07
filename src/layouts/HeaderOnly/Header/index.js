import { Link } from 'react-router-dom'

import images from '../../../assets'
import '../HeaderOnly.css'

function Header({ title }) {
    return (
        <div className="warp_subHeader">
            <div className="subHeader">
                <Link to="/" className="subHeader_logo">
                    <img src={images.logo} alt="logo" />
                </Link>
                <div className="titleType">{title}</div>
            </div>
        </div>
    )
}

export default Header
