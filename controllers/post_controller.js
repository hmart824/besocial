module.exports.posts = (req , res)=>{
    return res.render('post' , {
        title: 'posts'
    })
}