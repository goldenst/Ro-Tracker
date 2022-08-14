import axios from "axios";

const API_URL = "/api/tickets/";

// create new ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const responce = await axios.post(API_URL, ticketData, config);
  return responce.data;
};

// edit ticket
const updateTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const responce = await axios.put(API_URL, ticketData, config);
  return responce.data;
};


// get user tickets
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const responce = await axios.get(API_URL, config);
  return responce.data;
};

// get user ticket
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const responce = await axios.get(API_URL + ticketId, config);
  return responce.data;
};

// close ticket
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const responce = await axios.delete(API_URL + ticketId, config);
  return responce.data;
};

// Delete ticket
const deleteTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const responce = await axios.delete(API_URL + ticketId, config);
  return responce.data;
};

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
  deleteTicket,
  updateTicket,
};

export default ticketService;
