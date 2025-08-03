const { error } = require('console');
const fs = require('fs');
const rootDir = require('../utils/pathUtil');
const path = require('path');

module.exports = class Home{
  constructor(id,fullName,gender,profession,experience,skills){
    this.id = id;
    this.fullName = fullName;
    this.gender = gender;
    this.profession = profession;
    this.experience = experience;
    this.skills = skills;
  }
  
  save(){
    Home.fetchAll((registeredAc)=>{
      registeredAc.push(this)
      const dataPath = path.join(rootDir,'data','homes.json');
      fs.writeFile(dataPath,JSON.stringify(registeredAc),error=>{
        console.log("File writing found error :- ",error);
      })
    });
  }

static fetchAll(callback){
  const dataPath = path.join(rootDir,'data','homes.json');
  fs.readFile(dataPath,(err,data)=>{
    // console.log("file reading error ",err , data);
    callback(!err? JSON.parse(data):[]);

  });
}

  }
