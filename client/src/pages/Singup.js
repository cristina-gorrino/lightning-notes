import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const { data } = await addUser({
        variables: { ...user },
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <section>
        <div className="sign-up">
          <h2>Register</h2>
          {data ? (
            <p>
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={registerSubmit}>
              <input
                type="text"
                name="name"
                placeholder="User Name"
                required
                value={user.name}
                onChange={onChangeInput}
              />
              <input
                type="email"
                name="email"
                id="sign-up-email"
                placeholder="Email"
                required
                value={user.email}
                onChange={onChangeInput}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                required
                value={user.password}
                autoComplete="true"
                onChange={onChangeInput}
              />
              <button type="submit">Sign Up</button>
            </form>
          )}

          {error && <div className="error">{error.message}</div>}
        </div>
      </section>
    </main>
  );
};

export default Signup;
