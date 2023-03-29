export const toggleLike = (query)=>{
    $(query).click((e)=>{
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: $(query).attr('href'),
            success: (data)=>{
                let likesCount = parseInt($(query).attr('data-likes'));
                let color;
                console.log(likesCount);
                if(data.data.deleted == true){
                    likesCount -= 1;
                    color = 'black';
                }else{
                    likesCount += 1;
                    color = 'blue';
                }
                $(query).attr('data-likes' , likesCount);
                $(query).html(`${likesCount} <i class="bi bi-hand-thumbs-up-fill"></i>`);
                $(query).css("color", `${color}`)
            },
            error: (error)=>{
                console.log('error in toggle likes',error.responseText);
            }
        })
    })
}