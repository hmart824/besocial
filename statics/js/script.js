{
    //display post dates
    let postDate = $('.date');
    postDate.each(function(){
        let date = new Date(this.innerText);
        let opts = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }
        let modifiedDate = date.toLocaleString('default' , opts);
        this.innerHTML = modifiedDate;
    })


    //display comment dates
    let commentDate = $('.comment-date');
    commentDate.each(function(){
        let date = new Date(this.innerText);
        let opts = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }
        let modifiedDate = date.toLocaleString('default' , opts);
        this.innerHTML = modifiedDate;
    })

    //toggle user friends
    $('.menu-bar').click(()=>{
        $('#user-friends').toggle();
    })
    
    
}