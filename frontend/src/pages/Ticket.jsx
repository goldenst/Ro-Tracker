import React, { useEffect, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, closeTicket } from "../features/tickets/ticketSlice";
import { getNotes, createNote, reset as noteReset } from "../features/notes/noteSlice";
import BackBtn from "../components/BackBtn";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { FaPlus, FaEdit } from "react-icons/fa";


// custom modal styles
const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    treansform: "translate(-50%, -50%)",
    postion: "relitive",
  },
};

Modal.setAppElement("#root");

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  // get state from tickets
  const { ticket,  isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );
  // get user state
  const { user  } = useSelector(
    (state) => state.auth
  );
  // get State from notes
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  // Close Ticket

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed");
    navigate("/");
   
  };

  // create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({noteText, ticketId}))
    closeModal()
  };

  // Update Tickiet
  const onUpdateTicket = () => {
    
    navigate(`/edit-ticket/${ticket._id}1`)
    console.log('update clicked')
  }

  // open / close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    <h3>Something went Wrong</h3>;
  }

  // 

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackBtn url="/tickets" />
        <h2>
          Repair Order: {ticket.repairOrder}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span> 

          {/*  ********************update Button ************************    */}
          {/* <button onClick={onUpdateTicket} className="btn btn-reverse"><FaEdit />Edit</button> */}
        </h2>
        <h3>
          Customer: {ticket.name} 
        </h3>
        <h3>Phone: {ticket.phone}</h3>
       <div>Date: {new Date(ticket.createdAt).toLocaleString('en-us')}</div>
        <hr></hr>
        <div className="ticket-headings">
          <div>Vehicle: {ticket.vehicle}</div>
          <div>Tech: {ticket.tech}</div>
          <div>Servicce Advisor: {ticket.name}</div>
          
        </div>
        <div className="ticket-desc">
          <h3>Concern</h3>
          <p>{ticket.concern}</p>
        </div>
        <h2>Notes:</h2>
      </header>

      {ticket.status !== "closed" && (
        <button onClick={openModal} className="btn">
          {" "}
          <FaPlus />
          Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note Text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button type="submit" className="btn">
              Submit{" "}
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
           Delete Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
