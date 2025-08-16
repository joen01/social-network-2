import loading from "src/img/813.svgz";
import styles from "../../Users/users.module.css"
import React from "react";

let Preloader:React.FC = () => {
    return (
        // <div className={styles.spinner}> </div>
        <img alt="img"
             src={loading} className={styles.loading}/>
    )
}
export default Preloader
