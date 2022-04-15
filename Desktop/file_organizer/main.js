let fs = require("fs");
let path = require("path");
// src path address C:\Users\Aman\Desktop\file_organizer\src



let srcPath = process.argv.slice(2)[0];
let extFolderPath = path.join(srcPath,'Others');
// console.log(srcfolder);

let extension = {
    Document : [".css", ".doc", ".html", ".js", ".pdf", ".ppt" ],
    Music : [".mp3"],
    Videos : [".mov", ".mp4", ".mpeg"],
    Images : [".gif", ".img", ".png,", ".mpeg"],
    Codes : [".css", ".html", ".js"]

}

function checkFolder(extName, srcPath){
    for(let key in extension){

        let categoryArr = extension[key];
        if(categoryArr.includes(extName)){

            extFolderPath = path.join(srcPath,key);
            break;
        }


    }

     return fs.existsSync(extFolderPath);
}

function createFolder(){

    fs.mkdirSync(extFolderPath);
}

function moveFile(fileName, srcPath){

    let srcFile = path.join(srcPath,fileName);
    let destFile = path.join(extFolderPath,fileName);

    fs.copyFileSync(srcFile,destFile);
    fs.unlinkSync(srcFile);

}

function organizeFolder(srcPath){
    let exist = fs.existsSync(srcPath);
    if(exist==true){
        console.log("Given Path Exist");

        let content = fs.readdirSync(srcPath);
        // console.log(content);       to check the output of folder content
        for(let i=0; i<content.length; i++){

            let extName = path.extname(content[i]);
            // console.log(content[i], ">>>>>>", extName);

            let extensionFolder = checkFolder(extName, srcPath);
            if(extensionFolder==true){

                moveFile(content[i], srcPath);
            }
            else{

                createFolder();
                moveFile(content[i], srcPath);
            }
            
            extFolderPath = path.join(srcPath,'Others');

        }
    }
    else{
        console.log("Given path does'nt Exist");
    }
}

organizeFolder(srcPath);
// console.log("Process Completed");
