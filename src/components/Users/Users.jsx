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
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


let Users = (props) => {

    return (
        <div>
            <Paginator totalItemsCount={props.totalUsersCount}
                       pageSize={props.pageSize}
                       currentPage={props.currentPage}
                       onPageChanged={props.onPageChanged}/>
            <div>
                {
                    props.users.map(u => (<User key={u.id}
                                                user={u}
                                                followingInProgress={props.followingInProgress}
                                                unfollowThunk={props.unfollowThunk}
                                                followThunk={props.followThunk}
                        />  ))
                }
            </div>
        </div>
    );
}


export default Users;
