// script.js
const addButton = document.getElementById("add-button");
const removeButton = document.getElementById("remove-button");
const profileContainer = document.getElementById("profile-container");

let profileCounter = 0;
AddProfileCard("강다형", "ESFJ", "https://ca.slack-edge.com/T043597JK8V-U05U1DV7VSR-1d2e0efedf7c-512", "안녕하세요.");
AddProfileCard("최연식", "INFJ", "https://ca.slack-edge.com/T043597JK8V-U060662BZ40-37c2900a60af-512", "안녕하세요.");
AddProfileCard("하정현", "INTP", "https://ca.slack-edge.com/T043597JK8V-U05UUEXD2TA-927f34d8476a-512", "안녕하세요.");
AddProfileCard("김민수", "ENTP", "https://ca.slack-edge.com/T043597JK8V-U05UX2V43J6-gcc499207a54-512", "안녕하세요.");
AddProfileCard("정창일", "INFJ", "https://ca.slack-edge.com/T043597JK8V-U05UNF134SW-8a3d973918eb-512", "안녕하세요.");

addButton.addEventListener("click", () => {
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
            
            AddProfileCard(name, mbti, imgurl, pr);
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


removeButton.addEventListener("click", () => {
    const profileCards = profileContainer.querySelectorAll(".profile-card");
    if (profileCards.length > 0) {
        profileContainer.removeChild(profileCards[profileCards.length - 1]);
        profileCounter--;
    }
});

function AddProfileCard(name, mbti, imgurl, pr) {
    const profileCard = document.createElement("div");
    profileCard.classList.add("profile-card");
    profileCard.textContent = name;

    // profileCard.addEventListener("click", () => {
    //     // window.location.href = 'https://www.naver.com';
    //     window.location.href = 'index.html';
    // });
    
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