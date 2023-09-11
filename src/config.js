const path = require("path")

const validExtensions = {
  images:["png", "jpg", "jpeg", "gif"],
  text:["txt","md"]
}

const validCollections = ["users", "categories", "products", "roles"];

const assetsPath = path.join(__dirname,'/assets');

module.exports = {
  validExtensions,
  validCollections,
  assetsPath
}