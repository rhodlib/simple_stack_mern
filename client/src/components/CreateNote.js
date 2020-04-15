//Imports
import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";

//CreateNote component
export const CreateNote = () => {
    const [users, setUsers] = useState([]);
    const [formContent, setFormContent] = useState({username: "", title: "", content: ""});
    const [formDate, setFormDate] = useState(new Date());
    let history = useHistory();

    useEffect(() => {
      getUsers();
    }, []);
  
    const getUsers = async () => {
      const res = await axios.get("http://localhost:4000/api/users");
      setUsers(res.data.map(user => user.username));
      setFormContent({username: res.data[0].username});
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const newNote = {
            title: formContent.title,
            content: formContent.content,
            date: formDate,
            author: formContent.username
        };
        await axios.post("http://localhost:4000/api/notes", newNote);
        history.push("/");
    }

    const onInputChange = event => {
        setFormContent({...formContent, [event.target.name]: event.target.value});
    }

    const onChangeDate = date => {
        setFormDate(date);
    }

    return(
        <div className="col-md-6 offset-md-3">
            <div className="card card-body">
                <h4>Create Note</h4>
                {/** SELECT USER */}
                <div className="form-group">
                    <select className="form-control" name="username" onChange={onInputChange}>
                        { users.map(user => <option key={user} >{user}</option>) }
                    </select>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Title" name="title" required onChange={onInputChange}/>
                </div>
                <div className="form-group">
                    <textarea className="form-control" placeholder="Content" name="content" required onChange={onInputChange}></textarea>
                </div>
                <div className="form-group">
                    <DatePicker className="form-control" selected={formDate} onChange={onChangeDate}/>
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