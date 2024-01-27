const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser")
const Notes = require("../models/Notes");
const { query, validationResult, body } = require('express-validator');

router.get("/fetchall_notes", fetchuser, async (req, resp) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        resp.json(notes);
    } catch (error) {
        console.log(error.message)
        resp.status(400).send("internal server error")
    }
})

router.post("/addnotes", fetchuser, [
    body('title', "enter a valid title ").isLength({ min: 3 }),
    body('desc', "it must be 5 letters ").isLength({ min: 5 })], async (req, resp) => {
        try {
            const { title, desc, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return resp.status(400).json({ errors: errors.array });
            }
            const note = new Notes({
                title, desc, tag, user: req.user.id
            })
            const save_data = await note.save();
            resp.json(save_data);
        } catch (error) {
            console.log(error.message);
            resp.status(400).send({ error: "internal server error" });
        }
    })

router.put('/update/:id', fetchuser, async (req, resp) => {
    const { title, desc, tag } = req.body;
    try {
        const newnote = {};
        if (title) { newnote.title = title };
        if (desc) { newnote.desc = desc };
        if (tag) { newnote.tag = tag };
        let note = await Notes.findById(req.params.id);
        if (!note) {
            resp.status(404).send("not found ")
        }
        if (note.user.toString() !== req.user.id) {
            resp.status(401).send("not allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
        console.log(note);
        resp.json({ note });
    } catch (error) {
        console.log(error.message);
        resp.status(400).send({ error: "internal server error" });
    }
})

router.delete('/delete/:id', fetchuser, async (req, resp) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) { return resp.status(404).send("not found"); }
        if (note.user.toString() !== req.user.id) { resp.status(401).send("not allowed"); }
        note = await Notes.findByIdAndDelete(req.params.id);
        resp.json({ "success": "note has been deleted", note: note });
    } catch (error) {
        console.log(error.message);
        resp.status(400).send({ error: "internal server error" });
    }
})
module.exports = router;

