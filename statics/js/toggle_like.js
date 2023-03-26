export const toggleLike = (query)=>{
    $(query).click((e)=>{
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: $(query).attr('href'),
            success: (data)=>{
                let likesCount = parseInt($(query).attr('data-likes'));
                console.log(likesCount);
                if(data.data.deleted == true){
                    likesCount -= 1;
                }else{
                    likesCount += 1;
                }
                $(query).attr('data-likes' , likesCount);
                $(query).html(`${likesCount} <i class="bi bi-hand-thumbs-up-fill"></i>`);
            },
            error: (error)=>{
                console.log('error in toggle likes',error.responseText);
            }
        })
    })
}