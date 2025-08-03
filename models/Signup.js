const { error } = require('console');
const fs = require('fs');
const rootDir = require('../utils/pathUtil');
const path = require('path');

module.exports = class Signup{
  constructor(fullname,email,phone,password){
    this.fullname = fullname;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
  
  save(){
    Signup.fetchAll((registeredAc)=>{
      registeredAc.push(this)
      const dataPath = path.join(rootDir,'data','Signup.json');
      fs.writeFile(dataPath,JSON.stringify(registeredAc),error=>{
        console.log("File writing found error :- ",error);
      })
    });
  }

static fetchAll(callback){
  const dataPath = path.join(rootDir,'data','Signup.json');
  fs.readFile(dataPath,(err,data)=>{
    callback(!err? JSON.parse(data):[]);

  });
}

  }
