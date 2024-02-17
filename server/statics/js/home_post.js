
let socket = io.connect('http://localhost:5000');
// let socket = io.connect('http://3.6.92.159:5000');
    //method to submit the form data using AJAX
    const createPost = (userEmail)=>{

        socket.on('connect', function(){
            console.log('post connection established using sockets...!');
        });
        socket.emit('join_post_room' , {
            user_email: userEmail,
            postroom: 'besocial_post'
        });


        let newPostForm = $('#new-post-form');
        console.log('active')
        newPostForm.submit(function(e){
            e.preventDefault();
            if($('#input').val().trim() === '' && $('#image').val() === ''){
                new Noty({
                    theme: 'relax',
                    text: 'Invalid Inputs',
                    type: 'error',
                    layout: 'topCenter',
                    timeout: 1500
                }).show();
                return;
            }
                $.ajax({
                    type:'post',
                    url: newPostForm.prop('action'),
                    data: new FormData(this),
                    cache : false,
                    contentType: false,
                    processData: false,
                    success: (data)=>{
                        let newPost = newPostDom(data.data.post , data.data.path , userEmail);
                        // console.log(data.data.path)
                        socket.emit('new_post' , {
                            postData: data.data.post,
                            defaultAvtar: data.data.path,
                            postroom: 'besocial_post'
                        });
                
                        
                        $('#post-list-container>ul').prepend(newPost);
                        new ToggleLike($(' .toggle-like-button' , newPost));
                        new PostComments(data.data.post._id);
                        destroyPost($(' .delete-post-button', newPost));
    
                        //adding toggle comment button
                        $(' .comment-btn' , newPost).click(()=>{
                            console.log('clicked')
                            console.log($(' .post-comment' , newPost));
                            $(' .post-comments' , newPost).toggle();
                        });
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
                $('#image').val('');
            
           
        });
        socket.on('received_post' , function(data){
            console.log('new post received from home post' , data);
             if(data.postData.user.email != userEmail){
                let newPost = newPostDom(data.postData , data.defaultAvtar , userEmail);
                $('#post-list-container>ul').prepend(newPost);
                new ToggleLike($(' .toggle-like-button' , newPost));
                new PostComments(data.postData._id);
                 //adding toggle comment button
                 $(' .comment-btn' , newPost).click(()=>{
                    console.log('clicked')
                    console.log($(' .post-comment' , newPost));
                    $(' .post-comments' , newPost).toggle();
                });
            }
        })
        socket.on('removed_post' , function(data){
            $(`#post-${data.postId}`).remove();
        })
    }

    //metod to create a post in DOM
    const newPostDom = (post , path , currentUserEmail)=>{
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
                        <div class="head">
                            <div class="profile">
                                <div class="img">
                                    <img src="${post.user.avatar ? post.user.avatar : path}" alt="${post.user.name}">
                                </div>
                                <div class='profile-data'>
                                    <span>${post.user.name}</span>
                                    <span class='date'>${modifiedDate}</span>
                                </div>
                            </div>
                                ${post.user.email === currentUserEmail ? 
                                `<a class="delete-post-button" href="/posts/destroy/${post._id}"><i class="bi bi-x-circle"></i></a>` : ''}
                        </div>
                        <div class="content">
                            ${post.image ? `<div class="post-img">
                                                <img src="${post.image}" alt="${post.user.name}">
                                             </div>
                                            ` : ''}
                            ${post.content ? `<p>${post.content}</p>` :''}
                        </div>
                        <div class="foot">
                            <small>
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post" style="color: black ; text-decoration: none ;">
                                    0 <i class="bi bi-hand-thumbs-up-fill"></i>
                                </a>
                            </small>
                            <small class='comment-btn'><i class="bi bi-chat-fill" style="margin-right: .1rem;"></i>Comments</small>
                        </div>
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
                    socket.emit('remove_post' , {
                        postId: data.data.post_id,
                        postroom: 'besocial_post'
                    });
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
            $(' .comment-btn' , li).click(()=>{
                console.log('clicked')
                console.log($(' .post-comment' , li));
                $(' .post-comments' , li).toggle();
            });
            let deletePostButton = $(' .delete-post-button', li);
            destroyPost(deletePostButton);
            let postId = li.id.split('-')[1];
            new PostComments(postId);
        })
    }


    addingDeleteToPosts();
    
