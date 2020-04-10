const express = require("express");
const mongoose = require('mongoose');
const users = require("./users.js")
const router = express.Router();

const validUser = users.valid;

const partySchema = new mongoose.Schema({
    party_name: String,
    party_image: String,
    party_description: String,
    party_members: Array,
    party_page: String,
});

partySchema.methods.toJSON = function () {
    var obj = this.toObject();
    //just in case
    return obj;
}

const Party = mongoose.model('Party', partySchema);

/* Middleware */

const validMember = async (req, res, next) => {
    if (!req.user) {
        return res.status(403).send({
            message: "no user provided"
        });
    }
    if (!req.party_id || !req.body.party_id) {
        return res.status(400).send({
            message: "no party provided"
        });
    }

    const party_id = req.party_id ? req.party_id : req.body.party_id;
    try {
        const party = await Party.findOne({
            _id: party_id
        });
        if (!party) {
            return res.status(400).send({
                message: "no party provided"
            });
        }
        if (req.user.parties.includes(party._id) && party.party_members.includes(req.user._id)) {
            req.party = party;
        } else {
            return res.status(403).send({
                message: "user not in party"
            });
        }
    } catch (error) {
        return res.status(403).send({
            message: "user not in party"
        });
    }

    next();
}

/* API Endpoints */

router.post('/create', validUser, async (req, res) => {
    if (!req.body.party_name) {
        return res.status(400).send({
            message: "party name required"
        })
    }
    try {
        const existingParty = await Party.findOne({
            party_name: req.body.party_name
        });
        if (existingParty) {
            return res.status(403).send({
                message: "party already exists"
            });
        }
        
        const party = new Party({
            party_name: req.body.given_name,
            party_image: (req.body.party_image && req.body.party_image.length > 0 ? req.body.party_image : ''),
            party_description: (req.body.party_description ? req.body.party_description : ''),
            party_members: [req.user._id],
            party_page: (req.body.party_page && req.body.party_page.length > 0 ? req.body.party_page : '')
        });
        await party.save();

        return res.send({
            party: party
        });
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
});

router.delete('/destroy', validUser, async (req, res) => {
    if (req.user.role !== 'admin person') {
        return res.status(403).send({
            message: 'you must be an admin to delete parties'
        });
    }
    if (!req.body.party_id) {
        return res.status(400).send({
            message: 'no party id provided'
        });
    }
    try {
        await Party.findByIdAndDelete(req.body.party_id);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500); 
    }
});

router.put('/join', validUser, async (req, res) => {
    if (!req.party_id || !req.body.party_id) {
        return res.status(400).send({
            message: "no party provided"
        });
    }

    const party_id = req.body.party_id ? req.body.party_id : req.party_id;

    try {
        const party = await Party.findOne({
            _id: party_id
        });
        if (!party) {
            return res.status(400).send({
                message: "no party provided"
            });
        }
        await party.party_members.push(req.user._id);
        await party.save();
        await req.user.parties.push(party._id);
        await req.user.save();

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);  
    }
});


router.delete('/leave', validUser, validMember, async (req, res) => {
    try {
        var index = req.user.parties.index(req.party._id);
        if (index !== -1) {
            req.user.parties.splice(index);
            await req.user.save();
        }
        index = req.party.party_members.index(req.user._id);
        if (index !== -1) {
            req.party.party_members.splice(index);
            await req.party.save();
        }

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);  
    }
});

module.exports = {
    routes: router,
    model: Party,
    valid: validMember,
}