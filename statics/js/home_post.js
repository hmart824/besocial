import {createComment , destroyComment} from "./home_comment.js";
{
    //method to submit the form data using AJAX
    const createPost = ()=>{
        let newPostForm = $('#new-post-form');
        newPostForm.submit((e)=>{
            e.preventDefault();
            $.ajax({
                type:'post',
                url: newPostForm.prop('action'),
                data: newPostForm.serialize(),
                success: (data)=>{
                    let newPost = newPostDom(data.data.post);
                    // console.log(data.data.post._id)
                    $('#post-list-container>ul').prepend(newPost);
                    createComment(data.data.post._id)
                    destroyPost($(' .delete-post-button', newPost))
                    new Noty({
                        theme: 'relax',
                        text: 'Post published',
                        type: 'success',
                        layout: 'topCenter',
                        timeout: 1500
                    }).show();
                    $('#new-post-form textarea').val('') 
                },
                error: (error)=>{
                    console.log(error.responseText);
                }
            });
           
        });
    }

    //metod to create a post in DOM
    const newPostDom = (post)=>{
        let date = new Date(post.updatedAt);
        let opts = {
                month: 'short',
                day: 'numeric',
                year: 'numeric' ,
                hour: 'numeric',
                minute: 'numeric'
        }
        let modifiedDate = date.toLocaleString('default' , opts);

      
        return $(`<li class="post-li" id="post-${post._id}">
                    <div class="post">
                        <header>
                            <div class="profile">
                                <div class="img">
                                    <img src="${post.user.avatar ? post.user.avatar : '/img/default_avatar.png'}" alt="${post.user.name}">
                                </div>
                                <div class='profile-data'>
                                    <span>${post.user.name}</span>
                                    <span class='date'>${modifiedDate}</span>
                                </div>
                            </div>
                                <a class="delete-post-button" href="/posts/destroy/${post._id}"><i class="bi bi-x-circle"></i></a>
                        </header>
                        <p>
                            ${post.content}
                        </p>
                    </div>
                        <div class="post-comments">
                            <form action="/comments/create" method="post" id="new-comment-form-${post._id}">
                                <input type="text" name="content" placeholder="comment..." class="inp" required>
                                <input type="hidden" name="post" value="${post._id}">
                                <input type="submit" value="comment">
                            </form>
                            <div class="comment-list-container">
                            <ul id="post-comments-${post._id}">
                            </ul>
                            </div>
                        </div>
                </li>`)
    }
    
    //method to delete post
    const destroyPost = (query)=>{
        // console.log(query)
        $(query).click((e)=>{
            e.preventDefault();
            $.ajax({
                type:'get',
                url: $(query).prop('href'),
                success: (data)=>{
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: 'Post Deleted',
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 1500
                    }).show();
                },
                error: (error)=>{
                    console.log(error.responseText);
                }
            })
        })
    }


    const addingDeleteToPosts = ()=>{
        let lists = $('.post-li');
        Array.from(lists).forEach((li)=>{
            // console.log(li.childNode());
            let deletePostButton = $(' .delete-post-button', li);
            destroyPost(deletePostButton);
            let postId = li.id.split('-')[1];
            createComment(postId);
            // let deleteCommentButton = $(' .delete-comment-button' , li);
            // destroyComment(deleteCommentButton)
        })
    }

    addingDeleteToPosts();
    createPost();
}