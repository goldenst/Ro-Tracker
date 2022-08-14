const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Note = require("../models/notesModel");

// @desc     Get Notes for  Tickets
// @route    GET/api/tickets/:ticketId/notes
// @access   Private
const getNotes = asyncHandler(async (req, res) => {
  // Get User Tickets
  const user = await User.findById(req.user.id);

  if (!user) {
    res.send(401);
    console.log("user not founf  nc 15");
    throw new Error("user not found");
  }
  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not Authroized");
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// @desc     create Notes for  Tickets
// @route    POST/api/tickets/:ticketId/notes
// @access   Private
const addNote = asyncHandler(async (req, res) => {
  // Get User Tickets
  const user = await User.findById(req.user.id);

  if (!user) {
    res.send(401);
    console.log("user not founf  nc 15");
    throw new Error("user not found");
  }
  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not Authroized");
  }

  const note = await Note.create({ 
    text: req.body.text,
    ticket: req.params.ticketId ,
    user: req.user.id
  });

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote,
}
