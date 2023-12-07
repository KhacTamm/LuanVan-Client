import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

// import reportWebVitals from './reportWebVitals'
import App from './App'
import store from '../src/redux/store'

// import 'antd/dist/antd.css'
import 'antd/dist/reset.css'
import 'leaflet/dist/leaflet.css'
import '../src/assets/globalStyles/globalStyles.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <Provider store={store}>
        {/* <Provider> */}
        {/* <React.StrictMode> */}
        <App />
        {/* </React.StrictMode> */}
    </Provider>,
    // document.getElementById('root'),
)

// reportWebVitals()
