import React, { useReducer } from "react";
import { Link } from "react-router-dom";


const TicketItem = ({ ticket }) => {

  


  return (
    <div className="ticket">
      <div>{ticket.repairOrder}</div>
      <div>{ticket.name}</div>
  
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>View</Link>
    </div>
  );
};

export default TicketItem;
