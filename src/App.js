import logo from './logo.svg';
import './App.css';
import Header from './companents/Header/Header';
import Navbar from './companents/Navbar/Navbar';
import Profile from './companents/Profile/Profile';
import Dialogs from "./companents/Dialogs/Dialogs";
import News from "./companents/News/News";
import Music from "./companents/Music/Music";
import Settings from "./companents/Settings/Settings";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Friends from "./companents/Friends/Friends";
import {addMes, updateNewMesText, updateNewPostText} from "./Redux/Store";
import DialogsContainer from "./companents/Dialogs/DialogsContainer";
import FriendsContainer from "./companents/Friends/FriendsContainer";
import UsersContainer from "./companents/Users/UsersContainer";
import ProfileContainer from "./companents/Profile/Profile Container";


const App = (props) => {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Routes>
                    <Route path="/Profile/*" element={<ProfileContainer/>}/>
                    <Route path="/Dialogs/*" element={<DialogsContainer/>}/>
                    <Route path="/News/*" element={<News/>}/>
                    <Route path="/Music/*" element={<Music/>}/>
                    <Route path="/Settings/*" element={<Settings/>}/>
                    <Route path="/Friends/*" element={<FriendsContainer/>}/>
                    <Route path="/Users/*" element={<UsersContainer/>}/>
                </Routes>
            </div>
        </div>
    )
}


export default App;
