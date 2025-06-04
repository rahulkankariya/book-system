const config = require('../common/config')
const appConstant = require('../common/appConstant')
var noLoginNeeded = require('../common/apiConfig');
const jwt = require('jsonwebtoken');
const commonHelper = require('../common/commonHelper');
const message = require('../common/message')
module.exports = {
    verifyToken:(req,res,next)=>{
        var islogin = true;
        console.log(req.path);
        for (var i = 0; i < noLoginNeeded.length; i++) {
            if (req.path.indexOf(noLoginNeeded[i]) > -1) {
                islogin = false;
                break;
            }
        }
      

        if (!islogin) {
            next();
        } else {
            const token = req.headers['authorization'];
            
            if (token) {
                try {
                    jwt.verify(token, appConstant.JWTKEY, async function (err, data) {
                        if (err) {
                            console.log(err);
                            return res.status(401).send({ status: 401, message: message.INVALIDTOKEN });
                            
                        } else {
                            req.decoded = data; 
                            let userData = await commonHelper.validateToken(req,res);
                         
                            if(userData.executed == 1){
                                next();
                            }else{
                                return res.status(401).send({ status: 401, message: message.SESSIONEXPIRED });
                            } 
                            
                        }
                    })
                } catch(err){
                    console.log(err);
                    return res.status(401).send({ status: 401, message: message.INVALIDTOKEN });
                    
                }
            }
            else {
                return res.status(400).send({
                    status: 400,
                    message: message.NOTOKENPROVIDED
                });
            }
        }
    }
}