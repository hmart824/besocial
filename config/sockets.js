
module.exports.mainSocket = function(socketServer){
    let io = require('socket.io')(socketServer , {
        cors: {
            origin: '*'
        }
    });

    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        //chat room connections
        socket.on('join_room' , function(data){
            console.log('joining request received' , data)

            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined' , data);
        });

        socket.on('send_message' , function(data){
            io.in(data.chatroom).emit('receive_message' , data);
        })


        //post connections
        socket.on('join_post_room' , function(data){
            console.log('joining request received for post' , data)

            socket.join(data.postroom);
        });
        socket.on('new_post' , function(data){
            io.in(data.postroom).emit('received_post' , data);
        });
        socket.on('remove_post' , function(data){
            io.in(data.postroom).emit('removed_post' , data);
        });

    });

}