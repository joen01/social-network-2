import React from "react";
import styles from "./users.module.css";
import axios from "axios";
import userPhoto from '../../img/userPhoto.webp'
import {setCurrentPageAC} from "../../Redux/Users-reducer";

class Users extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(respons => {
                this.props.setUsers(respons.data.items)
            })
    }

    render() {
        let pageCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let pages = [];
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i)
        }


        return <div>
            <div>
                {
                    pages.map(p => <div key={p.id}>
                        <span className = {this.props.currentPage === p && styles.selectedPage}
                        onClick={() => {this.props.setCurrentPage(p)}}> {p} </span>
                    </div>)

                }
            </div>
            {
                this.props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.photos}/>
                    </div>
                    <div>
                        {u.followed ?
                            <button onClick={() => {
                                this.props.follow(u.id)
                            }}> Follow </button>
                            : <button onClick={() => {
                                this.props.unfollow(u.id)
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

}

export default Users
