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

    //         "pw" : "0000",
    //         "name": "강다형",
    //         "image": "https://ca.slack-edge.com/T043597JK8V-U05U1DV7VSR-1d2e0efedf7c-512",
    //         "mbti": "ESFJ"
    //     },
    //     {
    //         "pw" : "0000",
    //         "name": "최연식",
    //         "image": "https://ca.slack-edge.com/T043597JK8V-U060662BZ40-37c2900a60af-512",
    //         "mbti": "INFJ"
    //     },
    //     {
    //         "pw" : "0000",
    //         "name": "하정현",
    //         "image": "https://ca.slack-edge.com/T043597JK8V-U05UUEXD2TA-927f34d8476a-512",
    //         "mbti": "INTP"
    //     },
    //     {
    //         "pw" : "0000",
    //         "name": "김민수",
    //         "image": "https://ca.slack-edge.com/T043597JK8V-U05UX2V43J6-gcc499207a54-512",
    //         "mbti": "ENTP"
    //     },
    //     {
    //         "pw" : "0000",
    //     "name" : "정창일",
    //     "image" : "https://ca.slack-edge.com/T043597JK8V-U05UNF134SW-8a3d973918eb-512",
    //     "mbti" : "INFJ"
    //     }
    //     ]
    // }
    // await setDoc(doc(db, "user", "user_data"), data);
});


// const addButton = document.getElementById("profile-add-button");
// const removeButton = document.getElementById("profile-remove-button");
const profileContainer = document.getElementById("profile-container");
const hello = document.getElementById("login-user");

// let userDoc = await getDoc(doc(db, 'user'));
let userDoc = await getDoc(doc(db, 'user', "user_data"));
let user_data = userDoc.data()["user_data"];
// let post_data = blogData["user_data"];
// console.log(user_data);
// console.log(user_data.length);

let user_index = "none";

