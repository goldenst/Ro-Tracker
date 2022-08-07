import React from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <section className="heading">
        <h1>Open Tickets</h1>
        <p>Please Choose from Options Below</p>

        <Link to="/new-ticket" className="btn btn-reverse btn-block">
          <FaQuestionCircle /> Create New Ticket
        </Link>
        <Link to="/ticket" className="btn  btn-block">
          <FaTicketAlt /> View Open Ticket
        </Link>
      </section>
    </>
  );
};

export default Home;
