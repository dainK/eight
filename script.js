// script.js
const addButton = document.getElementById("add-button");
const removeButton = document.getElementById("remove-button");
const profileContainer = document.getElementById("profile-container");

let profileCounter = 0;

addButton.addEventListener("click", () => {
    // 모달 팝업 창을 생성
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // 이름 입력 필드
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "이름: ";
    const nameField = document.createElement("input");
    nameField.type = "text";
    
    // 나이 입력 필드
    const ageLabel = document.createElement("label");
    ageLabel.textContent = "나이: ";
    const ageField = document.createElement("input");
    ageField.type = "number";

    const addButtonModal = document.createElement("button");
    addButtonModal.textContent = "등록하기";

    // "등록하기" 버튼을 클릭할 때 프로필을 생성하고 팝업 창을 닫음
    addButtonModal.addEventListener("click", () => {
        // const profileName = inputField.value;
        const name = nameField.value;
        const age = ageField.value;
        if (name&&age) {
            const profileCard = document.createElement("div");
            profileCard.classList.add("profile-card");
            profileCard.textContent = name;
            profileCard.innerHTML = `<p>이름: ${name}</p><p>나이: ${age}세</p>`;

            profileContainer.appendChild(profileCard);
            profileCounter++;
        }

        // 팝업 창을 닫음
        document.body.removeChild(modal);
    });

    modalContent.appendChild(nameLabel);
    modalContent.appendChild(nameField);
    modalContent.appendChild(ageLabel);
    modalContent.appendChild(ageField);
    modalContent.appendChild(addButtonModal);
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
