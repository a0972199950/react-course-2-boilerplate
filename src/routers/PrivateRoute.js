import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../components/Header";


export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    // <Route />的component={ComponentName}預設會自動把<Route />自己的props完整傳進<ComponentName />
    // 但若為了某些原因(例如想加進條件判斷)而不能直接使用component={ComponentName}，必須要改成component={() => {...; return( <Component /> )}}時，
    // 則必須手動把props傳下去，傳遞方式如：component={(props) => {...; return( <ComponentName {...props}/> )}}
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>            
        ) : (
            /* <Redirect />就是個單純用來執行跳轉的component */
            <Redirect to="/" />
        )
    )} />
)


const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});


export default connect(mapStateToProps)(PrivateRoute);