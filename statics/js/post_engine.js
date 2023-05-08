
class PostEngine{
    // constructor(containerId, postData ,defaultAvtar){
    //     this.containerId = $(`#${containerId}`);
    //     this.postData = postData;
    //     this.defaultAvatar = defaultAvtar;

    //     // this.socket = io.connect('http://3.6.92.159:5000');
        

    //     if (this.postData){
    //         this.connectionHandler();
    //     }

    // }
    handleConnection(){
        this.socket = io.connect('http://localhost:5000');
        this.socket.on('connect', function(){
            console.log('post connection established using sockets...!');
        });
    }
    handleData(containerId, postData ,defaultAvtar){
        console.log('binaya');
            this.socket.emit('new_post' , {
                postData,
                defaultAvtar,
                postroom: 'besocial_post'
            });
    
            this.socket.on('received_post' , function(data){
                console.log('new post ' , data);
            })
    }
}