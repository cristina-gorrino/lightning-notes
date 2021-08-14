import React, { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState("");

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  return (
    <section>
      <div className="login">
        <h2>Login</h2>
        <form>
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
            autoComplete="true"
            onChange={onChangeInput}
          />
          <button type="submit">login</button>
          <p>
            You don't have an account?
            <span>Sing Up here</span>
          </p>
          <h3>{err}</h3>
        </form>
      </div>
      <div className="sign-up">
        <h2>Register</h2>
        <form onSubmit={registerSubmit}>
          <input
            type="text"
            name="name"
            id="sign-up-email"
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
          <p>
            You have an account?
            <span>Login here</span>
          </p>
          <h3>{err}</h3>
        </form>
      </div>
    </section>
  );
};

export default Login;
