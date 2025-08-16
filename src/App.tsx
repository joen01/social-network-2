// import News from "./components/News/News";
// import Music from "./components/Music/Music";
// import Settings from "./components/Settings/Settings";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
// import FriendsContainer from "./components/Friends/FriendsContainer";
// import UsersContainer from "./components/Users/UsersContainer";
// import Login from "./components/Login/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import Navbar from 'src/components/Navbar/Navbar';
import ProfileContainer from "./components/Profile/ProfileContainer2";
import HeaderContainer from "src/components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {initializedApp} from "./Redux/App-reducer";
import Preloader from "src/components/common/Preloader/Preloader";
import React, {ComponentType, lazy, useEffect} from "react";
import store, {AppStateType} from "./Redux/Redux-store";
import WithSuspense from "src/Hoc/WithSuspense";

const DialogsContainer = WithSuspense(lazy(() => import('./components/Dialogs/DialogsContainer')as Promise<{ default: ComponentType<any> }>));
const UsersContainer = WithSuspense(lazy(() => import('./components/Users/UsersContainer')));
const FriendsContainer = WithSuspense(lazy(() => import('./components/Friends/FriendsContainer')));
const Login = WithSuspense(lazy(() => import('./components/Login/Login')));
const Music = WithSuspense(lazy(() => import('src/components/Music/Music')));
const News = WithSuspense(lazy(() => import('./components/News/News')));
const Settings = WithSuspense(lazy(() => import('src/components/Settings/Settings')));

type MapPropsType= ReturnType<typeof mapStateToProps>
type DispatchPropsType= {
    initializedApp: ()=>void
}

const App:React.FC<MapPropsType & DispatchPropsType> = ({initializedApp, initialized}) => {

    useEffect(() => {
        initializedApp();
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
                    <Route path="/" element={<ProfileContainer/>}/>
                    <Route path="*" element={<b> 404 NOT FOUND </b>}/>
                    <Route path="/Profile/:userId?" element={<ProfileContainer/>}/>
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

const mapStateToProps = (state:AppStateType) => ({
    initialized: state.app.initialized,
})


const AppContainer = connect(mapStateToProps, {initializedApp})(App);


const AppSamurai:React.FC = () => {
    return (
        <BrowserRouter>
            <React.StrictMode>
                <Provider store={store}>
                    <AppContainer/>
                </Provider>
            </React.StrictMode>
        </BrowserRouter>)
};

export default AppSamurai