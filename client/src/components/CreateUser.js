//Imports
import React, { useEffect, useState } from "react";
import axios from "axios";

//CreateUser component
export const CreateUser = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await axios.get("http://localhost:4000/api/users");
    setUsers(res.data);
  };

  const onChangeUsername = (event) => {
    setUser(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:4000/api/users", {
      username: user,
    });
    setUser("");
    getUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:4000/api/users/${id}`);
    getUsers();
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card card-body">
          <h3>Create new user</h3>
          <form onSubmit={onSubmit}>
            <div className="from-group">
              <input
                type="text"
                className="form-control"
                onChange={onChangeUsername}
                value={user}
              />
            </div>
            <button type="submit" className="btn btn-secondary mt-2">
              Save
            </button>
          </form>
        </div>
      </div>
      <div className="col-md-8">
        <ul className="list-group">
          {users.map((user) => (
            <li
              className="list-group-item list-group-item-action"
              key={user._id}
              onDoubleClick={() => deleteUser(user._id)}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

//Export
export default CreateUser;
