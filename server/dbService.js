const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});
connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }
    
    async getImage() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM t_files_data;";
                console.log("database select all",query)
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
             console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getEmployeeProjects(){
       try {
        let userReturnData=[];
        let userProjects = await new Promise((resolve, reject) => {
            const projectsQuery = "SELECT project_name,project_unique_name FROM t_projects ;";
            console.log("database select all",projectsQuery)
            connection.query(projectsQuery,(err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        console.log("*****************userProjects",userProjects)
        let j=0;
        let projectTemplates=[];
        let projectTemplatesPromis = await new Promise((resolve, reject) => {
            const userProjectsArray=Object.entries(userProjects)
            // userProjectsArray.map(function (projectName){
                for(let projectName of userProjectsArray){
                    console.log(">>>projectName",projectName)
            const templatesIdsQuery = "SELECT temp_id,project_name FROM t_templat_projects WHERE project_name=?;";
            connection.query(templatesIdsQuery,[projectName[1].project_unique_name], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
                projectTemplates[j]=Object.assign(results)
                    j++
                    console.log(">>>projectTemplates",projectTemplates)

            })  //end query connection                                     
        };//end map
    })//end project temp promise
    console.log(" ***********projectTemplates",projectTemplates)
    console.log(" ***********projectTemplatesPromis",projectTemplatesPromis)

        let templatesName=[];
        let userTemplates=[];
        let i=0;
        for (let projectObject of projectTemplates) {
          userTemplates= await new Promise((resolve, reject) => {
            for (let projectElement of projectObject) {

                const templatesNameQuery = "SELECT template_name,template_id FROM t_templates WHERE template_id=?;";
                connection.query(templatesNameQuery, [projectElement.temp_id],(err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                    console.log("results",results)
                    const keys = Object.keys(templatesName);
                    let duplicate = false;

                    for(let i=0;i<keys.length;i++){
                    for(let j=i+1;j<keys.length;j++){
                    if(templatesName[keys[i]].temp_id === templatesName[keys[j]].temp_id){
                        duplicate = true;
                        break;
                    }
                    }
                }
                    if(!duplicate)
                    {
                        templatesName[i]=Object.assign(results)
                    i++
                    }
                    
                    console.log("$$$$$templatesName",templatesName)

                })
            }
            });
            console.log("userTemplates",userTemplates)

        }

        console.log("templatesName",templatesName)

        // userTemplatesName=Object.assign(templatesName)
        console.log("userTemplates",userTemplates)
    return {userProjects,projectTemplates,templatesName}
        } catch (error) {
            console.log(error);
        }

    }
    //////////////////////////////////////////
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM t_users;";
console.log("database select all",query)
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
             console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async uploadAttachment (fileData={}){
        try {
        // const uploadeDate = new Date();
        console.log("fileData",fileData)
        const insertId = await new Promise((resolve, reject) => {
            const query = "INSERT INTO `t_template_entries` (attachment_name) VALUES (?)";
           
            connection.query(query,
                [fileData.filename],(err,result) => {
                if (err) reject(new Error(err.message));
                console.log("result",result)
                resolve(result.insertId);
            })
        });
        console.log("insertId",insertId)
        return {
            id : insertId,
            filename:fileData.filename
        };
    } catch (error) {
        console.log(error);
    }
}
    async uploadFileData(fileData={}){
        try {
            const uploadeDate = new Date();
            console.log("fileData",fileData)
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO `t_files_data` (name,size,type,saved_date) VALUES (?,?,?,?)";
                //    var query = db.query(sql, function(err, result) {
                //     //    return res.send({ message: 'File uploaded successfully.', file });
                //     });
                // const query = "UPDATE users SET verified = 0x1 WHERE email = ?;";
    
                connection.query(query,
                    [fileData.filename,
                        fileData.size,
                    fileData.mimetype,
                uploadeDate],(err,result) => {
                    if (err) reject(new Error(err.message));
                    console.log("result",result)
                    resolve(result.insertId);
                })
            });
            console.log("insertId",insertId)
            return {
                id : insertId,
                filename:fileData.filename
            };
        } catch (error) {
            console.log(error);
        }
    }
async updateVerificationStatus(email){
    try {
        const registrationDate = new Date();
        console.log("db service received email",email)
        const updatedId = await new Promise((resolve, reject) => {
            
            const query = "UPDATE t_users SET verified = 0x1 WHERE email = ?;";

            connection.query(query, [email] , (err, result) => {
                if (err) reject(new Error(err.message));
                console.log("result",result)
                resolve(result.updatedId);
            })
        });
        console.log("updatedId",updatedId)
        return {
            id : updatedId,
            email : email,
        };
    } catch (error) {
        console.log(error);
    }
}


async insertNewTemplateEntry(entryData={}) {
    try {
        const tempCreationDate = new Date();
        console.log("tempCreationDate",tempCreationDate)
        // console.log("entryData",entryData.formData.filename)
        // console.log("templateData.template_desc",templateData.template_desc)
        // console.log("templateData.session_id",templateData.session_id)
        // console.log("db service received data",templateData)
        const insertId = await new Promise((resolve, reject) => {
            const query = "INSERT INTO t_template_entries (template_id,project_unique_name,session_id,entry_text,entry_date) VALUES (?,?,?,?,?);";

            connection.query(query, [
                entryData.template_id,
                entryData.project_unique_name,
                entryData.session_id,
                entryData.entry_text,
                 tempCreationDate,] , (err, result) => {
                if (err) reject(new Error(err.message));
                console.log("result",result)
                resolve(result.insertId);
            })
        });
        console.log("insertedID",insertId)

        return {
            id : insertId,
        };
    } catch (error) {
        console.log(error);
    }
}


async insertNewTemplateData(templateData={}) {
    try {
        const tempCreationDate = new Date();
        console.log("tempCreationDate",tempCreationDate)
        console.log("templateData.template_name",templateData.template_name)
        console.log("templateData.template_desc",templateData.template_desc)
        console.log("templateData.session_id",templateData.session_id)
        console.log("db service received data",templateData)
        const insertId = await new Promise((resolve, reject) => {
            const query = "INSERT INTO t_templates (template_name,template_desc,session_id,creation_date) VALUES (?,?,?,?);";

            connection.query(query, [
                templateData.template_name,
                templateData.template_desc,
                templateData.session_id,
                 tempCreationDate,] , (err, result) => {
                if (err) reject(new Error(err.message));
                console.log("result",result)
                resolve(result.insertId);
            })
        });
        console.log("insertedID",insertId)

        return {
            id : insertId,
        };
    } catch (error) {
        console.log(error);
    }
}
    async insertRegistrationData(userData={}) {
        try {
            const registrationDate = new Date();
            console.log("db service received data",userData)
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO t_users (username, realName,password,mobileNo,email,registrationDate,userCode,companyCode,nationalID,verified) VALUES (?,?,?,?,?,?,?,?,?,?);";

                connection.query(query, [userData.Data.username,
                     userData.Data.realName,
                     userData.Data.password,
                     userData.Data.mobile,
                     userData.Data.email,
                     registrationDate,
                     userData.Data.userCode,
                     userData.Data.companyCode,
                     userData.Data.nationalID,
                    userData.Data.verified] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    console.log("result",result)
                    resolve(result.insertId);
                })
            });
            console.log("insertedID",insertId)
            console.log("userDatabefore return",userData.Data.username)

            return {
                id : insertId,
                username : userData.username,
                realName: userData.realName,
                registrationDate : registrationDate
            };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM t_users WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateNameById(id, name) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE t_users SET username = ? WHERE id = ?";
    
                connection.query(query, [name, id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM t_users WHERE username = ?;";

                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;