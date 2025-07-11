const express = require('express');
const { auth } = require("../Middelware/auth");
const { documents } = require("../Model/documentModel");

const documentRoute = express.Router();

documentRoute.get("/public", async (req, res) => {
  try {
    const docs = await documents
      .find({ visibility: "public" })
      .populate("author", "name email")
      .sort({ updatedAt: -1 });

    res.status(200).send(docs);
  } catch (err) {
    res.status(400).json(err);
  }
});

documentRoute.use(auth)

documentRoute.post("/create",async (req, res) => {
  try {
    const { title, content, visibility } = req.body;
    const doc = new documents({
      title,
      content,
      visibility,
      author: req.userData._id
    });
    await doc.save();
    res.status(201).send(doc);
  } catch (err) {
    res.status(400).json(err);
  }
});

documentRoute.get("/", async (req, res) => {
  try {
    const docs = await documents.find({
      $or: [
        { author: req.userData._id },
        { visibility: "public" },
        { sharedWith: req.userData._id }
      ]
    }).populate("author", "name email");
    res.status(200).send(docs);
  } catch (err) {
    res.status(400).json(err);
  }
});

documentRoute.patch("/edit/:id",async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await documents.findById(id);
    if (!doc) return res.status(404).send("Document not found");
    if (doc.author.toString() !== req.userData._id.toString()) {
      return res.status(403).send("Not authorized to edit this document");
    }
    const updatedDoc = await documents.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    res.status(200).send(updatedDoc);
  } catch (err) {
    res.status(400).json(err);
  }
});

documentRoute.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    const regex = new RegExp(q, "i");

    const docs = await documents.find({
      $and: [
        {
          $or: [
            { author: req.userData._id },
            { visibility: "public" },
            { sharedWith: req.userData._id }
          ]
        },
        {
          $or: [
            { title: regex },
            { content: regex }
          ]
        }
      ]
    }).populate("author", "name email");
    res.status(200).send(docs);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = { documentRoute };