import React from "react";
import styles from "./users.module.css";
import axios from "axios";
import userPhoto from '../../img/userPhoto.webp'


let Users = (props) => {

    let getUsers = () => {
        if (props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users")
                .then(respons => {
                    props.setUsers(respons.data.items)
                })

        }
    }
    return <div>
        <button onClick={getUsers}>get Users</button>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.photos}/>
                    </div>
                    <div>
                        {u.followed ?
                            <button onClick={() => {
                                props.follow(u.id)
                            }}> Follow </button>
                            : <button onClick={() => {
                                props.unfollow(u.id)
                            }}> Unfollow </button>}
                    </div>

                </span>

                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.city"}</div>
                        <div>{"u.location.country"}</div>
                    </span>
                </span>

            </div>)
        }
    </div>
}
export default Users
