//Imports
import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory, useParams } from "react-router-dom";

//CreateNote component
export const CreateNote = () => {
  const [users, setUsers] = useState([]);
  const [formContent, setFormContent] = useState({
    username: "",
    title: "",
    content: "",
  });
  const [editing, setEditing] = useState(false);
  const [formDate, setFormDate] = useState(new Date());

  let history = useHistory();
  let { id } = useParams();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const res = await axios.get("http://localhost:4000/api/users");
    setUsers(res.data.map((user) => user.username));
    setFormContent({ username: res.data[0].username });
    if (id) {
      const res = await axios.get(`http://localhost:4000/api/notes/${id}`);
      console.log(res);
      setFormContent({
        username: res.data.author,
        title: res.data.title,
        content: res.data.content,
      });
      setFormDate(new Date(res.data.date));
      setEditing(true);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const newNote = {
      title: formContent.title,
      content: formContent.content,
      date: formDate,
      author: formContent.username,
    };

    console.log(newNote);
    if (editing) {
      await axios.put(`http://localhost:4000/api/notes/${id}`, newNote);
    } else {
      await axios.post("http://localhost:4000/api/notes", newNote);
    }
    history.push("/");
  };

  const onInputChange = (event) => {
    setFormContent({ ...formContent, [event.target.name]: event.target.value });
  };

  const onChangeDate = (date) => {
    setFormDate(date);
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <h4>Create Note</h4>
        {/** SELECT USER */}
        <div className="form-group">
          <select
            className="form-control"
            name="username"
            onChange={onInputChange}
            value={formContent.username}
          >
            {users.map((user) => (
              <option key={user}>{user}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
            required
            onChange={onInputChange}
            value={formContent.title}
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Content"
            name="content"
            required
            onChange={onInputChange}
            value={formContent.content}
          ></textarea>
        </div>
        <div className="form-group">
          <DatePicker
            className="form-control"
            selected={formDate}
            onChange={onChangeDate}
          />
        </div>
        <form onSubmit={onSubmit}>
          <button type="submit" className="btn btn-secondary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

//Export
export default CreateNote;
