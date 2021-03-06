const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validate = require('mongoose-validator');
const { TE, to } = require('../services/util.service');
const Location = require('./location');
const Reservation =require('./reservation');
let UserSchema = new Schema({
    nom: String,
    prenom: String,
    phone: String,
    email: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        sparse: true,
        validate: [validate({
          validator: 'isEmail',
          message: 'Not a valid email.',
        }),]
    },
    password: String,
    avatar : {
      type : String,
      default : 'assets/images/avatars/profile.jpg'
    },
    isBanned: {
      type : Boolean,
      default : false
    },
    role: {
        required : true,
        type: Schema.Types.ObjectId,
        ref: "role"
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
}, { timestamps: true, toJSON: { virtuals: true } });


UserSchema.methods.toJSON= function(){
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  return user;
}

UserSchema.virtual('reservations',{
    ref : 'reservation',
    localField : '_id',
    foreignField : 'user'
});

UserSchema.virtual('libelles',{
  ref : 'libelle',
  localField : '_id',
  foreignField : 'user'
});


UserSchema.virtual('location',{
    ref : 'location',
    localField : '_id',
    foreignField : 'user'
});


UserSchema.pre('save', async function (next) {

    if (this.isModified('password') || this.isNew) {
      this.password = await bcrypt.hash(this.password, 8);
    }else{
      return next();
    }

});

UserSchema.pre('remove', async function (next){
  //this is the user
  console.log('deleting it Locations and reservations');
  await Location.deleteMany({locataire : this._id});
  await Reservation.deleteMany({locataire : this._id});
  next();
})

// UserSchema.methods.comparePassword = async function(pw){
//   let err, pass;

//   if (!this.password) {
//     TE(err);
//   }

//   if (!pass) {
//     TE('Invalid password');
//   }

//   return this;
// };



let User = mongoose.model('user', UserSchema);

// User.createCollection().then(function(collection) {
//   console.log('User is created!');
// });

module.exports = User;