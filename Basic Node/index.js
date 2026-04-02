
// const fs = require('node:fs');
// fs.appendFile(path,data,callback fnc)
// fs.appendFile('hello.txt',"Hello World",(e)=>{
//     if(e) throw error;
//         console.log("create a hello.txt");
   
// });
// issue : every time you run the file  that put new data with existing data, so that print same data every time you run file 

//fs=file system

// create file
// fs.writeFile(path,data,callback fnc)
// fs.writeFile('hello.txt',"Hello World",(e)=>{
//     if(e) throw error;
//         console.log("create a hello.txt");
   
// });
// issue : when you change hello.txt file and after that you run the file that cmd will be replace whole file with above given data

// create a folder 
// fs.mkdir(path,callback fnc)
// fs.mkdir('pages',(e)=>{
//     if(e) throw error;
//     console.log("create a new folder -- pages");
// });

// create  a nested folder
// fs.mkdir(path, {options},callback fnc)
// fs.mkdir("Css/Home/Style",{recursive:true},(e)=>{
//     if(e) throw error;
//     console.log("create a nested folder of CSS")
// });

//read file
// fs.readFile(path,fnc(e,data){})
// fs.readFile('hello.txt',"utf-8",(e,data)=>{
//     if(e) throw error;
//     console.log(data);
// });
// as a response you get (files inputes)

//read folder
// fs.readdir(path,fnc(e,files){})
// fs.readdir('Css/Home/Style',(e,files)=>{
//     if(e) throw error;
//     console.log(files);
// });

// as a response you get a array of folder and files name

// copy files
// fs.copyFile("path with file name","path with new file name", cb fnc)
// fs.copyFile('hello.txt','Css/Home/Style/Copy.txt',(e)=>{
//     if(e) throw error;
//     console.log("File Copy Successfully");
// });

// rename file
//fs.rename("old(existing) file name with path","new file name with path",cb fnc)
// fs.rename('hello.txt','rm.txt',(e)=>{
//     if(e) throw error;
//     console.log("File Rename Successfully");
// });

//nest file rename
// fs.rename('rm.txt','Css/Home/Style/dr.txt',(e)=>{
//     if(e) throw error;
//     console.log("rename file");
// });

// rename folder 
// fs.rename("Css/Home/Style","Css/Home/Components",(e)=>{
//     if(e) throw error;
//     console.log("rename folder");
// });

//delete file
//fs.rm(file name with path,cb fnc)
// fs.rm("Css/Home/Components/dr.txt",(e)=>{
//     if(e) throw error;
//     console.log("delete file");
// });

// delete folder
// fs.rm('Css',{ recursive:true,force:true },(e)=>{
//     if(e) throw error;
//     console.log("delete folder");
// });

// fs.rm("index.js",(e)=>{
//     if(e) throw error;
//     console.log("delete file");
// });

import chalk from 'chalk';

console.log(chalk.black("Write With Chalk"));
console.log(chalk.bgWhite.blackBright("Write With Chalk"));
console.log(chalk.bgWhite.black.bold("Write With Chalk"));
