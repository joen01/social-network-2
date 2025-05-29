import React, {useState} from "react";
import styles from "../../common/Paginator/paginator.module.css";
import classNames from "classnames";


let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 20}) => {

    let pageCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pageCount / portionSize)
    let [numberPortion, setNumberPortion] = useState(1)
    let leftBorderPortion = (numberPortion - 1) * portionSize + 1
    let rightBorderPortion = numberPortion * portionSize

    return <div className={styles.pagination}>
        <button disabled={numberPortion <= 1}
                onClick={() => {
                    setNumberPortion(numberPortion - 1)
                }}> PREV
        </button>

        {pages
            .filter(p => p >= leftBorderPortion && p <= rightBorderPortion)
            .map(p => (
                <span
                    key={p}
                    className={classNames(styles.pageCount, currentPage === p ? styles.selectedPage : '')}
                    onClick={() => {
                        onPageChanged(p);
                    }}
                >
                            {p}
                        </span>
            ))
        }
        <button disabled={numberPortion >= portionCount}
                onClick={() => {
                    setNumberPortion(numberPortion + 1)
                }}> NEXT
        </button>

    </div>
}


export default Paginator;

//import React, {useState} from "react";
// import styles from "../../common/Paginator/paginator.module.css";
//
//
// let Paginator = (props) => {
//     const {totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10} = props
//     let pageCount = Math.ceil(totalItemsCount / pageSize);
//     let pages = [];
//     for (let i = 1; i <= pageCount; i++) {
//         pages.push(i);
//     }
//     let portionCount = Math.ceil(pageCount / portionSize);
//     let [portionNumber, setPortionNumber] = useState(1);
//     let LeftPortionPagesCount = (portionNumber - 1) * portionSize + 1;
//     let rightPortionPagesCount = portionNumber * portionSize;
//
//
//     return <div className={styles.paginator}>
//         {
//             portionNumber > 1 &&
//             <button onClick={() => {
//                 setPortionNumber(portionNumber - 1)
//             }}> Prev </button>
//         }
//         {pages
//             .filter(p => p >= LeftPortionPagesCount && p <= rightPortionPagesCount)
//             .map(p => (
//                 <span
//                     key={p}
//                     className={`${styles.pageCount} ${currentPage === p ? styles.selectedPage : ''}`}
//                     onClick={() => {
//                         onPageChanged(p);
//                     }}
//                 >
//                             {p}
//                         </span>
//             ))
//         }
//
//         {portionCount > portionNumber &&
//             <button onClick={() => {
//                 setPortionNumber(portionNumber + 1)
//             }}> Next </button>}
//
//     </div>
// }
//
//
// export default Paginator;