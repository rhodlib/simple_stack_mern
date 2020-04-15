//Imports
import React, { useEffect, useState } from "react";
import axios from "axios";

//CreateUser component
export const CreateUser = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUsers() {
      const res = await axios.get("http://localhost:4000/api/users");
      setUsers(res.data);
    }

    getUsers();
  }, []);

  const onChangeUsername = event => {
      setUser({ username: event.target.value });
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card card-body">
          <h3>Create new user</h3>
          <form>
            <div className="from-group">
              <input
                type="text"
                className="form-control"
                onChange={onChangeUsername}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="col-md-8">
        <ul className="list-group">
          {users.map((user) => (
            <li
              className="list-group-item list-group-item-action"
              key={user._id}
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
