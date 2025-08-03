const { error } = require('console');
const fs = require('fs');
const rootDir = require('../utils/pathUtil');
const path = require('path');

module.exports = class Hired{
  constructor(id){
    this.id = id;
  }
  
  save(){
    Hired.fetchAll((account)=>{
      account.push(this)
      const dataPath = path.join(rootDir,'data','hired.json');
      fs.writeFile(dataPath,JSON.stringify(account),error=>{
        // console.log("File writing found error :- ",error);
      })
    });
  }

static fetchAll(callback){
  const dataPath = path.join(rootDir,'data','hired.json');
  fs.readFile(dataPath,(err,data)=>{
    callback(!err? JSON.parse(data):[]);

  });
}

  }