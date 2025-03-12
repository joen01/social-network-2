import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import FriendsContainer from "./components/Friends/FriendsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/Profile Container2";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initializedApp} from "./Redux/App-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {useEffect} from "react";


const App = ({initializedApp,initialized}) => {

    useEffect(()=>{
        initializedApp()
    },[initializedApp])

    if (!initialized){
        return <Preloader/>
    }

    return (
        <div className="app-wrapper">
            <HeaderContainer/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Routes>
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

const mapStateToProps = (state) => ({
        initialized: state.app.initialized,
    })


export default connect(mapStateToProps, {initializedApp})(App);
