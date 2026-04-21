const mongoose = require("mongoose");

let managerSchema = mongoose.Schema({
   username:{
        type: String,
        required: true,
        minlength: 5
   },
   email:{
        type: String,
        required: true,
        unique: true
   },
   password:{
        type: String,
        required: true     
   },

    rights: [
        {
            name: {
                type: String,
                minlength: 3,
            },
            isActive: {
                type: Boolean,
                default: false,
            },

        }
    ]
},
    { timestamps: true, }
);

module.exports = mongoose.model("Manager", managerSchema);
