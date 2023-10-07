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

let postCounter = 0;

// 현재 URL 가져오기
const currentUrl = window.location.href;
// URL 파싱
const urlParts = currentUrl.split('?');
let user_index = "none";
let blog_index = "none"
urlParts.forEach(element => {
    if (element.indexOf("user-index:") > -1) {
        user_index = element.substring(11, element.length);
        console.log(user_index);
    }
    if (element.indexOf("blog-index:") > -1) {
        blog_index = element.substring(11, element.length);
        console.log(blog_index);
    }
});

let userDoc = await getDoc(doc(db, 'user', "user_data"));
let user_data = userDoc.data()["user_data"][blog_index];
console.log(user_data);
UserProfile(user_data);

let blogDoc = await getDoc(doc(db, 'blog', blog_index));
let blogData = blogDoc.data();
if (!!blogData) {
    let post_data = blogData["post_data"];
    console.log(post_data);

    post_data.forEach(element => {
        console.log(element);
        CreatePostBox(element);
    });
}
else {

}
if (user_index == blog_index) {
    $("#blog-posting-button").css("display", "block");
}
else {
    $("#blog-posting-button").css("display", "none");
}

$("#back-button").click(async function () {
    window.location.href = 'index.html?user-index:' + user_index;
});

function UserProfile(data) {
    let headbox = document.createElement("div");
    headbox.classList.add("blog-head");

    let img = document.createElement("div");
    img.classList.add("blog-image");
    img.innerHTML = `<img src=${data.image} class="blog-image" alt="이미지 설명">`;
    headbox.appendChild(img);

    let title = document.createElement("div");
    title.innerHTML = `<p class="blog-name" >${data.name}님의 다이어리 </p>`;
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


    const commentbox = document.createElement("div");
    commentbox.classList.add("comment-box");

    const commentcontainer = document.createElement("div");
    commentcontainer.classList.add("comment-container");

    comment_data.forEach(element => {
        let comment_name = element["name"];
        let comment_text = element["text"];

        const comment = document.createElement("div");
        comment.classList.add("comment");
        comment.innerHTML = `<p> <span class = "comment-name">💬${comment_name}</span>   "${comment_text}"</p>`;
        commentcontainer.appendChild(comment);

    });
    commentbox.appendChild(commentcontainer);

    const input = document.createElement("div");
    input.classList.add("comment-input");
    const input_comment = document.createElement("input");
    input_comment.type = text;
    input_comment.style.width = "310px";
    input_comment.placeholder = "덧글작성하기";
    input.appendChild(input_comment);
    const input_button = document.createElement("button");
    input_button.classList.add("comment-button");
    input_button.textContent = "💬";
    const post_index = postCounter;
    input_button.addEventListener("click", () => {
        if (user_index == "none") {
            alert("로그인이 필요합니다.")
        }
        else {
            if (!!input_comment.value) {
                //TODO:
                SetComment(post_index,input_comment.value);
            }
            else {
                alert("내용을 입력해주세요.")
            }
        }
    });
    input.appendChild(input_button);


    commentbox.appendChild(input);



    postbox.appendChild(commentbox);
    postContainer.appendChild(postbox);
    postCounter++;
}

async function SetComment(post_index,text) {
    let userDoc = await getDoc(doc(db, 'user', "user_data"));
    let user_data = userDoc.data()["user_data"][user_index];

    let blogDoc = await getDoc(doc(db, 'blog', blog_index));
    let post_data = blogData["post_data"];
    // console.log(post_data);

    let newcomment = {
        name : user_data.name,
        text : text
    }
    post_data[post_index]["comments"][post_data[post_index]["comments"].length] = newcomment;

    let data = { post_data };
    await setDoc(doc(db, "blog", blog_index), data);
    window.location.reload();
}


$("#blog-posting-button").click(async function () {
    // 모달 팝업 창을 생성
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // 제목 입력 필드
    let titleLabel = document.createElement("label");
    titleLabel.textContent = "제목 : ";
    let titleField = document.createElement("input");
    titleField.type = "text";
    modalContent.appendChild(titleLabel);
    modalContent.appendChild(titleField);

    // 내용 입력 필드
    let textLabel = document.createElement("label");
    textLabel.textContent = "내용 : ";
    let textField = document.createElement("input");
    textField.type = "text";
    modalContent.appendChild(textLabel);
    modalContent.appendChild(textField);

    let modalbutton = document.createElement("div");
    modalbutton.classList.add("modal-button");
    modalContent.appendChild(modalbutton);

    let addButtonModal = document.createElement("button");
    addButtonModal.textContent = "등록하기";
    // "등록하기" 버튼을 클릭할 때 프로필을 생성하고 팝업 창을 닫음

    addButtonModal.addEventListener("click", () => {
        let title = titleField.value;
        let text = textField.value;

        let currentDate = new Date();
        
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
        let day = currentDate.getDate();
        
        let date = `${year}-${month}-${day}`;

        if (!title) {
            alert("제목을 입력해주세요.");
        }
        else if (!text) {
            alert("내용을 입력해주세요.");
        }
        else {
            async function SetDBPostData() {
                let newdata = {
                    "content": {
                        "title": title,
                        "date": date,
                        "text": text
                    },
                    "comments": [
                    ]
                }
                let blogDoc = await getDoc(doc(db, 'blog', blog_index));
                let blogData = blogDoc.data();
                if (!!blogData) {
                    let post_data = blogData["post_data"];
                    post_data[post_data.length] = newdata;
                    let data = { post_data };
                    await setDoc(doc(db, "blog", blog_index), data);
                }
                else {
                    let data = {post_data:[newdata]};
                    await setDoc(doc(db, "blog", blog_index),data);
                }
                window.location.reload();
            }
            SetDBPostData();

            // 팝업 창을 닫음
            document.body.removeChild(modal);
        }

    });
    modalbutton.appendChild(addButtonModal);

    modal.appendChild(modalContent);

    // 모달을 body에 추가
    document.body.appendChild(modal);

    // 모달을 닫기 위한 클릭 이벤트 추가
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    });
});