import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [login, { error, data }] = useMutation(LOGIN_USER);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const { data } = await login({
        variables: { ...user },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }

    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <main>
      <section>
        <div className="login">
          <h2>Login</h2>
          {data ? (
            <p>
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <input
                type="email"
                name="email"
                id="login-email"
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
                onChange={onChangeInput}
              />
              <button type="submit">login</button>
              <p>
                You don't have an account?
                <span>Sing Up here</span>
              </p>
            </form>
          )}

          {error && (
            <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Login;
