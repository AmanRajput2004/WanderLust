const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const Listing =require("../models/listing");
const {isLoggedIn , isOwner , validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

//Index Route

router.route("/")
.get(WrapAsync(listingController.index))
 //create route
.post(isLoggedIn,upload.single("listing[image]"),validateListing,  WrapAsync( listingController.createListing));


  //new route
  router.get("/new",isLoggedIn, listingController.renderNewForm);
  
  //show route
  router.route("/:id")
  .get(WrapAsync(listingController.showListing))
    //update route
  .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,WrapAsync(listingController.updateListing))
      //delete Route
  .delete(isLoggedIn,isOwner,WrapAsync(listingController.destroyListing));



  //edit route
  router.get("/:id/edit",isLoggedIn,isOwner,WrapAsync(listingController.renderEditForm));
  
  module.exports = router;