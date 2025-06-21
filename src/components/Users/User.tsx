// import React from "react";
// import styles from "./users.module.css";
// import userPhoto from '../../img/userPhoto.webp'
//
// let Users = (props) => {
//
//     let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
//
//     let pages = [];
//     for (let i = 1; i <= pageCount; i++) {
//         pages.push(i)
//     }
//
//     return <div>
//         <div>
//             {
//                 pages.map(p => <span key={p.id} className={props.currentPage === p && styles.selectedPage}
//                                      onClick={() => {
//                                          props.onPageChanged(p)
//                                      }}> {p} </span>
//                 )
//             }
//         </div>
//
//         <div>
//             {
//                 props.users.map(u => <div key={u.id}>
//                 <span>
//                     <div>
//                         <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.photos}/>
//                     </div>
//                     <div>
//                         {u.followed ? <button onClick={() => {props.follow(u.id)
//                             }}> Follow </button>
//                             : <button onClick={() => {
//                                 props.unfollow(u.id)
//                             }}> Unfollow </button>}
//                     </div>
//
//                 </span>
//
//                     <span>
//                     <span>
//                         <div>{u.name}</div>
//                         <div>{u.status}</div>
//                     </span>
//                     <span>
//                         <div>{"u.location.city"}</div>
//                         <div>{"u.location.country"}</div>
//                     </span>
//             </span>
//
//                 </div>)
//             }
//         </div>
//     </div>
// }
//
// export default Users

import React from "react";
import styles from "./users.module.css";
import userPhoto from 'src/img/userPhoto.webp';
import {NavLink} from "react-router-dom";
import {UserType} from "src/Types/Types";

type PropsType = {
    user:UserType
    followingInProgress:Array<number> // array user id
    unfollowThunk: (userId:number, rest:any) => void
    followThunk: (userId:number, rest:any) => void

}
let User:React.FC<PropsType> = ({user,followingInProgress,unfollowThunk,followThunk}) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={"/Profile/" + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto}
                             className={styles.photos} alt="User"/>
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      unfollowThunk(user.id, 'delete')
                                  }}> Unfollow </button>

                        : <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      followThunk(user.id, 'post')
                                  }}> follow </button>
                    }
                                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{user.location?.city}</div>
                    <div>{user.location?.country}</div>
                </span>
            </span>
        </div>
    );
}


export default User;
