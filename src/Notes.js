import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteNote } from "./store";

const Notes = ({ userNotes, auth, deleteNote }) => {
  return (
    <div>
      <Link to="/home">Home</Link>
      <h1>
        {auth.username.slice(0, 1).toUpperCase()}
        {auth.username.slice(1)}'s Notes
      </h1>
      <ol>
        {userNotes.map((note) => {
          return (
            <div key={note.id}>
              <li>{note.note}</li>
              <button onClick={() => deleteNote(note)}>X</button>
            </div>
          );
        })}
      </ol>
      <button>
        <Link to="/create">Add a New Note</Link>
      </button>
    </div>
  );
};

const mapState = ({ notes, auth }) => {
  const userNotes = notes.filter((note) => note.userId === auth.id);
  return { userNotes, auth };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    deleteNote: (note) => dispatch(deleteNote(note, history)),
  };
};
export default connect(mapState, mapDispatch)(Notes);
