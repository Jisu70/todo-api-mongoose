const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

/**
 *  methods Instance
 * @returns  that find words meeting in title
 */
todoSchema.methods = {
  // Return the active Todo using async await
  findActive: function () {
    return mongoose.model("Todo").find({ status: "active" });
  },
  //  Return the active TODOS Using Callback
  findActiveCallback: function (cb) {
    return mongoose.model("Todo").find({ status: "active" }, cb);
  },
};
/**
 *  methods Static
 * @returns  that find words meeting in title
 */
todoSchema.statics.findWords = function () {
  return this.find({ title: /meeting/i });
};


/**
 *  methods  Query helpers
 * @returns  that find words which was passing  in arguments 
 */
todoSchema.query.byQery = function (language) {
  return this.find({ title: new RegExp(language, "i") });
};


module.exports = todoSchema;
