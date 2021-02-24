let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Book Model
let Contact = require('../models/businessContacts');

/* GET Route for the Book List page - READ OPeration */
router.get('/', (req, res, next) => {
    Contact.find((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(bookList);

            res.render('business/list', {title: 'Business contacts', ContactList: contactList})            
        }
    });
});

/*Adding Add page - Create operation */
router.get('/add', (req,res,next)=>{
    res.render('business/add', {title: 'Add Contact'}) 
})
/*Post for Add page - Create Operation */
router.post('/add', (req,res,next)=>{
    let newContact = Contact({
        "name":req.body.name,
        "number":req.body.number,
        "email":req.body.email
    })
    Contact.create(newContact,(err,Contact)=>{
        if(err){
            console.log(err);
            res.end(err)
        }
        else{
            res.redirect('/businessContacts')
        }
    })
})
/*Adding Edit page - Update operation */

router.get('/edit/:id', (req,res,next)=>{
    let id = req.params.id;

    Contact.findById(id,(err, contactToEdit)=>{
        if(err){
            console.log(err);
            res.end(err)
        }
        else{
            res.render('business/edit',{title:'Edit Contact',contact: contactToEdit})

        }
    })
})
/*Post for Edit page - Update Operation */

router.post('/edit/:id', (req,res,next)=>{
    let id = req.params.id;

    let updatedcontact = Contact({
        "_id":id,
        "name":req.body.name,
        "number":req.body.number,
        "email":req.body.email 
    })
    Contact.updateOne({_id:id},updatedcontact,(err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/businessContacts')
        }
    })
})

/* Deltet page - Delete Operation*/

router.get('/delete/:id',(req, res, next) => {
    let id = req.params.id;

    Contact.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the book list
             res.redirect('/businessContacts');
        }
    });
});

module.exports = router;