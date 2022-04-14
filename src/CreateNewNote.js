import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewNote } from "./store";

class CreateNewNote extends Component {
  constructor(props) {
    super(props);
    const { loggedInUserId } = this.props;
    this.state = {
      note: "",
      userId: loggedInUserId,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.createNewNote({ ...this.state });
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  render() {
    const { handleChange, handleSubmit } = this;
    return (
      <form id="new-note" onSubmit={handleSubmit}>
        <label name="note content">New Note</label>
        <input name="note" value={this.state.note} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapState = ({ auth }) => {
  const loggedInUserId = auth.id;
  return { loggedInUserId };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    createNewNote: (newNote) => dispatch(createNewNote(newNote, history)),
  };
};

export default connect(mapState, mapDispatch)(CreateNewNote);
