import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackBtn from "../components/BackBtn";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  // from slicer
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  const [sa] = useState(user.name);
  const [repairOrder, setRepairOrder] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("")
  const [vehicle, setVehicle] = useState("");
  const [concern, setConcern] = useState("");
  const [status, setStatus] = useState("New");
  const [tech, setTech] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      // route /tickets
      navigate("/tickets");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createTicket({
        repairOrder,
        name,
        phone,
        vehicle,
        concern,
        status,
        tech,
      })
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackBtn url="/" />
      <section className="heading">
        <p>Create New Ticket</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Service Advisor</label>
            <input type="text" className="form-control" value={sa} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="repairOrder">Ro Number</label>
            <input
              type="text"
              className="form-control"
              value={repairOrder}
              onChange={(e) => setRepairOrder(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Customer Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
              placeholder="Format: 555-555-5555"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="vehicle">Vehicle</label>
            <input
              type="text"
              className="form-control"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="concern">Concern</label>
            <input
              type="text"
              className="form-control"
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
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
            <label htmlFor="tech">Tech</label>
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

export default NewTicket;
