import React from "react";
import ReactDOM from "react-dom";
// 之所以把history import進AppRouter再把他抓進app，是因為history可能是一個陣列，
// 而<Router />會把該陣列的最後一個值存成state，並監聽該state的變化來決定要render哪個component
// 因此若在不同地方使用不同的history，則就無法把正確的值push進正確的陣列了
import AppRouter, { history } from "./routers/AppRouter";
// Provider是react-redux庫提供的一個虛擬的最上層組件
// 他用來包住所有自創的組件，並且可以傳入redux的store(store = {store})
// 一旦傳入後，裡面的子組件就可以在需要store的時候使用connect()來連接redux store
import { Provider } from "react-redux";
import { login, logout } from "./actions/auth";

// normalize.css是一長串某人寫好的，用來初始化所有瀏覽器預設樣式設定的css
import "normalize.css/normalize.css";
// 下方的import並非js code，而是scss code，
// 初始設定下webpack看不懂scss，他會認為這不是js而拋出error，
// 但藉由安裝node-scss, scss-loader並設定至webpack.config.js後，
// webpack就知道要用scss-loader把scss轉換成css後加進HTML的<style>裡
import "./styles/styles.scss";
import 'react-dates/lib/css/_datepicker.css';
import configureStore from "./store/ConfigureStore";
import { firebase } from "./firebase/firebase";

import LoadingPage from "./components/LoadingPage";


const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);


let hasRendered = false;
const renderApp = () => {
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById("app"));
        hasRendered = true;
    };
};


ReactDOM.render(<LoadingPage />, document.getElementById("app"));


firebase.auth().onAuthStateChanged((user) => {
    if(user){
        console.log("log in");

        store.dispatch(login(user.uid));

        renderApp();

        if(history.location.pathname === "/"){
            history.push("/dashboard");
        };

    } else{
        console.log("log out");

        store.dispatch(logout());

        renderApp();

        history.push("/");
    };
});





