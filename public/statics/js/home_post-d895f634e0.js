let socket=io.connect("http://localhost:5000");const createPost=t=>{socket.on("connect",(function(){console.log("post connection established using sockets...!")})),socket.emit("join_post_room",{user_email:t,postroom:"besocial_post"});let e=$("#new-post-form");console.log("active"),e.submit((function(o){o.preventDefault(),$.ajax({type:"post",url:e.prop("action"),data:new FormData(this),cache:!1,contentType:!1,processData:!1,success:e=>{let o=newPostDom(e.data.post,e.data.path,t);socket.emit("new_post",{postData:e.data.post,defaultAvtar:e.data.path,postroom:"besocial_post"}),$("#post-list-container>ul").prepend(o),new ToggleLike($(" .toggle-like-button",o)),new PostComments(e.data.post._id),destroyPost($(" .delete-post-button",o)),$(" .comment-btn",o).click((()=>{console.log("clicked"),console.log($(" .post-comment",o)),$(" .post-comments",o).toggle()})),new Noty({theme:"relax",text:"Post published",type:"success",layout:"topCenter",timeout:1500}).show(),$("#new-post-form textarea").val("")},error:t=>{console.log(t.responseText)}}),$("#image").val("")})),socket.on("received_post",(function(e){if(console.log("new post received from home post",e),e.postData.user.email!=t){let o=newPostDom(e.postData,e.defaultAvtar,t);$("#post-list-container>ul").prepend(o),new ToggleLike($(" .toggle-like-button",o)),new PostComments(e.postData._id),$(" .comment-btn",o).click((()=>{console.log("clicked"),console.log($(" .post-comment",o)),$(" .post-comments",o).toggle()}))}})),socket.on("removed_post",(function(t){$(`#post-${t.postId}`).remove()}))},newPostDom=(t,e,o)=>{let s=new Date(t.updatedAt).toLocaleString("default",{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"numeric"});return $(`<li class="post-li" id="post-${t._id}">\n                    <div class="post">\n                        <div class="head">\n                            <div class="profile">\n                                <div class="img">\n                                    <img src="${t.user.avatar?t.user.avatar:e}" alt="${t.user.name}">\n                                </div>\n                                <div class='profile-data'>\n                                    <span>${t.user.name}</span>\n                                    <span class='date'>${s}</span>\n                                </div>\n                            </div>\n                                ${t.user.email===o?`<a class="delete-post-button" href="/posts/destroy/${t._id}"><i class="bi bi-x-circle"></i></a>`:""}\n                        </div>\n                        <div class="content">\n                            ${t.image?`<div class="post-img">\n                                                <img src="${t.image}" alt="${t.user.name}">\n                                             </div>\n                                            `:""}\n                            ${t.content?`<p>${t.content}</p>`:""}\n                        </div>\n                        <div class="foot">\n                            <small>\n                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${t._id}&type=Post" style="color: black ; text-decoration: none ;">\n                                    0 <i class="bi bi-hand-thumbs-up-fill"></i>\n                                </a>\n                            </small>\n                            <small class='comment-btn'><i class="bi bi-chat-fill" style="margin-right: .1rem;"></i>Comments</small>\n                        </div>\n                    </div>\n                        <div class="post-comments">\n                            <form action="/comments/create" method="post" id="new-comment-form-${t._id}">\n                                <input type="text" name="content" placeholder="comment..." class="inp" required>\n                                <input type="hidden" name="post" value="${t._id}">\n                                <input type="submit" value="comment">\n                            </form>\n                            <div class="comment-list-container">\n                            <ul id="post-comments-${t._id}">\n                            </ul>\n                            </div>\n                        </div>\n                </li>`)},destroyPost=t=>{$(t).click((e=>{e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:t=>{socket.emit("remove_post",{postId:t.data.post_id,postroom:"besocial_post"}),$(`#post-${t.data.post_id}`).remove(),new Noty({theme:"relax",text:"Post Deleted",type:"error",layout:"topCenter",timeout:1500}).show()},error:t=>{console.log(t.responseText)}})}))},addingDeleteToPosts=()=>{let t=$(".post-li");Array.from(t).forEach((t=>{$(" .comment-btn",t).click((()=>{console.log("clicked"),console.log($(" .post-comment",t)),$(" .post-comments",t).toggle()}));let e=$(" .delete-post-button",t);destroyPost(e);let o=t.id.split("-")[1];new PostComments(o)}))};addingDeleteToPosts();