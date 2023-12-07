import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Fragment } from 'react'
import { DefaultLayout } from './layouts'
import { useSelector } from 'react-redux'
import NotFound from './components/NotFound/NotFound'

import { adminRoutes } from './routers/adminRouters'
import { userRoutes } from './routers/userRouters'
import { publishRoutes } from './routers/publishRouters'

function App() {
    const userSignin = useSelector((state) => state.getUsers)
    const { userInfo } = userSignin
    return (
        <BrowserRouter>
            <div className="App">
                {userInfo ? (
                    userInfo.isAdmin ? (
                        <>
                            <Routes>
                                {adminRoutes.map((route, index) => {
                                    let Layout = DefaultLayout

                                    if (route.layout) {
                                        Layout = route.layout
                                    } else if (route.layout === null) {
                                        Layout = Fragment
                                    }

                                    const Page = route.component
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            }
                                        />
                                    )
                                })}
                                {userRoutes.map((route, index) => {
                                    let Layout = DefaultLayout

                                    if (route.layout) {
                                        Layout = route.layout
                                    } else if (route.layout === null) {
                                        Layout = Fragment
                                    }

                                    const Page = route.component
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            }
                                        />
                                    )
                                })}
                                {publishRoutes.map((route, index) => {
                                    let Layout = DefaultLayout

                                    if (route.layout) {
                                        Layout = route.layout
                                    } else if (route.layout === null) {
                                        Layout = Fragment
                                    }

                                    const Page = route.component
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            }
                                        />
                                    )
                                })}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </>
                    ) : (
                        <>
                            <Routes>
                                {userRoutes.map((route, index) => {
                                    let Layout = DefaultLayout

                                    if (route.layout) {
                                        Layout = route.layout
                                    } else if (route.layout === null) {
                                        Layout = Fragment
                                    }

                                    const Page = route.component
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            }
                                        />
                                    )
                                })}
                                {publishRoutes.map((route, index) => {
                                    let Layout = DefaultLayout

                                    if (route.layout) {
                                        Layout = route.layout
                                    } else if (route.layout === null) {
                                        Layout = Fragment
                                    }

                                    const Page = route.component
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            }
                                        />
                                    )
                                })}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </>
                    )
                ) : (
                    <Routes>
                        {publishRoutes.map((route, index) => {
                            let Layout = DefaultLayout

                            if (route.layout) {
                                Layout = route.layout
                            } else if (route.layout === null) {
                                Layout = Fragment
                            }

                            const Page = route.component
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            )
                        })}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                )}
            </div>
        </BrowserRouter>
    )
}

export default App
