const User = require('../models/user');
const Chat = require('../models/chat');
module.exports.chatRoom = async (req , res)=>{

   try{
        let chats = await Chat.find({}).populate('sender' , ['email' , 'name']);
        return res.render('chat_box' , {
            title: 'Chat Room',
            chats: chats
        })
   }catch(err){
    console.log('errom in displaying chats' , err);
    return;
   }
};

module.exports.chat = async (req , res)=>{
    try{
        let user = await User.findById(req.user._id);
        if(user){
            await Chat.create({
                sender: user.id,
                message: req.body.message
            });
            return res.status(200).json({
                message: ' chat posted successfully',
                data: {
                    posted: true
                }
            });
        }
        return res.redirect('back');
    }catch(err){
        console.log('error in sending chat' , err);
        return;
    }
}