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

//////////////////////////////////////////////////////////////////////////////

const blogHeadContainer = document.getElementById("blog-head-container");
const postContainer = document.getElementById("post-container");


// 현재 URL 가져오기
const currentUrl = window.location.href;
// URL 파싱
const urlParts = currentUrl.split('?');
let user_index = "none";
let blog_index = "none"
urlParts.forEach(element => {
    if(element.indexOf("user-index:") > -1 ) {
        user_index = element.substring(11,  element.length);
        console.log(user_index);
    }
    if(element.indexOf("blog-index:") > -1 ) {
        blog_index = element.substring(11,  element.length); 
        console.log(blog_index);
    }
});

let userDoc = await getDoc(doc(db, 'user', "user_data"));
let user_data = userDoc.data()["user_data"][blog_index];
console.log(user_data);
UserProfile(user_data);

let blogDoc = await getDoc(doc(db, 'blog', blog_index));
let blogData = blogDoc.data();
if( !!blogData) {
    let post_data = blogData["post_data"];
    console.log(post_data);
    
     post_data.forEach(element => {
          console.log(element);
         CreatePostBox(element);
     });
}
else {

}
if(user_index == blog_index){
    $("#blog-posting-button").css("display", "block");
}
else {
    $("#blog-posting-button").css("display", "none"); 
}

$("#blog-posting-button").click(async function () {
});

$("#back-button").click(async function () {
    window.location.href = 'index.html?user-index:' + user_index;
});

function UserProfile(data) {
    let headbox = document.createElement("div");
    headbox.classList.add("blog-head");

    let img = document.createElement("div");
    img.classList.add("blog-image");
    img.innerHTML =`<img src=${data.image} class="blog-image" alt="이미지 설명">`;
    headbox.appendChild(img);
    
    let title = document.createElement("div");
    title.innerHTML =`<p class="blog-name" >${data.name}님의 다이어리 </p>`;
    headbox.appendChild(title);

    blogHeadContainer.appendChild(headbox);
}

function CreatePostBox(data) {
    const postbox = document.createElement("div");
    postbox.classList.add("blog-post-box");

    let content_data = data["content"];
    let comment_data = data["comments"];

    let title = content_data["title"];
    let date = content_data["date"];
    let text = content_data["text"];


    const content = document.createElement("div");
    content.classList.add("post");
    

    const content_inner = document.createElement("div");
    content_inner.classList.add("post-content");

    content_inner.innerHTML = `
    <h2> ${title}</h2>
    <p>${date}</p>
    <p>${text}</p>`;
    content.appendChild(content_inner);
    postbox.appendChild(content);


    // const commentbtn = document.createElement("div");
    // commentbtn.classList.add("comment-button");
    // commentbtn.textContent = "💬 덧글보기";
    // postbox.appendChild(commentbtn);


    const commentbox = document.createElement("div");
    commentbox.classList.add("comment-box");

    const commentcontainer = document.createElement("div");
    commentcontainer.classList.add("comment-container");

    // const comments = document.createElement("div");
    // comments.classList.add("comments");

    comment_data.forEach(element => {
        let comment_name = element["name"];
        let comment_text = element["text"];

        const comment = document.createElement("div");
        comment.classList.add("comment");
        comment.innerHTML = `<p> <span class = "comment-name">💬${comment_name}</span>   "${comment_text}"</p>`;
        commentcontainer.appendChild(comment);

    });
    commentbox.appendChild(commentcontainer);
    
    // for(let i = 0; i<4; i++) {
    //     const comment = document.createElement("div");
    //     comment.classList.add("comment");
    //     comment.innerHTML = `<p>테스트이름 테스트 내용</p>`;
    //     commentcontainer.appendChild(comment);
    // }
    
    const input = document.createElement("div");
    input.classList.add("comment-input");
//     input.innerHTML = `
// <input class="comment-input-text" type="text" width = "200" placeholder="덧글작성하기">
// <button class="comment-input-button">💬</button>`;
const input_comment = document.createElement("input"); 
input_comment.type = text;
input_comment.style.width = "310px";
// input_comment.width = "100%";
input_comment.placeholder = "덧글작성하기";
input.appendChild(input_comment);
const input_button = document.createElement("button"); 
input_button.classList.add("comment-button");
input_button.textContent = "💬";
input_button.addEventListener("click", () => {
    if(user_index == "none") {
        alert("로그인이 필요합니다.")
    }
    else {
        if(!!input_comment.value) {
            //TODO:
        }
        else {
            alert("내용을 입력해주세요.")
        }
    }
});
input.appendChild(input_button);

// input.classList.add("comment-input");

commentbox.appendChild(input);

    // `<div class="blog-post-box">
    // <div class="post">
    //     <h2 class="post-title">첫 번째 글 제목</h2>
    //     <p class="post-date">2023년 10월 5일</p>
    //     <p class="post-text">첫 번째 글 내용...</p>
    // </div>
    // <div class="comment-button"> 💬 10</div>
    // <div class="comments">
    //     <div class="comment">
    //         <p><span class="comment-name">이름 </span> <span class="comment-text">내용</span> </p>
    //     </div>
    //     <div class="comment">
    //         <p><span class="comment-name">이름 </span> <span class="comment-text">내용</span> </p>
    //     </div>
    //     <!-- 다른 댓글들도 유사한 방식으로 추가할 수 있습니다. -->
    //     <div class="comment-input">
    //         <input class="comment-input-name" type="text" placeholder="이름">
    //         <input class="comment-input-text" type="text" placeholder="내용">
    //         <button class="comment-input-button">입력</button>
    //     </div>
    // </div>
    // </div>`

    // commentbtn.addEventListener("click", () => {
    //     commentbox.style.display = commentbox.style.display === 'block' ? 'none' : 'block';
    // });
    // commentbox.style.display = 'none';

    postbox.appendChild(commentbox);
    postContainer.appendChild(postbox);
}
