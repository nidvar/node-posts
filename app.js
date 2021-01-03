const express = require('express');
const mongoose = require('mongoose');
const app = express();
const POST = require('./models/posts')
const dbURI = `mongodb+srv://nidvar:shell1234@nodebasic.fn9di.mongodb.net/posts?retryWrites=true&w=majority`
const the_port = process.env.PORT || 3000
mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology:true}).then(a=>{
    console.log('connected to mongo')
    app.listen(the_port, ()=>console.log('=================='))
}).catch(e=>console.log(e))

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs');

//****************************************************************** */

app.post('/posts', (req, res)=>{
    const x = new POST({
        title: req.body.title,
        message: req.body.message
    })
    x.save().then(a=>{
        console.log(a)
        res.redirect('/posts')
    }).catch(e=>console.log(e))
})

//****************************************************************** */

app.delete('/singlepost/:id',(req, res)=>{
    POST.findByIdAndDelete(req.params.id).then(a=>{
        res.json({redirect:'/posts'})
    }).catch(e=>console.log(e))
})

//****************************************************************** */

app.get('/',(req, res)=>{
    res.render('index', {title: 'Home'})
})

app.get('/posts', (req, res)=>{
    POST.find().then(a=>{
        res.render('posts', {title: 'Posts', data: a})
    }).catch(e=>console.log(e))
})

app.get('/singlepost/:the_thing_we_need', (req, res)=>{
    console.log(req.params.the_thing_we_need)

    POST.findById(req.params.the_thing_we_need).then(a=>{
        console.log(a)
        res.render('singlepost',{title:'Single Blog', data:a})
    }).catch(e=>console.log(e))

})

app.get('/create', (req, res)=>{
    res.render('create',{title: 'Create'})
})

//****************************************************************** */