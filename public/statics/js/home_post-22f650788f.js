{const e=()=>{let e=$("#new-post-form");e.submit((n=>{n.preventDefault(),$.ajax({type:"post",url:e.prop("action"),data:e.serialize(),success:e=>{let n=t(e.data.post);$("#post-list-container>ul").prepend(n),new ToggleLike($(" .toggle-like-button",n)),new PostComments(e.data.post._id),o($(" .delete-post-button",n)),$(" .comment-btn",n).click((()=>{console.log("clicked"),console.log($(" .post-comment",n)),$(" .post-comments",n).toggle()})),new Noty({theme:"relax",text:"Post published",type:"success",layout:"topCenter",timeout:1500}).show(),$("#new-post-form textarea").val("")},error:e=>{console.log(e.responseText)}})}))},t=e=>{let t=new Date(e.updatedAt).toLocaleString("default",{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"numeric"});return $(`<li class="post-li" id="post-${e._id}">\n                    <div class="post">\n                        <div class="head">\n                            <div class="profile">\n                                <div class="img">\n                                    <img src="${e.user.avatar?e.user.avatar:"/img/default_avatar.png"}" alt="${e.user.name}">\n                                </div>\n                                <div class='profile-data'>\n                                    <span>${e.user.name}</span>\n                                    <span class='date'>${t}</span>\n                                </div>\n                            </div>\n                                <a class="delete-post-button" href="/posts/destroy/${e._id}"><i class="bi bi-x-circle"></i></a>\n                        </div>\n                        <p>\n                            ${e.content}\n                        </p>\n                        <div class="foot">\n                            <small>\n                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${e._id}&type=Post" style="color: black ; text-decoration: none ;">\n                                    0 <i class="bi bi-hand-thumbs-up-fill"></i>\n                                </a>\n                            </small>\n                            <small class='comment-btn'><i class="bi bi-chat-fill" style="margin-right: .1rem;"></i>Comments</small>\n                        </div>\n                    </div>\n                        <div class="post-comments">\n                            <form action="/comments/create" method="post" id="new-comment-form-${e._id}">\n                                <input type="text" name="content" placeholder="comment..." class="inp" required>\n                                <input type="hidden" name="post" value="${e._id}">\n                                <input type="submit" value="comment">\n                            </form>\n                            <div class="comment-list-container">\n                            <ul id="post-comments-${e._id}">\n                            </ul>\n                            </div>\n                        </div>\n                </li>`)},o=e=>{$(e).click((t=>{t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:e=>{$(`#post-${e.data.post_id}`).remove(),new Noty({theme:"relax",text:"Post Deleted",type:"error",layout:"topCenter",timeout:1500}).show()},error:e=>{console.log(e.responseText)}})}))};(()=>{let e=$(".post-li");Array.from(e).forEach((e=>{$(" .comment-btn",e).click((()=>{console.log("clicked"),console.log($(" .post-comment",e)),$(" .post-comments",e).toggle()}));let t=$(" .delete-post-button",e);o(t);let n=e.id.split("-")[1];new PostComments(n)}))})(),e()}