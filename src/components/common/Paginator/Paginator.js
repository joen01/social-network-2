import React from "react";
import styles from "../../common/Paginator/paginator.module.css";


let Paginator = ({totalUsersCount,pageSize,currentPage,onPageChanged}) => {

    let pageCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return <div className={styles.userBlok}>
            {
                pages.map(p => (
                    <span
                        key={p}
                        className={currentPage === p ? styles.selectedPage : ''}
                        onClick={() => {
                            onPageChanged(p);
                        }}
                    >
                            {p}
                        </span>
                ))
            }
        </div>
}


export default Paginator;
