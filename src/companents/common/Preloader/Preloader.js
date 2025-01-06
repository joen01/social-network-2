import React from "react";
import loanding from "../../../img/loanding.svg";
import styles from "../../Users/users.module.css";


let Preloader = (props) => {
    return  <img src={loanding} className={styles.loading}/>
}


export default Preloader
