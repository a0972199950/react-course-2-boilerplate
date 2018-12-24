import React from "react";
// BrowserRouter用來裝入所有的routes，而Route則用來實際宣告route`
// Switch則是用來創建404 page
import {Router, Route, Switch} from "react-router-dom";
// history是react-router-dom內建用來獲取history物件的套件，但內建的話我們無法將它取出後自由使用在別處
// 因此要改成透過手動方式建立變數候傳入<Router />，這樣才可將之export後使用在別處
import createHistory from "history/createBrowserHistory";

import LoginPage from "../components/LoginPage";
import DashboardPage from "../components/DashboardPage";
import NotFoundPage from "../components/NotFoundPage";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>         
            {/* BrowserRouter預設只接受一個子組件，所以所有的routes都要放在一個div裡 */}
            {/* 而藉由把那個div改成Switch(或是直接把BrowserRouter改成Switch)，則可以讓react一個個檢查Route是否match的同時，當它檢查到後就立即停止動作 */}
            {/* 這樣就可以藉由在最後面放一個always match的route來製作404 page */}
            <Switch>
                {/*path的值預設為使用"開頭為"來配對，因此若要改成"完全符合"，則必須多傳入一個exact參數並設成true*/}
                <PublicRoute path="/" component={LoginPage} exact />
                <PrivateRoute path="/dashboard" component={DashboardPage} />
                {/* path是選填的，若沒定義path則所有頁面都會match */}
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
        
    </Router>
);


export default AppRouter;