const currentUrl = window.location.href;
const urlParts = currentUrl.split('?');
// let blog_index = "none"
urlParts.forEach(element => {
    if(element.indexOf("user-index:") > -1 ) {
        user_index = element.substring(11,  element.length);
        console.log(user_index);
    }
    // if(element.indexOf("blog-index:") > -1 ) {
    //     blog_index = element.substring(11,  element.length); 
    //     console.log(blog_index);
    // }
});
if(user_index == "none"){
    $("#logout-button").css("display", "none"); 
    $("#login-button").css("display", "block"); 
    // $("#login-button").style.display = 'block';
    // $("#logout-button").style.display = 'none';
    // user_data[user_index].name;
    hello.textContent = "";
}
else {
    $("#logout-button").css("display", "block");
    $("#login-button").css("display", "none");  
    hello.textContent = user_data[user_index].name + "님 안녕하세요.";
}



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
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // 이름 입력 필드
    let nameLabel = document.createElement("label");
    nameLabel.textContent = "이름 : ";
    let nameField = document.createElement("input");
    nameField.type = "text";
    modalContent.appendChild(nameLabel);
    modalContent.appendChild(nameField);

    // 비밀번호 입력 필드
    let pwLabel = document.createElement("label");
    pwLabel.textContent = "비밀번호 : ";
    let pwField = document.createElement("input");
    pwField.type = "text";
    modalContent.appendChild(pwLabel);
    modalContent.appendChild(pwField);

    // mbti 입력 필드
    let mbtiLabel = document.createElement("label");
    mbtiLabel.textContent = "MBTI : ";
    let mbtiField = document.createElement("input");
    mbtiField.type = "text";
    modalContent.appendChild(mbtiLabel);
    modalContent.appendChild(mbtiField);

    // image 입력 필드
    let imgLabel = document.createElement("label");
    imgLabel.textContent = "IMAGE URL : ";
    const imgField = document.createElement("input");
    imgField.type = "text";
    modalContent.appendChild(imgLabel);
    modalContent.appendChild(imgField);

    // // 자기소개 입력 필드
    // let prLabel = document.createElement("label");
    // prLabel.textContent = "소개글 : ";
    // let prField = document.createElement("input");
    // prField.type = "text";
    // modalContent.appendChild(prLabel);
    // modalContent.appendChild(prField);

    let modalbutton = document.createElement("div");
    modalbutton.classList.add("modal-button");
    modalContent.appendChild(modalbutton);

    let addButtonModal = document.createElement("button");
    addButtonModal.textContent = "등록하기";
    // "등록하기" 버튼을 클릭할 때 프로필을 생성하고 팝업 창을 닫음

    addButtonModal.addEventListener("click", () => {
        // const profileName = inputField.value;
        let name = nameField.value;
        let pw = pwField.value;
        let mbti = mbtiField.value;
        let imgurl = imgField.value;
        // const pr = prField.value;

        if (!name) {
            alert("이름을 입력해주세요.")
        }
        else if (!pw) {
            alert("비밀번호를 입력해주세요.")
        }
        else {
            let data = {
                name: name,
                pw: pw,
                mbti: mbti,
                image: imgurl
            }

            if (data.mbti.length < 4) {
                data.mbti = "CUTE";
            }

            if (data.image.length < 1) {
                data.image = "imgteam.png";
            }



            async function SetDBUserData() {
                let userDoc = await getDoc(doc(db, 'user', "user_data"));
                let user_data = userDoc.data()["user_data"];

                //중복검사
                let duplication = false;
                user_data.forEach(element => {
                    if (element.name == data.name) {
                        duplication = true;
                        return false;
                    }
                });

                if (duplication) {
                    alert("중복된 이름이 있습니다.")
                }
                else {
                    user_index = user_data.length.toString();
                    user_data[user_index] = data;
                    let setdata = {
                        user_data
                    }
                    await setDoc(doc(db, "user", "user_data"), setdata);

                    // AddProfileCard(data);
                    // window.location.href = 'index.html?user-index:' + user_index;
                    window.location.reload();
                }

            }
            SetDBUserData(data);


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


$("#profile-remove-button").click(async function () {
    // removeButton.addEventListener("click", () => {
    console.log("remove");
    // const profileCards = profileContainer.querySelectorAll(".profile-card");
    // if (profileCards.length > 0) {
    //     profileContainer.removeChild(profileCards[profileCards.length - 1]);
    //     profileCounter--;
    // }

    // 모달 팝업 창을 생성
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // 이름 입력 필드
    let nameLabel = document.createElement("label");
    nameLabel.textContent = "이름 : ";
    let nameField = document.createElement("input");
    nameField.type = "text";
    modalContent.appendChild(nameLabel);
    modalContent.appendChild(nameField);

    // 비밀번호 입력 필드
    let pwLabel = document.createElement("label");
    pwLabel.textContent = "비밀번호 : ";
    let pwField = document.createElement("input");
    pwField.type = "text";
    modalContent.appendChild(pwLabel);
    modalContent.appendChild(pwField);

    let modalbutton = document.createElement("div");
    modalbutton.classList.add("modal-button");
    modalContent.appendChild(modalbutton);

    let addButtonModal = document.createElement("button");
    addButtonModal.textContent = "삭제하기";
    // "등록하기" 버튼을 클릭할 때 프로필을 생성하고 팝업 창을 닫음

    addButtonModal.addEventListener("click", () => {
        let name = nameField.value;
        let pw = pwField.value;

        if (!name) {
            alert("이름을 입력해주세요.");
        }
        else if (!pw) {
            alert("비밀번호를 입력해주세요.");
        }
        else {
            async function SetDBUserData() {
                let userDoc = await getDoc(doc(db, 'user', "user_data"));
                let user_data = userDoc.data()["user_data"];

                let removeIndex = -1;
                let index = -1;
                user_data.forEach(element => {
                    index++;
                    if (element.name == name) {
                        if (element.pw == pw) {
                            removeIndex = index;
                        }
                    }
                });

                if (removeIndex > -1) {
                    if (removeIndex < 5) {
                        alert("기존 팀원은 삭제 할 수 없습니다.");
                    }
                    else {
                        user_data.splice(removeIndex, 1);

                        let setdata = {
                            user_data
                        }
                        await setDoc(doc(db, "user", "user_data"), setdata);
                        if(user_index == removeIndex) {
                            user_index = "none";
                            window.location.href = 'index.html';
                        }
                        else {
                            window.location.href = 'index.html?user-index:' + user_index;
                        }
                    }
                }
                else {
                    alert("이름과 비밀번호가 맞지 않습니다.");
                }
            }
            SetDBUserData();

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


$("#login-button").click(async function () {
    // removeButton.addEventListener("click", () => {
    console.log("remove");
    // const profileCards = profileContainer.querySelectorAll(".profile-card");
    // if (profileCards.length > 0) {
    //     profileContainer.removeChild(profileCards[profileCards.length - 1]);
    //     profileCounter--;
    // }

    // 모달 팝업 창을 생성
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // 이름 입력 필드
    let nameLabel = document.createElement("label");
    nameLabel.textContent = "이름 : ";
    let nameField = document.createElement("input");
    nameField.type = "text";
    modalContent.appendChild(nameLabel);
    modalContent.appendChild(nameField);

    // 비밀번호 입력 필드
    let pwLabel = document.createElement("label");
    pwLabel.textContent = "비밀번호 : ";
    let pwField = document.createElement("input");
    pwField.type = "text";
    modalContent.appendChild(pwLabel);
    modalContent.appendChild(pwField);

    let modalbutton = document.createElement("div");
    modalbutton.classList.add("modal-button");
    modalContent.appendChild(modalbutton);

    let addButtonModal = document.createElement("button");
    addButtonModal.textContent = "로그인";
    // "등록하기" 버튼을 클릭할 때 프로필을 생성하고 팝업 창을 닫음

    addButtonModal.addEventListener("click", () => {
        let name = nameField.value;
        let pw = pwField.value;

        if (!name) {
            alert("이름을 입력해주세요.");
        }
        else if (!pw) {
            alert("비밀번호를 입력해주세요.");
        }
        else {
            async function SetDBUserData() {
                let userDoc = await getDoc(doc(db, 'user', "user_data"));
                let user_data = userDoc.data()["user_data"];

                let loginindex = -1;
                let index = -1;
                user_data.forEach(element => {
                    index++;
                    if (element.name == name) {
                        if (element.pw == pw) {
                            loginindex = index;
                        }
                    }
                });

                if (loginindex > -1) {
                    user_index = loginindex
                    window.location.href = 'index.html?user-index:' + user_index;
                }
                else {
                    alert("이름과 비밀번호가 맞지 않습니다.");
                }
            }
            SetDBUserData();

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

$("#logout-button").click(async function () {
    user_index = "none";
    window.location.href = 'index.html';
});

function AddProfileCard(data) {
    const profileCard = document.createElement("div");
    profileCard.classList.add("profile-card");
    profileCard.textContent = name;

    const blog_index = profileCounter;
    profileCard.addEventListener("click", () => {
        window.location.href = "blog.html?user-index:" + user_index + "?blog-index:" + blog_index;
    });

    profileCard.innerHTML = `<div class="card" style="width: 200px;">
     <img src=${data.image} height="200" width="200" class="card-img-top" alt="...">
     <div class="card-body">
      <h1 class="card-title">${data.name}</h1>
      <p>MBTI : ${data.mbti}</p>
      <p>안녕하세요.</p> 
      </div> </div>`;


    profileContainer.appendChild(profileCard);
    profileCounter++;
}