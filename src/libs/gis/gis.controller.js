const GisModel = require("./gis.model");


exports.insert = (req, res) => {
  if (req.file)
  req.body.Thumbnail =req.file.path;
  //console.log(req.body)

  GisModel.createGis(req.body).then(
    (result) => {
      res.status(200).send({ message: "Gis Created successfully" });
    },
    (err) => {
      console.log(err);
      res.status(406).send(err);
    }
  );
};


exports.findGisById = (req, res) => {
  GisModel.findGisById(req.params.gisID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(406).send(err.message);
    }
  );
};

exports.updateGisById = (req, res) => {
  GisModel.updateGisById(req.body, req.params.gisID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(406).send(err);
    }
  );
};

exports.deleteGisById = (req, res) => {
  GisModel.deleteGisById(req.params.gisID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(406).send(err);
    }
  );
};

exports.findAllGis = (req, res) => {
  GisModel.findAllGis().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(406).send(err);
    }
  );
};

exports.findCategory = (req, res) => {
  GisModel.findCategory().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(406).send(err);
    }
  );
};

exports.findByCategory = (req, res) => {
  GisModel.findByCategory(req.params.category).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(406).send(err.message);
    }
  );
};
