const mongoose = require('mongoose');
const argon2 = require("argon2");

// This is the schema. Users have usernames and passwords. We solemnly promise to
// salt and hash the password!
const userSchema = new mongoose.Schema({
    given_name: String,
    family_name: String,
    hails_from: String,
    party_role: String,
    intro: {
        type: String,
    },
    script: String,
    username: String,
    password: String,
    parties: {
        type: Array,
        default: []
    },
    role: {
        type: String,
        default: ""
    }
});

userSchema.pre('save', async function (next) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password'))
        return next();

    try {
        // generate a hash. argon2 does the salting and hashing for us
        const hash = await argon2.hash(this.password);
        // override the plaintext password with the hashed one
        this.password = hash;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// This is a method that we can call on User objects to compare the hash of the
// password the browser sends with the hash of the user's true password stored in
// the database.
userSchema.methods.comparePassword = async function (password) {
    try {
        // note that we supply the hash stored in the database (first argument) and
        // the plaintext password. argon2 will do the hashing and salting and
        // comparison for us.
        const isMatch = await argon2.verify(this.password, password);
        return isMatch;
    } catch (error) {
        return false;
    }
};

// This is a method that will be called automatically any time we convert a user
// object to JSON. It deletes the password hash from the object. This ensures
// that we never send password hashes over our API, to avoid giving away
// anything to an attacker.
userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}


// create a User model from the User schema
const User = mongoose.model('User', userSchema);


const getUserById = async (id) => {
    if (!id) {
        throw "Dao: no id!";
    }
    try {
        return await User.findOne({
            _id: id
        });
    } catch (error) {
        console.error(error);
        throw error;
    }

}

const createUser = async (given_name, family_name, hails_from, party_role, script, username, password) => {
    try {
        const user = new User({
            given_name: req.body.given_name,
            family_name: req.body.family_name,
            hails_from: req.body.family_name,
            party_role: req.body.party_role,
            script: req.body.script,
            username: req.body.username,
            password: req.body.password,
        });
        await user.save();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const authenticate = async (username, password) => {
    try {
        const user = await User.findOne({
            username: username
        });
        if (!user) {
            return false;
        }
        user.comparePassword(password)
    } catch (error) {
        return false;
    }
}

const addParty = async (user_id, party_id) => {
    const user = getUserById(user_id);
    if (!user) {
        
    }
}