const express = require("express");
const mongoose = require('mongoose');
const users = require("./users.js")
const router = express.Router();

const User = users.model;
const validUser = users.valid;

const partySchema = new mongoose.Schema({
    party_name: String,
    party_image: String,
    party_description: String,
    party_members: {
        type: Array,
        default: []
    },
    party_page: String,
    party_num_entries: {
        type: Number,
        default: 0
    },
    party_invites: {
        type: Array,
        default: [],
    }
});

// partySchema.methods.toJSON = function () {
//     var obj = this.toObject();
//     delete obj.party_invites;
//     return obj;
// }

const Party = mongoose.model('Party', partySchema);

/* Middleware */

const validMember = async (req, res, next) => {
    if (!req.user) {
        return res.status(403).send({
            message: "no user provided"
        });
    }
    if (!req.party && !req.body.party_id) {
        return res.status(400).send({
            message: "no party provided"
        });
    }

    const party_id = req.party ? req.party._id : req.body.party_id;
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
            party_name: req.body.party_name,
            party_image: (req.body.party_image && req.body.party_image.length > 0 ? req.body.party_image : ''),
            party_description: (req.body.party_description ? req.body.party_description : ''),
            party_members: [req.user._id],
            party_page: (req.body.party_page && req.body.party_page.length > 0 ? req.body.party_page : ''),
            party_num_entries: 0
        });
        let newParty = await party.save();
        req.user.parties.push(newParty._id);
        const freshUser = await req.user.save();

        return res.send({
            party: party,
            user: freshUser,
        });
    } catch (error) {
        // console.error('party create', error);
        return res.status(500).send({message: "error creating party"});
    }
});

router.get("/", async (req, res) => {
    try {
        const parties = await Party.find().sort({party_name: -1});
        return res.send({
            parties: parties
        });
    } catch (error) {
        // console.error('party get all', error);
        return res.status(500).send({message: "error getting all parties"});
    }
});

router.get('/membership', validUser, async (req, res) => {
    try {
        let parties = req.user.parties.map(async (id) => {
            return await Party.findById(id);
        });
        let invited = req.user.invites.map(async (id) => {
            return await Party.findById(id);
        })
        parties = await Promise.all(parties);
        invited = await Promise.all(invited);
        return res.send({
            parties: parties,
            invited: invited,
        });
    } catch (error) {
        // console.error('party get membership', error);
        return res.status(500).send({message: "error getting party membership"});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const party = await Party.findById(req.params.id);
        if (!party) {
            return res.status(400).send({
                message: 'not a party'
            });
        }
        res.send({
            party: party
        });
    } catch (error) {
        // console.error('party get id', error);
        return res.status(500).send({message: "error getting party " + req.params.id});
    }
})

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
        // console.error('party destroy', error);
        return res.status(500).send({message: "error destroying party " + error}); 
    }
});

router.put('/invite', validUser, validMember, async (req, res) => {
    if(!req.body.username) {
        return res.status(400).send({
            message: 'no invitee username provided'
        });
    }
    try {
        // don't like accessing User here // Single Responsibility Principle // DAO needed?
        var user = await User.findOne({username: req.body.username});
        if (!user) {
            return res.status(400).send({message: 'that user does not exist'});
        }
        var index = req.party.party_invites.indexOf(user._id);
        if (index === -1) {

            user.invites.push(req.party._id);
            req.party.party_invites.push(user._id);
            //TODO: find some better way to alert user //Single Responsibility Principle
            await req.party.save();
            await user.save();
        }
        return res.send({
            message: (index >= 0 ? 'was already invited' : 'added to list'),
            party_id: req.party._id,
        });
    } catch (error) {
        // console.error('party invite', error);
        return res.status(500).send({message: 'invite error'});
    }
});

router.put('/join', validUser, async (req, res) => {
    if (!req.party_id && !req.body.party_id) {
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
        const anyone = '*';
        let party_index = party.party_invites.indexOf(req.user._id);
        let user_index = req.user.invites.indexOf(party._id);
        if (party.party_invites.indexOf(anyone) >= 0 || (party_index > -1 && user_index > -1)) {
            //remove invites
            if (party_index >= 0) {
                party.party_invites.splice(party_index);
            }
            if (user_index >= 0) {
                req.user.invites.splice(user_index);
            }
            //add to party
            await party.party_members.push(req.user._id);
            await party.save();
            await req.user.parties.push(party._id);
            await req.user.save();
        } else {
            return res.status(403).send({
                message: "the invitation was not found"
            });
        }


        res.sendStatus(200);
    } catch (error) {
        // console.error('party join', error);
        return res.status(500).send({message: "error joining party"});  
    }
});


router.delete('/leave', validUser, validMember, async (req, res) => {
    try {
        var index = req.user.parties.indexOf(req.party._id);
        if (index !== -1) {
            req.user.parties.splice(index);
            await req.user.save();
        }
        index = req.party.party_members.indexOf(req.user._id);
        if (index !== -1) {
            req.party.party_members.splice(index);
            await req.party.save();
        }

        res.sendStatus(200);
    } catch (error) {
        // console.error('party leave', error);
        return res.status(500).send({message: "error leaving party"});  
    }
});

module.exports = {
    routes: router,
    model: Party,
    valid: validMember,
}
