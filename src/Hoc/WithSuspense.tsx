import React, {Suspense} from 'react';
import Preloader from "../components/common/Preloader/Preloader";


function WithSuspense<WCP extends object>(WrappedComponent:React.ComponentType<WCP>)  {
    const SuspenseComponent:React.FC<WCP> = (props) => {
        return <Suspense fallback={<Preloader/>}>
            <WrappedComponent{...props}/>
        </Suspense>
    }
    return SuspenseComponent
}

export default WithSuspense

// const WithSuspense = <WCP extends object>(WrappedComponent:React.ComponentType<WCP>):React.FC<WCP> =>  {
//     return (props: WCP) => (
//         <Suspense fallback={<Preloader/>}>
//             <WrappedComponent{...props}/>
//         </Suspense>
//     )
// }
//
// export default WithSuspense