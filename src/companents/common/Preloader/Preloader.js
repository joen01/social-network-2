import React from "react";
import loading from "../../../img/loading.svg";
import styles from "../../Users/users.module.css";


let Preloader = () => {
    return  <img src={loading} className={styles.loading}/>
}


export default Preloader
