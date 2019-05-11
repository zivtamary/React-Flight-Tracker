const express = require("express");
const router = express.Router();
const multer = require("multer");

// Vacation Model
const Vacation = require("../models/Vacation");

// Upload Storage

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public", "images");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage }).single("file");

// ──────────── ROUTES ──────────────────────────────────────────────────────────────────


//@access Private (Only authenticated)
//@description Get All vacations
router.get("/", (req, res) => {
  if (req.session.userId) {
    Vacation.find({}).then(all => {
      res.json(all);
    });
  } else {
    res.status(401).json({ auth: false, msg: "please login first" });
  }
});


router.post("/upload", function(req, res) {
  if (!req.session.userId) {
    res.status(400).json({ msg: "You must be logged in." });
  } else {
    upload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }

      res.json(req.body);
    });
  }
});

router.post("/new", function(req, res) {
  const { info, destination, image, price, startDate, endDate } = req.body;
  console.log(req.body);
  if (
    !info ||
    !destination ||
    !price ||
    !image ||
    !startDate ||
    !endDate ||
    !req.session.userId
  ) {
    res.status(400).json({ msg: 'Vacation add error: Some info are missing' });
  } else {
    const vacation = new Vacation({
      info,
      destination,
      image,
      price,
      startDate,
      endDate,
    });

    vacation.save();
    res.status(200).json({ vacation });
  }
});

router.put("/", (req, res) => {
  const { id, info, destination, price, startDate, endDate } = req.body;
  console.log(req.body)
  if (!req.session.userId) {
    res.status(401).json({msg: 'Bad authorization'})
  } else {
    if (!id || !info || !destination || !price || !startDate || !endDate) {
        res.status(400).json({msg: 'Vacation update error: Some info are missing" '})
    } else {
      console.log('editing ' + id)
      Vacation.findByIdAndUpdate(id, { info, destination, price, startDate, endDate }, { new: true }).then(doc => {
        console.log(doc)
        res.status(200).json(doc)
      })
      
      }
  }


});

router.post("/delete", (req, res) => {
  const { id } = req.body
  console.log(id)
  if (!req.session.userId) {
    res.status(401).json({msg:"You must be logged in as admin"})
  } else if(!id) {
    res.status(400).json({msg:"Bad vacation Id"})
  } else {
    Vacation.findByIdAndDelete(id).then(() => {
      res.status(200).json({msg: "Vacation deleted!"})
    })
  }
});


router.post("/follow", (req, res) => {
  //Get Vacation and User
  const { vacationId, userId } = req.body

  if (!req.session.userId) {
    res.status(401).json({msg:"You must be logged in"})
  } else if (!vacationId || !userId) {
    res.status(400).json({msg:'Wrong vacation or user ID'})
  } else {
    Vacation.findByIdAndUpdate(vacationId, { $inc: { follows: 1 }, $push: { followers: userId } }, { new: true }).then(doc => {
      res.status(200).json(doc)
    })
  }
});

router.post("/unfollow", (req, res) => {
  //Get Vacation and User
  const { vacationId, userId } = req.body

  if (!req.session.userId) {
    res.status(401).json({msg:"You must be logged in"})
  } else if (!vacationId || !userId) {
    res.status(400).json({msg:'Wrong vacation or user ID'})
  } else {
    Vacation.findByIdAndUpdate(vacationId, { $inc: { follows: -1 }, $pull: { followers: userId } }, { new: true }).then(doc => {
      res.status(200).json(doc)
    })
  }
});


module.exports = router;
