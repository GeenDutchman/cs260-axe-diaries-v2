const express = require("express");
const mongoose = require('mongoose');
const users = require("./users.js");
const parties = require("./party.js");
const router = express.Router();

const validUser = users.valid;
const validMember = parties.valid;

const entrySchema = new mongoose.Schema({
    text: String,
    date: String,
    author_id: String,
    order: Number,
    party_id: String,
});

const Entry = mongoose.model('Entry', entrySchema);

router.post("/", validUser, validMember, async (req, res) => {
    if (!req.body.text) {
        return res.status(400).send({
            message: 'entry must have a body'
        });
    }
    try {
        const order_num = req.party.party_entries.length;
        const entry = new Entry({
            text: req.body.text,
            date: (req.body.date ? req.body.date : ''),
            author_id: req.user._id,
            order: order_num,
            party_id: req.party._id,
        });
        await entry.save();
        return res.send({
            entry: entry
        });
    } catch (error) {
        console.error('blog post', error);
        return res.sendStatus(500);       
    }
});


router.get("/:id", async (req, res) => {
    let entries = [];
    try {
        entries = await Entry.find({
            party_id: req.params.id
        }).sort({order: 1});
        return res.send({
            entries: entries
        });
    } catch (error) {
        console.error('blog get id', error);
        return res.sendStatus(500);
    }
});

module.exports = {
    routes: router,
    model: Entry,
}

