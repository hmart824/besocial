class ToggleLike {

    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }

    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
            $.ajax({
                type: 'post',
                url: $(self).attr('href'),
                success: (data)=>{
                    let likesCount = parseInt($(self).attr('data-likes'));
                    let color;
                    console.log(likesCount);
                    if(data.data.deleted == true){
                        likesCount -= 1;
                        color = 'black';
                    }else{
                        likesCount += 1;
                        color = 'blue';
                    }
                    $(self).attr('data-likes' , likesCount);
                    $(self).html(`${likesCount} <i class="bi bi-hand-thumbs-up-fill"></i>`);
                    $(self).css("color", `${color}`)
                },
                error: (error)=>{
                    console.log('error in toggle likes',error.responseText);
                }
            })
        })
    }
}
