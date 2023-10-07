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

$("#test-button").click(async function () {
    console.log("test");
    // window.location.href = 'blog.html?0';

    //         let    post_data = [
    //             {
    //                 "content": {
    //                     "title": "제목",
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
    //                     "title": "제목",
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
    //         ];
    // let data = {post_data};
    // await setDoc(doc(db, "blog", "3"),data);

    // let memberDoc  = await getDoc(doc(db,'blog',"0"));
    // console.log(memberDoc.data());

    // let data = {
    //     user_data: [{

    //         "id": "0",
    //         "name": "강다형",
    //         "image": "https://ca.slack-edge.com/T043597JK8V-U05U1DV7VSR-1d2e0efedf7c-512",
    //         "mbti": "ESFJ"
    //     },
    //     {
    //         "id": "1",
    //         "name": "최연식",
    //         "image": "https://ca.slack-edge.com/T043597JK8V-U060662BZ40-37c2900a60af-512",
    //         "mbti": "INFJ"
    //     },
    //     {
    //         "id": "2",
    //         "name": "하정현",
    //         "image": "https://ca.slack-edge.com/T043597JK8V-U05UUEXD2TA-927f34d8476a-512",
    //         "mbti": "INTP"
    //     },
    //     {
    //         "id": "3",
    //         "name": "김민수",
    //         "image": "https://ca.slack-edge.com/T043597JK8V-U05UX2V43J6-gcc499207a54-512",
    //         "mbti": "ENTP"
    //     },
    //     {
    //         "id": "3",
    //         "name": "김민수",
    //         "image": "https://ca.slack-edge.com/T043597JK8V-U05UX2V43J6-gcc499207a54-512",
    //         "mbti": "ENTP"
    //     }
    //     ]
    // }
    // await setDoc(doc(db, "user", "user_data"), data);
});


// const addButton = document.getElementById("profile-add-button");
// const removeButton = document.getElementById("profile-remove-button");
const profileContainer = document.getElementById("profile-container");

// let userDoc = await getDoc(doc(db, 'user'));
let userDoc = await getDoc(doc(db, 'user', "user_data"));
let user_data = userDoc.data()["user_data"];
// let post_data = blogData["user_data"];
// console.log(user_data);
// console.log(user_data.length);

let profileCounter = 0;
user_data.forEach(element => {
      console.log(element);
//      CreatePostBox(element);
AddProfileCard(element);
 });

//  async function 

//////////////////////////////////////////////////////////////////////////////


$("#profile-add-button").click(async function () {
    console.log("add");
    // 모달 팝업 창을 생성
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // 이름 입력 필드
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "이름 : ";
    const nameField = document.createElement("input");
    nameField.type = "text";

    // mbti 입력 필드
    const mbtiLabel = document.createElement("label");
    mbtiLabel.textContent = "MBTI : ";
    const mbtiField = document.createElement("input");
    mbtiField.type = "text";

    // image 입력 필드
    const imgLabel = document.createElement("label");
    imgLabel.textContent = "IMAGE URL : ";
    const imgField = document.createElement("input");
    imgField.type = "text";

    // 자기소개 입력 필드
    const prLabel = document.createElement("label");
    prLabel.textContent = "소개글 : ";
    const prField = document.createElement("input");
    prField.type = "text";

    const modalbutton = document.createElement("div");
    modalbutton.classList.add("modal-button");

    const addButtonModal = document.createElement("button");
    addButtonModal.textContent = "등록하기";

    // "등록하기" 버튼을 클릭할 때 프로필을 생성하고 팝업 창을 닫음
    addButtonModal.addEventListener("click", () => {
        // const profileName = inputField.value;
        const name = nameField.value;
        const mbti = mbtiField.value;
        const imgurl = imgField.value;
        const pr = prField.value;

        if (!name) {
            alert("이름을 입력해주세요.")
        }
        else {

            // AddProfileCard(name, mbti, imgurl, pr);
            // 팝업 창을 닫음
            document.body.removeChild(modal);
        }

    });

    modalContent.appendChild(nameLabel);
    modalContent.appendChild(nameField);
    modalContent.appendChild(mbtiLabel);
    modalContent.appendChild(mbtiField);
    modalContent.appendChild(imgLabel);
    modalContent.appendChild(imgField);
    modalContent.appendChild(prLabel);
    modalContent.appendChild(prField);
    modalbutton.appendChild(addButtonModal);
    modalContent.appendChild(modalbutton);
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


$("#profile-remove-button").click(async function () {
// removeButton.addEventListener("click", () => {
    console.log("remove");
    const profileCards = profileContainer.querySelectorAll(".profile-card");
    if (profileCards.length > 0) {
        profileContainer.removeChild(profileCards[profileCards.length - 1]);
        profileCounter--;
    }
});

function AddProfileCard(data) {
    let name = data["name"];
    let mbti = data["mbti"];
    let imgurl = data["image"];
    let pr = "안녕하세요."
    console.log(name);
    console.log(mbti);
    console.log(imgurl);
    let id = data["id"];

    const profileCard = document.createElement("div");
    profileCard.classList.add("profile-card");
    profileCard.textContent = name;

    profileCard.addEventListener("click", () => {
        window.location.href = 'blog.html?' + id;
    });

    if (mbti.length < 4) {
        mbti = "CUTE";
    }

    if (pr.length < 1) {
        pr = "안녕하세요.";
    }

    if (imgurl.length < 1) {
        imgurl = "imgteam.png";
    }

    profileCard.innerHTML = `<div class="card" style="width: 200px;">
     <img src=${imgurl} height="200" width="200" class="card-img-top" alt="...">
     <div class="card-body">
      <h1 class="card-title">${name}</h1>
      <p>MBTI : ${mbti}</p>
      <p>${pr}</p> 
      </div> </div>`;


    profileContainer.appendChild(profileCard);
    profileCounter++;
}