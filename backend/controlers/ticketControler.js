const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc     Get User Tickets
// @route    GET/api/tickets
// @access   Private
const getTickets = asyncHandler(async (req, res) => {
  // Get User Tickets
  const user = await User.findById(req.user.id);

  if (!user) {
    res.send(401);
    console.log("user not founf  tc 15");
    throw new Error("user not found");
  }
  const tickets = await Ticket.find().sort({repairOrder: 1});

  res.status(200).json(tickets);
});

/////////////////////////////////////////////////////////////////////////////////////////
// @desc     Get All Tickets
// @route    GET/api/tickets
// @access   Private
const getAllTickets = asyncHandler(async (req, res) => {
  // Get User Tickets
  const user = await User.findById(req.user.id);

  if (!user) {
    res.send(401);
    console.log("user not founf  tc 15");
    throw new Error("user not found");
  }
  const tickets = await Ticket.find.sort({repairOrder: 'asc'});

  res.status(200).json(tickets);
});

//////////////////////////////////////////////////////////////////////////////////////////
// @desc   Create New Tickets
// @route   POST :/api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { repairOrder, name, phone, vehicle, concern, status, tech } = req.body;

  if (!repairOrder || !name) {
    throw new Error("Please add Repair order and Customer Name");
  }
  const user = await User.findById(req.user.id);

  if (!user) {
    res.send(401);
    throw new Error("user not found");
  }

  const tickets = await Ticket.create({
    repairOrder,
    name,
    phone,
    vehicle,
    concern,
    status,
    tech,
    user: req.user.id
  });
  res.status(201).json(tickets);
});

//////////////////////////////////////////////////////////////////////////////////////
// @desc     Get User single Ticket
// @route    GET/api/tickets/:id
// @access   Private
const getTicket = asyncHandler(async (req, res) => {
  // Get User Tickets
  const user = await User.findById(req.user.id);

  if (!user) {
    res.send(401);
    throw new Error("user not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not Found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(ticket);
});

////////////////////////////////////////////////////////////////////////////////////////
// @desc     DELETE Ticket
// @route    DELETE/api/tickets/:id
// @access   Private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get User Tickets
  const user = await User.findById(req.user.id);

  if (!user) {
    res.send(401);
    throw new Error("user not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not Found");
  }

  await ticket.remove();
  res.status(200).json({ success: true });
});

/////////////////////////////////////////////////////////////////////////////////////////
// @desc     UPDATE Ticket
// @route    PUT/api/tickets/:id
// @access   Private
const updateTicket = asyncHandler(async (req, res) => {
  // Get User Tickets
  const user = await User.findById(req.user.id);

  if (!user) {
    res.send(401);
    throw new Error("user not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not Found");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

// exports *****************************************************************************
module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
  getAllTickets,
};
