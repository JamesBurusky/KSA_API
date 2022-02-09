const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const Auth = require("../../models/Auth")(sequelize, Sequelize);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

Auth.sync({ force: false });
exports.createAuth = (AuthData) => {
  return new Promise(async (resolve, reject) => {

    if(AuthData.Password === undefined){
    return reject({message:"Body is required!!!"})}

    //Encrypt user password
    AuthData.Password = await bcrypt.hash(AuthData.Password, 10);
    
    //check email
    Auth.findAll({
      where: {
        Email: AuthData.Email,
      },
    }).then(
      (result) => {
        if (result.length == 0) {
          Auth.create(AuthData).then(
            (result) => {
              resolve(result);
            },
            (err) => {
              reject({message:"User creation failed"});
            }
          );
        } else {
          reject({ error: "This user exists!!!" });
        }
      },
      (err) => {
        reject({message:"Something went wrong"});
      }
    );
  });
};

exports.loginAuth = (res,AuthData) => {
  return new Promise(async (resolve, reject) => {
    //check email
    Auth.findAll({
      where: {
        Email: AuthData.Email,
      },
      raw: true,
    }).then(
      async (result) => {
        if (
          result.length !=0 &&
          (await bcrypt.compare(AuthData.Password, result[0].Password))
        ) {
          const token = jwt.sign(
            { UserID: result[0].UserID, Email:result[0].Email, Role:result[0].Role},
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );

          await Auth.update(
            { Token: token },
            {
              where: {
                UserID: result[0].UserID,
              },
            }
          );

          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          });

          resolve({token:token,message:"Login successful"});
        } else {
          reject({ error: "Authentication failed" });
        }
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findAuthById = (id) => {
  return new Promise((resolve, reject) => {
    Auth.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, message: "Auth not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.updateAuthById = (AuthData, AuthID) => {
  return new Promise((resolve, reject) => {
    Auth.update(AuthData, {
      where: {
        UserID: AuthID,
      },
    }).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};
exports.deleteAuthById = (AuthID) => {
  return new Promise((resolve, reject) => {
    Auth.destroy({
      where: {
        UserID: AuthID,
      },
    }).then(
      (result) => {
        console.log(result)
        if(result != 0)
        resolve({ message: "Deleted successfully!!!" });
        else reject({message:"User does not exist!!!"})
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findAllAuth = () => {
  return new Promise((resolve, reject) => {
    Auth.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.logout = (res) => {
  return new Promise((resolve, reject) => {
    try {
      res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      resolve({message:"Logout successful"});
    } catch (error) {
      reject(error)
    }
  });
};