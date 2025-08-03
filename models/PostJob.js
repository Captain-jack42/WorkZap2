const fs = require('fs');
const rootDir = require('../utils/pathUtil');
const path = require('path');
const { error } = require('console');

module.exports = class Job{
  constructor(JobTitle,Company,Location,JobType,SalaryRange,JobDescription,DeadLine){
    this.JobTitle = JobTitle;
    this.JobDescription = JobDescription;
    this.Company = Company;
    this.Location = Location;
    this.JobType = JobType;
    this.SalaryRange = SalaryRange;
    this.DeadLine = DeadLine;
  }

  save(){
    Job.fetchAll((PostedJob)=>{
      PostedJob.push(this)
      const dataPath = path.join(rootDir,'data','job.json');
      fs.writeFile(dataPath,JSON.stringify(PostedJob),error=>{
        if (error) {
          console.log("Error writing file:", error);
        } else {
          console.log("File written successfully");
        }
      })
    });
  }

  static fetchAll(callback){
    const dataPath = path.join(rootDir,'data','job.json');
    fs.readFile(dataPath,(err,data)=>{
      callback(!err? JSON.parse(data):[]);
    });
  }
}