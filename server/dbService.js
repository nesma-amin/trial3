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
                const query = "SELECT * FROM files_data;";
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
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users;";
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
    async uploadFileData(fileData={}){
        try {
            const uploadeDate = new Date();
            console.log("fileData",fileData)
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO `files_data` (name,size,type,saved_date) VALUES (?,?,?,?)";
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
            
            const query = "UPDATE users SET verified = 0x1 WHERE email = ?;";

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
    async insertRegistrationData(userData={}) {
        try {
            const registrationDate = new Date();
            console.log("db service received data",userData)
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users (username, realName,password,mobileNo,email,registrationDate,userCode,companyCode,nationalID,verified) VALUES (?,?,?,?,?,?,?,?,?,?);";

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
                const query = "DELETE FROM users WHERE id = ?";
    
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
                const query = "UPDATE users SET username = ? WHERE id = ?";
    
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
                const query = "SELECT * FROM users WHERE username = ?;";

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