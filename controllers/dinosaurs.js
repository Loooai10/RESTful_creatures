const express = require('express')
const router = express.Router()
const fs = require('fs')


router.get('/', (req,res)=>{
    // pull in JSON data
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    // turn the json data into a JS object
    let dinoData = JSON.parse(dinosaurs);
    
    let nameFilter = req.query.nameFilter
    // if the user searched for something
    if(nameFilter){
    dinoData = dinoData.filter(dino=>{
        return dino.name.tolowerCase()===nameFilter.tolowerCase()
    // console.log(dinoData)
    // }
    })
}
    res.render('dinosaurs/index.ejs', {myDinos: dinoData});
});

router.get('/new', (req,res)=>{
    res.render('dinosaurs/new')
})
router.get('/:idx', (req,res)=>{
    //get dinosaurs
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
    let dinoIndex = parseInt(req.params.idx);
    console.log('This is the req.params object!', req.params)
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]});
});
router.post('/', (req, res)=> {
    console.log('This is the Request Bodu:', req.body)
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);

    dinoData.push(req.body);
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));



    res.redirect("/dinosaurs")
})
// /:idex related to the number of the dinosaur that gonna be deleted
//
router.delete('/:idx', (req,res) => {
    console.log('This is my Req params object', req.params)
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
    dinoData.splice(req.params.idx, 1)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
    res.redirect('/dinosaurs')
})
router.get('/edit/:idx', (req,res)=>{
    // grab dino data
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);

    res.render('dinosaurs/edit', {dino: dinoData[req.params.idx], dinoId: req.params.idx});
    //Display edit page
    res.render('dinosaurs/edit', {dino: dinoData[req.params.idx], dinoId: req.params.idx})
})
router.put('/:dinoId', (req,res)=>{
    //grab all dino data VVV
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    // Parse Json data into JS Object VV
    let dinoData = JSON.parse(dinosaurs);
    // update our dinosaurs with form data
    dinoData[req.params.dinoId].name = req.body.name;
    dinoData[req.params.dinoId].type = req.body.type;
    //update our Json file with new data
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
   // redirect to home page
    res.redirect('/dinosaurs');

})

module.exports = router;