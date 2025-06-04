
const utils = require('../../utils/utils')
const User = require('../../models/User')
module.exports = {
    
    signup:async (req,res)=>{
        return new Promise(async (resolve,reject) => {
            try {
                let encryptPassword = utils.encryptPassword(req.body.password);
                const { firstName, lastName, email } = req.body;

                const existingUserFind = await User.findOne({ email , isDeleted: false });
                if (existingUserFind) {
                    resolve({ executed: 2, data: {} });
                }else{
                    const newUser = await User.create({
                        firstName,
                        lastName,
                        email,
                        password: encryptPassword,
        
                      });
                      let payload ={
                        id:newUser._id
                    }
                    let token = utils.generateJwTToken(payload)
                    let userDetails = {
                        userDetails:newUser,
                        token
                    }
                    resolve({ executed: 1, data: userDetails });
                }
                
            } catch (error) {
                console.log("Errr==>",error)
                reject({ executed: 0, data: {} });
            }
        })
    },
    login:(req,res)=>{
        return new Promise(async (resolve,reject) => {
            try {
               
                const { email } = req.body;
                const existingUserFind = await User.findOne({ email, isDeleted: false  });
                if (existingUserFind) {
                    let encryptPassword = utils.decryptPassword(existingUserFind.password);
                    if(encryptPassword == req.body.password){
                        let payload ={
                            id:existingUserFind._id
                        }
                        let token = utils.generateJwTToken(payload)
                        let userDetails = {
                            userDetails:existingUserFind,
                            token
                        }
                        resolve({ executed: 1, data: userDetails });
                    }else{
                        resolve({ executed: 2, data: {} });
                    }
                }else{
                    resolve({ executed: 3, data: {} });
                }
                
            } catch (error) {
                console.log("Err==>",error)
                reject({ executed: 0, data: {} });
            }
        })
    },
  
}