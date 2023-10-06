
const postContainer = document.getElementById("post-container");
const addPostButton = document.getElementById("blog-test-button");

addPostButton.addEventListener("click", () => {
    console.log("13")
    CreatePostBox();
});

function CreatePostBox() {
    const box = document.createElement("div");

    const postbox = document.createElement("blog-post-box");
    box.append(postbox);
//     postbox.innerHTML = `<div class="blog-post-box">
//     <div class="post">
//         <h2 class="post-title">첫 번째 글 제목</h2>
//         <p class="post-date">2023년 10월 5일</p>
//         <p class="post-text">첫 번째 글 내용...</p>
//     </div>
//     <div class="comment-button"> 💬 10</div>
//     <div class="comments">
//         <div class="comment">
//             <p><span class="comment-name">이름 </span> <span class="comment-text">내용</span> </p>
//         </div>
//         <div class="comment">
//             <p><span class="comment-name">이름 </span> <span class="comment-text">내용</span> </p>
//         </div>
//         <!-- 다른 댓글들도 유사한 방식으로 추가할 수 있습니다. -->
//         <div class="comment-input">
//             <input class="comment-input-name" type="text" placeholder="이름">
//             <input class="comment-input-text" type="text" placeholder="내용">
//             <button class="comment-input-button">입력</button>
//         </div>
//     </div>
// </div>
// `;
const title = "제목";
const date = "날짜";
const text = "내용";

const content = document.createElement("post");
content.innerHTML = `<h2> ${title}</h2>
<p>${date}</p>
<p>${text}</p>`;
postbox.append(content);


const commentbtn = document.createElement("comment-button");
commentbtn.textContent = "💬 10";
postbox.append(commentbtn);


const comments = document.createElement("comments");
const comment = document.createElement("comment");
comment.innerHTML = `<p><span class="comment-name">이름 </span> <span class="comment-text">내용</span> </p>`;
comments.append(comment);
postbox.append(comments);

const input = document.createElement("comment-input");
input.innerHTML = `<input class="comment-input-name" type="text" placeholder="이름">
<input class="comment-input-text" type="text" placeholder="내용">
<button class="comment-input-button">입력</button>`;
postbox.append(input);



    postContainer.appendChild(box);
}