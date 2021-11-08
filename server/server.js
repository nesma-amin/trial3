const express = require('express')
const app = express();
const cors = require('cors')
const dotenv= require('dotenv')
const multer= require('multer')

dotenv.config();

const dbService=require('./dbService')

//for mail sending/////////////////////////////////////////////////
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'companymanager2022@gmail.com',
      pass: 'Owner123'
    }
  });

  
  
  /////////////////////////////////////////////
  //for files upload
const formidable = require('formidable');
const http = require('http');
const fs = require('fs');

//The file will be uploaded, and placed on a temporary folder:
// serving static files
app.use('/upload', express.static('upload'));
 
// request handlers
app.get('/', (req, res) => {
    res.send('Node js file upload rest apis');
});


// handle storage using multer
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'upload');
   },
   filename: function (req, file, cb) {
    /* need to use the file's mimetype because the file name may not have an extension at all */
    const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    cb(null, Date.now() + ext)
    //   cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}` +'.'+`${ext}`);
   }
});
const upload = multer({storage: storage})

// handle single file upload
app.post('/fileupload', upload.single('upload_file1'), (req, res, next) => {
   const file = req.file;
   if (!file) {
      return res.status(400).send({ message: 'Please upload a file.' });
   }
   const db = dbService.getDbServiceInstance();
   console.log("req", {req})

   const result = db.uploadFileData(req.file);
//    var sql = "INSERT INTO `files_data`(`name`) VALUES ('" + req.file.filename + "')";
//    var query = db.query(sql, function(err, result) {
       return res.send({ message: 'File uploaded successfully.', file });
//     });
});


  ///
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.listen(process.env.PORT,()=>{
    console.log("server running on port ",process.env.PORT)
});


  // create
app.post('/insert', (request, response) => {
    
    const link="http://localhost:3000/AccountVerify?mail="+request.body.Data.email;
    const mailOptions = {
        from: 'companymanager2022@gmail.com',
        to: request.body.Data.email,
        subject: '',
        html:  '<h1>Welcome</h1><p>Welcom to Our company website, to verify your code click on this link  !</p><a href='+link+'>Click here to verify</a> '
      };
    let userData = {};
    userData = request.body;
    const db = dbService.getDbServiceInstance();
    console.log("request.body", request.body)
    console.log("mail", request.body.Data.email)

    const result = db.insertRegistrationData(userData);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
});
app.get('/imageDownload', (req, res)=>{
    const db = dbService.getDbServiceInstance();
    console.log("image req:", req)

    const result = db.getImage();
    console.log("image result from imageDownload is:", result)
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
});
// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

//Create template

app.post('/createTemplate', (request, response) => {

    let temp_data = {};
    temp_data = request.body.Data;
    const db = dbService.getDbServiceInstance();
    console.log("request.body.email", request.body.Data)

    const result = db.insertNewTemplateData(temp_data);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});
//Verify account
app.post('/verifyAccount', (request, response) => {

    let email = {};
    email = request.body.email;
    const db = dbService.getDbServiceInstance();
    console.log("request.body.email", request.body.email)

    const result = db.updateVerificationStatus(email);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});
// update
app.patch('/update', (request, response) => {
    const { id, name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, name);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();
console.log("delet")
    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

//read
app.get('/getEmployeeProjects', (request, response) => {
    console.log("tessst")

    //console.log("request",request)

    const db = dbService.getDbServiceInstance();
    const result = db.getEmployeeProjects();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
    

})



