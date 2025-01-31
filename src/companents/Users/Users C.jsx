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
import userPhoto from '../../img/userPhoto.webp';
import {NavLink} from "react-router-dom";
import axios from "axios";
import {followUsersApi} from "../../Api/API";


let Users = (props) => {
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div className={styles.userBlok}>
                {
                    pages.map(p => (
                        <span
                            key={p}
                            className={props.currentPage === p ? styles.selectedPage : ''}
                            onClick={() => {
                                props.onPageChanged(p);
                            }}
                        >
                            {p}
                        </span>
                    ))
                }
            </div>
            <div>
                {
                    props.users.map(u => (
                        <div key={u.id}>
                            <span>
                                <div>
                                    <NavLink to={"/Profile/" + u.id}>
                                        <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                             className={styles.photos} alt="User"/>
                                    </NavLink>
                                </div>
                                <div>
                                    {u.followed
                                        ? <button disabled={props.followingInProgress.some(id=> id === u.id)}
                                                  onClick={() => {
                                            props.toggleIsDisabled(true,u.id)
                                            followUsersApi.followUsers(u.id,'delete') .then(data => {
                                                    if (data.resultCode === 0) {
                                                        props.unfollow(u.id)
                                                    }
                                                    props.toggleIsDisabled(false,u.id)
                                                })
                                        }}> Unfollow </button>

                                        : <button disabled={props.followingInProgress.some(id=> id === u.id)}
                                                  onClick={() => {
                                            props.toggleIsDisabled(true,u.id)
                                            followUsersApi.followUsers(u.id,'post') .then(data => {
                                                    if (data.resultCode === 0) {
                                                        props.follow(u.id)
                                                    }
                                                    props.toggleIsDisabled(false,u.id)
                                                })
                                        }}> follow </button>
                                    }
                                </div>
                            </span>
                            <span>
                                <span>
                                    <div>{u.name}</div>
                                    <div>{u.status}</div>
                                </span>
                                <span>
                                    <div>{u.location?.city}</div>
                                    <div>{u.location?.country}</div>
                                </span>
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}


export default Users;

// <div>
//     {u.followed
//         ? <button onClick={() => {
//             axios.delete (`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
//                 withCredentials: true,
//                 headers: {
//                     "API-KEY": "955d0b76-71b7-4ef2-9f9d-ea2df513ccf2"
//                 }
//             })
//                 .then(response => {
//                     if (response.data.resultCode === 0) {
//                         props.unfollow(u.id)
//                     }
//                 })
//         }}> Unfollow </button>
//
//         : <button onClick={() => {
//             axios.post (`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
//                 withCredentials: true,
//                 headers: {
//                     "API-KEY": "955d0b76-71b7-4ef2-9f9d-ea2df513ccf2"
//                 }
//             })
//                 .then(response => {
//                     if (response.data.resultCode === 0) {
//                         props.follow(u.id)
//                     }
//                 })
//         }}> follow </button>
//     }
// </div>