// import React from 'react';
// import {Navigate} from "react-router-dom";
// import {connect} from "react-redux";
// import {AppStateType} from "src/Redux/Redux-store";
//
// type MapStatePropsType = ReturnType<typeof mapStateToProps>
// const mapStateToProps = (state:AppStateType) => ({
//     isAuth: state.auth.isAuth
// })
//
// export function WithNavigate<WCP>(WrappedComponent:React.ComponentType<WCP>) {
//     let NavigateComponent:React.FC<MapStatePropsType & WCP> = (props) => {
//         if (!props.isAuth) return <Navigate to="/Login"/>;
//         return <WrappedComponent {...props as WCP}/>
//     }
//
// return connect(mapStateToProps)(NavigateComponent)
// }
import React from 'react';
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "src/Redux/Redux-store";

const mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
} as MapStatePropsType);

type MapStatePropsType = {
    isAuth: boolean
};
type MapDispatchPropsType = {};

export function WithNavigate<WCP extends object>(WrappedComponent: React.ComponentType<WCP>) {
    const NavigateComponent: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Navigate to="/Login"/>;
        return <WrappedComponent {...restProps as WCP} />;
    };

    return connect<MapStatePropsType, MapDispatchPropsType, WCP, AppStateType>(
        mapStateToPropsForRedirect, {})(NavigateComponent)
        ;
}
