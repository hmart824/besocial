class PostComments{
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#new-comment-form-${postId}`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.destroyComment($(this));
        });
        $(' .comment-toggle-like-button', this.postContainer).each(function(){
            self.destroyComment($(this));
        });
    }

    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;
            $.ajax({
                type:'post',
                url: $(self).prop('action'),
                data: $(self).serialize(),
                success: (data)=>{
                    // console.log(data);
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.destroyComment($(' .delete-comment-button', newComment));
                    new ToggleLike($(' .toggle-like-button' , newComment));
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
            // $(`#new-comment-form-${postId} input:first-child`).val('');
        });
    }

    newCommentDom = (comment)=>{
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
                            <small style="margin-right: .2rem;">
                                ${comment.user.name}
                            </small>
                            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment" style="color: black ; text-decoration: none ;"">
                                0 <i class="bi bi-hand-thumbs-up-fill"></i>
                            </a>
                        </p>
                    </div>
                </li>`)
    }

    destroyComment = (query)=>{
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
}  
    
    
