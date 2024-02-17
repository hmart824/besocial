const toggleFriendship = ()=>{
    let btn = $('#btn a');
    btn.click((e)=>{
        e.preventDefault();
        $.ajax({
            type:'get',
            url: btn.prop('href'),
            success: (data)=>{
                let added = data.data.added;
                if(added){
                    new Noty({
                        theme: 'relax',
                        text: 'Added to Friends',
                        type: 'success',
                        layout: 'topCenter',
                        timeout: 1500
                    }).show();
                    btn.text('Remove Friend');
                }else{
                    new Noty({
                        theme: 'relax',
                        text: 'Friend Removed',
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 1500
                    }).show();
                    btn.text('Add to friend');
                }
            },
            error: (error)=>{
                console.log(error.responseText);
            }
        })
    })
}
toggleFriendship();