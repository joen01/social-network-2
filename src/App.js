import './App.css';
import Header from './companents/Header/Header';
import Navbar from './companents/Navbar/Navbar';
import News from "./companents/News/News";
import Music from "./companents/Music/Music";
import Settings from "./companents/Settings/Settings";
import {Route, Routes} from "react-router-dom";
import DialogsContainer from "./companents/Dialogs/DialogsContainer";
import FriendsContainer from "./companents/Friends/FriendsContainer";
import UsersContainer from "./companents/Users/UsersContainer";
import ProfileContainerUserId from "./companents/Profile/Profile Container";
import ProfileContainer from "./companents/Profile/Profile Container2";
import HeaderContainer from "./companents/Header/HeaderContainer";


const App = (props) => {
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
                </Routes>
            </div>
        </div>
    )
}


export default App;
