
    export const createComment = (postId)=>{
        // console.log(postId)
        let newCommentForm = $(`#new-comment-form-${postId}`);
        newCommentForm.submit((e)=>{
            e.preventDefault();
            $.ajax({
                type:'post',
                url: newCommentForm.prop('action'),
                data: newCommentForm.serialize(),
                success: (data)=>{
                    // console.log(data);
                    let newComment = newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    destroyComment($(' .delete-comment-button', newComment))
                    new Noty({
                        theme: 'relax',
                        text: 'Commented',
                        type: 'success',
                        layout: 'topCenter',
                        timeout: 1500
                    }).show();
                },
                error: (error)=>{
                    console.log(error.responseText);
                }

            });
            $(`#new-comment-form-${postId} input:first-child`).val('');
        });

    }
    const newCommentDom = (comment)=>{
        let date = new Date(comment.updatedAt);
        let opts = {
                month: 'short',
                day: 'numeric',
                year: 'numeric' ,
                hour: 'numeric',
                minute: 'numeric'
        }
        let modifiedDate = date.toLocaleString('default' , opts);
        return $(`<li id="comment-${comment._id}" class="comment-li">
                    <div class="comment">
                            <a class="delete-comment-button" href="/comments/destroy/${comment._id}"><i class="bi bi-x-circle"></i></a>
                            ${comment.content }
                        <p>
                            <small>
                                ${modifiedDate}
                            </small>
                            <small>
                                ${comment.user.name}
                            </small>
                        </p>
                    </div>
                </li>`)
    }

    export const destroyComment = (query)=>{
        $(query).click((e)=>{
            e.preventDefault();
            $.ajax({
                type:'get',
                url: $(query).prop('href'),
                success: (data)=>{
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: 'Comment Deleted',
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
    const addingDeleteToComments = ()=>{
        let lists = $('.comment-li');
        Array.from(lists).forEach((li)=>{
            let deleteCommentButton = $(' .delete-comment-button' , li);
            destroyComment(deleteCommentButton)
        })
    }

    addingDeleteToComments();

    

    
