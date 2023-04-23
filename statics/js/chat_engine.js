class ChatEngine{
    constructor(chatBoxId, userEmail , user){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.user = user;

        this.socket = io.connect('http://3.6.92.159:5000');

        if (this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');
        });

        self.socket.emit('join_room' , {
            user_email: self.userEmail,
            user: self.user,
            chatroom: 'besocial'
        });

        self.socket.on('user_joined' , function(data){
            if(data.user_email != self.userEmail){
                let list = $('#chat-messages-list');
                list.append(`<li class="joined">
                                <span>
                                    ${data.user} has joined!!!!!
                                </span>
                            </li>`);
            }
            $('#chat-messages-list').scrollTop($('#chat-messages-list').prop("scrollHeight"));
        });
        let newForm = $('#chat-message-input-container');
        newForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: newForm.prop('action'),
                data: newForm.serialize(),
                success: (data)=>{
                    if(data.data.posted){
                        let msg = $('#chat-message-input').val();

                        if(msg != ''){
                            self.socket.emit('send_message' , {
                                message: msg,
                                user_email: self.userEmail,
                                user: self.user,
                                chatroom: 'besocial'
                            })
                        }
                        $('#chat-message-input').val('');
                        new Noty({
                            theme: 'relax',
                            text: 'chat posted',
                            type: 'success',
                            layout: 'topCenter',
                            timeout: 1500
                        }).show();
                    }

                },
                error: (error)=>{
                    console.log(error.responseText);
                }
            })
        });

        self.socket.on('receive_message' , function(data){

            let newMessage = $('<li>');
            let messageType = 'other-message';
            if(data.user_email === self.userEmail ){
                messageType = 'self-message';
            };

            newMessage.append($('<span>' , {
                'html': data.message
            }));
            let date = new Date();
            let opts = {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            }
            let modifiedDate = date.toLocaleString('default' , opts);
            let tag = `
                <div class="tag">
                    <small>${data.user}</small>
                    <small>${modifiedDate}</small>
                </div>
            `
            newMessage.append(tag);

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
            $('#chat-messages-list').scrollTop($('#chat-messages-list').prop("scrollHeight"));
        })

    }
}