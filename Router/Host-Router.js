
const path = require('path');
const express = require('express');
const Hostrouter = express.Router();
const rootdir = require('../utils/pathUtil');
const Hostcontroller = require('../controller/host');
  Hostrouter.get("/host",Hostcontroller.getHostHome);
  
  Hostrouter.get("/signup",Hostcontroller.getSignup);
  
  Hostrouter.post("/Login",Hostcontroller.postLogin);
  
  Hostrouter.post("/signup",Hostcontroller.postSignup);
  
    Hostrouter.post("/form-submit",Hostcontroller.postForm); 

    Hostrouter.post("/post-job",Hostcontroller.postJob); 

    Hostrouter.get("/worker",Hostcontroller.getWorker);

    Hostrouter.get("/joblisting",Hostcontroller.getPostedJob);

    Hostrouter.post("/hiring",Hostcontroller.postHiring);

    Hostrouter.get("/hired",Hostcontroller.getHired);

exports.Hostrouter = Hostrouter;