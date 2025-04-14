import './App.css';
import Navbar from './components/Navbar/Navbar';
// import News from "./components/News/News";
// import Music from "./components/Music/Music";
// import Settings from "./components/Settings/Settings";
import {HashRouter, Route, Routes} from "react-router-dom";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
// import FriendsContainer from "./components/Friends/FriendsContainer";
// import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/Profile Container2";
import HeaderContainer from "./components/Header/HeaderContainer";
// import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {initializedApp} from "./Redux/App-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import React, {lazy, useEffect} from "react";
import store from "./Redux/Redux-store";
import WithSuspense from "./Hoc/WithSuspense";

const DialogsContainer = WithSuspense(lazy(() => import('./components/Dialogs/DialogsContainer')));
const UsersContainer = WithSuspense(lazy(() => import('./components/Users/UsersContainer')));
const FriendsContainer = WithSuspense(lazy(() => import('./components/Friends/FriendsContainer')));
const Login = WithSuspense(lazy(() => import('./components/Login/Login')));
const Music = WithSuspense(lazy(() => import('./components/Music/Music')));
const News = WithSuspense(lazy(() => import('./components/News/News')));
const Settings = WithSuspense(lazy(() => import('./components/Settings/Settings')));


const App = ({initializedApp, initialized}) => {

    useEffect(() => {
        initializedApp()
    }, [initializedApp])

    if (!initialized) {
        return <Preloader/>
    }

    return (
        <div className="app-wrapper">
            <HeaderContainer/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Routes>
                    <Route path="/Profile/:userId?" element={<ProfileContainer/>}/>
                    {/*<Route path="/Dialogs/*" element={<Suspense fallback={<Preloader />}>*/}
                    {/*    <DialogsContainer/>*/}
                    {/*</Suspense>}/>*/}
                    <Route path="/Dialogs/*" element={<DialogsContainer/>}/>
                    <Route path="/News/*" element={<News/>}/>
                    <Route path="/Music/*" element={<Music/>}/>
                    <Route path="/Settings/*" element={<Settings/>}/>
                    <Route path="/Friends/*" element={<FriendsContainer/>}/>
                    <Route path="/Users/*" element={<UsersContainer/>}/>
                    <Route path="/Login/*" element={<Login/>}/>
                </Routes>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
})


const AppContainer = connect(mapStateToProps, {initializedApp})(App);

const AppSamurai = () => {
    return (
        <HashRouter>
            <React.StrictMode>
                <Provider store={store}>
                    <AppContainer/>
                </Provider>
            </React.StrictMode>
        </HashRouter>)
};

export default AppSamurai