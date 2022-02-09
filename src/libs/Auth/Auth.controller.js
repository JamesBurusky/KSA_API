const AuthModel = require("./Auth.model");

exports.insert = (req, res) => {
  AuthModel.createAuth(req.body).then(
    (result) => {
      res.status(200).send({message:"User Created successfully"});
    },
    (err) => {
      console.log(err);
      res.status(406).send(err);
    }
  );
};

exports.login = (req, res) => {
  AuthModel.loginAuth(res,req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      console.log(err);
      res.status(406).send(err);
    }
  );
};

exports.findAuthById = (req, res) => {
  AuthModel.findAuthById(req.params.authID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(406).send(err.message);
    }
  );
};
exports.updateAuthById = (req, res) => {
  AuthModel.updateAuthById(req.body, req.params.authID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(406).send(err);
    }
  );
};
exports.deleteAuthById = (req, res) => {
  AuthModel.deleteAuthById(req.params.authID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(406).send(err);
    }
  );
};
exports.findAllAuth = (req, res) => {
  AuthModel.findAllAuth().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(406).send(err);
    }
  );
};

exports.logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).send({message:"Logout successful"});
};