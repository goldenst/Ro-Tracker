import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  updateTicket,
  getTicket,
  reset,
} from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackBtn from "../components/BackBtn";
import Ticket from "./Ticket";

function EditTicket() {
  // get state from tickets
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );
  // get user state
  const { user } = useSelector((state) => state.auth);

  const { ticketId } = useParams();

  const [sa] = useState(user.name);
  const [repairOrder] = useState(ticket.repairOrder);
  const [name] = useState(ticket.name);
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [concern, setConcern] = useState("");
  const [status, setStatus] = useState("New");
  const [tech, setTech] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get ticket
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      // route /tickets
     // navigate("/tickets/");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateTicket({
        vehicle,
        concern,
        status,
        tech,
      })
    )
    navigate("/tickets/");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackBtn url="/" />
      <section className="heading">
        <p>Edit Ticket</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <h3 htmlFor="name">Service Advisor: {sa}</h3>
          </div>
          <div className="form-group">
            <h3 htmlFor="name">Ro Number: {repairOrder}</h3>
          </div>
          <div className="form-group">
            <h3 htmlFor="name">Customer: {name}</h3>
          </div>

          <div className="form-group">
            <label htmlFor="vehicle">Vehicle:</label>
            <input
              type="text"
              className="form-control"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="concern">Concerns:</label>
            <input
              type="text"
              className="form-control"
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              name="status"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="New">New</option>
              <option value="NTA">Need to Assign</option>
              <option value="IP">In progress</option>
              <option value="WOA">Waiting for Approval</option>
              <option value="WOP">Waiting on Parts</option>
              <option value="PARTS Here">All Parts Here</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="tech">Tech:</label>
            <input
              type="text"
              className="form-control"
              value={tech}
              onChange={(e) => setTech(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default EditTicket;
