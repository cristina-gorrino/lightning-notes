import React, { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <section>
      <div>
        <h2>Login</h2>
        <form>
          <input
            type="email"
            name="email"
            id="login-email"
            placeholder="Email"
            required
            value={user.email}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            required
            value={user.password}
            autoComplete="true"
          />
          <button type="submit">login</button>
          <p>
            You don't have an account?
            <span>Sing Up here</span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
