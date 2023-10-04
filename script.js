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

    const inputLabel = document.createElement("label");
    inputLabel.textContent = "프로필 이름: ";
    const inputField = document.createElement("input");
    inputField.type = "text";

    const addButtonModal = document.createElement("button");
    addButtonModal.textContent = "등록하기";

    // "등록하기" 버튼을 클릭할 때 프로필을 생성하고 팝업 창을 닫음
    addButtonModal.addEventListener("click", () => {
        const profileName = inputField.value;
        if (profileName) {
            const profileCard = document.createElement("div");
            profileCard.classList.add("profile-card");
            profileCard.textContent = profileName;
            profileContainer.appendChild(profileCard);
            profileCounter++;
        }

        // 팝업 창을 닫음
        document.body.removeChild(modal);
    });

    modalContent.appendChild(inputLabel);
    modalContent.appendChild(inputField);
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