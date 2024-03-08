const jwt = require("jsonwebtoken");
const User = require("../models/user.models");
const Post =require("../models/post.models")


async function userProfile(req,res){
    res.render('profile')
}

async function homePage(req, res) {
    let post;
    if (req?.user) {
        if (req.search) {
            post = req.search
        } else {
            post = await Post.find().populate({
                path: 'user',
                select: 'username-_id'
            });
        }

    }
    console.log(post)
    res.render('home', { user: req?.user,  posts:post, search:undefined })

}

async function userSignup(req, res) {
    if (req.method === "POST") {
        
        const data = req.body;
        const user = await User.create({
            name: data.name,
            username: data.username,
            email: data.email,
            contact: data.contact,
            password: data.password
        });
        if (user) {
            res.redirect('/login');
        } else {

            res.redirect('/signup');
        }
    } else {
        res.render('signup');
    }
}

async function userLogin(req, res) {
    if (req.method === "POST") {
        // we will get user
        const data = req.body;
        const user = await User.findOne({ username: data.username });

        if (user) {
            

            if (user.password === data.password) {
               
                const token = jwt.sign({ _id: user._id }, "Nodejs_secret_key");
                console.log('token')
                res.cookie('token', token);

                // now user is loggin we redirect to home page
                
                res.redirect('/');
                console.log('user logged in')

            } else {
                
                res.render('login', { errorMessage: "Wrong password" });
            }
        } else {
            
            res.render('signup',{ errorMessage: "register first" })
        }
    } else {
        res.render('login',{ errorMessage: undefined });
    }
}

async function addpost(req, res){
    
    if (req.method === "POST") {
        const data = req.body;
        console.log(req.user)
        const post = await Post.create({
            name:data.name,
            title:data.title,
            content:data.content,
            user:req.user,
        });

        res.redirect('/')
    }
    else{
        res.render('post')
    }

}

async function searchBar(req, res) {
    let post;
    const search = req.query.query;

    if (req?.user && search) {
        post = await Post.find({ $text: { $search: search } }).populate({
            path: 'user',
            select: 'username-_id'
        });
        req.search = post;
        homePage(req, res);
    }else{
        res.
        redirect('/');
    }

    // res.render('home', { user: req?.user,  posts:post , search:search})
}


async function userLogout(req,res) {
    console.log("clear")
    res.clearCookie('token');
    res.redirect('/');
}



module.exports = { userProfile,userSignup, userLogin,homePage,addpost,userLogout,searchBar}
