// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";



// Firebase 구성 정보 설정
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBvkQMypGDR1HHLoU_c4g-JEqIfb0NMw60",
    authDomain: "sparta-eight.firebaseapp.com",
    projectId: "sparta-eight",
    storageBucket: "sparta-eight.appspot.com",
    messagingSenderId: "1083363522950",
    appId: "1:1083363522950:web:0a435c6660a5f680839407",
    measurementId: "G-XLFBG42T1M"
  };

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

$("#test-button").click(async function () {
    console.log("test");
    window.location.href = 'blog.html?0';

    // let post_data = [
    //     {
    //         "post": [
    //             {
    //                 "content": {
    //                     "tilte": "제목",
    //                     "date": "날짜",
    //                     "text": "내용"
    //                 },
    //                 "comments": [
    //                     {
    //                         "name": "이름",
    //                         "text": "내용"
    //                     },
    //                     {
    //                         "name": "이름",
    //                         "text": "내용"
    //                     }
    //                 ]
    //             },
    //             {
    //                 "content": {
    //                     "tilte": "제목",
    //                     "date": "날짜",
    //                     "text": "내용"
    //                 },
    //                 "comments": [
    //                     {
    //                         "name": "이름",
    //                         "text": "내용"
    //                     },
    //                     {
    //                         "name": "이름",
    //                         "text": "내용"
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         "post": [
    //             {
    //                 "content": {
    //                     "tilte": "제목",
    //                     "date": "날짜",
    //                     "text": "내용"
    //                 },
    //                 "comments": [
    //                     {
    //                         "name": "이름",
    //                         "text": "내용"
    //                     },
    //                     {
    //                         "name": "이름",
    //                         "text": "내용"
    //                     }
    //                 ]
    //             },
    //             {
    //                 "content": {
    //                     "tilte": "제목",
    //                     "date": "날짜",
    //                     "text": "내용"
    //                 },
    //                 "comments": [
    //                     {
    //                         "name": "이름",
    //                         "text": "내용"
    //                     },
    //                     {
    //                         "name": "이름",
    //                         "text": "내용"
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // ];

    // let data = {post_data};
    // await setDoc(doc(db, "blog", "0"),data);

    // let memberDoc  = await getDoc(doc(db,'blog',"0"));
    // console.log(memberDoc.data());

    // let user_data = {
    //     "user_id" : "0",
    //     "user_name" : "강다형",
    //     "user_image" : "imgteam.png"
    // }
    // let data = {user_data};
    // await setDoc(doc(db, "user", "0"),data);
})
