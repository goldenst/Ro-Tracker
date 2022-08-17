import React from "react";
import { useSelector } from "react-redux";

function NoteItem({note}) {
  const {user} = useSelector((state) => state.auth)
  
 
  
  return (
  <div className="note">
    <h4>Note From: {user.name}</h4>
    <p>{note.text}</p>
    <div className="note-date" >
      {new Date(note.createdAt).toLocaleString('en-us')}
    </div>
  </div>
    
  )
}

export default NoteItem;
