import * as firebase from "firebase";

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

// firebase module裡面包含非常多的功能模組，例如authtication或datebase,
// 我們可以透過firebase物件下的第二層成員來選擇要使用哪個模組的功能
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
    prompt: 'select_account'
});

const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();



// .push()會回傳一個thenableReference物件，thenableReference可以access到.then()和.catch()
// access到.then()後，可再傳入一個函數。那個函數的第一個參數則是另一個Reference(.ref()回傳的東西)，其指向被push進的資料位置
// 所以可以直接再透過那另一個Reference，再access一次push下去...
// const test = database.ref("expenses").push({
//     test: "test"
// }).then(function(){
//     console.log(arguments);
// });






export {
    firebase,
    googleAuthProvider,
    facebookAuthProvider,
    database as
    default
};

// const expenses = [
//     {
//         description: "expense1",
//         amount: 30,
//         createdAt: 1000,
//         note: "note1"
//     },
//     {
//         description: "expense2",
//         amount: 60,
//         createdAt: 2000,
//         note: "note2"
//     },
//     {
//         description: "expense3",
//         amount: 90,
//         createdAt: 3000,
//         note: "note3"
//     },
// ];

// expenses.forEach((expense) => {
//     database.ref("expenses").push("hi");
// });















// firebase不支援array，所有的list based data會被變成純object結構，如下：
// const firebaseExpenses = {
//     djsdjfkdsf: { // <-此為id
//         description: "hi",
//         amount: 30
//     },
//     dsdrrri: { // <-此為id
//         description: "hi2",
//         amount: 300
//     },
// }



// .on()用來幫資料加上事件監聽器。以本例參數是value來說，事件監聽器就是監聽value change
// database.ref().on("value", (snapshot) => {
//     console.log(`${snapshot.val().name} is ${snapshot.val().job.title} at ${snapshot.val().job.company}`);
// });


// setTimeout(() => {
//     database.ref("job").update({
//         title: "Software developer"
//     });
// }, 5000);


// .once("value")用來讀取「一次」資料
// database.ref()
//     .once("value")
//     .then((snapshot) => {
//         console.log(snapshot.val());
//     }).catch((e) => {
//         console.log("fetch failed", e);
//     })

// .ref()接受一個參數，用於定位道你要實際操作的資料位置，若不傳進參數則預設是root位置
// .set()則可以接受"任何"資料，並將該資料存進ref()定位到的位置
// 資料可以是物件、布林值、字串、數字...等
// .set()也可以接受第二個參數作為callback, 該callback參數同樣會被傳進error message
// 但基本上推薦使用.set().then().catch()來追蹤
// database.ref().set({
//     name: "John",
//     age: 26,
//     stressLevel: 6,
//     job: {
//         title: "Software developer",
//         company: "Google"
//     },
//     location: {
//         city: "Taoyuan",
//         country: "Taiwan"
//     }
// }).then(() => {
//     console.log("succeed write");
// }).catch((e) => {
//     console.log(e);
// });


// .update()的參數「必須」要是一個object
// 所以.update()只能用在根目錄上
// database.ref("job").update({ title: "teacher" }).then(() => {
//     console.log("update succeed");
// }).catch((e) => {
//     console.log("update failed", e);
// });


// database.ref("isSingle").remove().then(() => {
//     console.log("remove succeed");
// }).catch((e) => {
//     console.log(e);
// });