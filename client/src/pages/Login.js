// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useMutation } from "@apollo/client";
// import { LOGIN_USER } from "../utils/mutations";

// import Auth from "../utils/auth";

// const Login = (props) => {
//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//   });

//   const [login, { error, data }] = useMutation(LOGIN_USER);

//   const onChangeInput = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     console.log(user);
//     try {
//       const { data } = await login({
//         variables: { ...user },
//       });

//       Auth.login(data.login.token);
//     } catch (err) {
//       console.error(err);
//     }

//     setUser({
//       email: "",
//       password: "",
//     });
//   };

//   return (
//     <main>
//       <section>
//         <div className="login">
//           <h2>Login</h2>
//           {data ? (
//             <p>
//               Success! You may now head{" "}
//               <Link to="/">back to the homepage.</Link>
//             </p>
//           ) : (
//             <form onSubmit={handleFormSubmit}>
//               <input
//                 type="email"
//                 name="email"
//                 id="login-email"
//                 placeholder="Email"
//                 required
//                 value={user.email}
//                 onChange={onChangeInput}
//               />
//               <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 placeholder="password"
//                 required
//                 value={user.password}
//                 onChange={onChangeInput}
//               />
//               <button type="submit">login</button>
//               <p>
//                 You don't have an account?
//                 <span>Sing Up here</span>
//               </p>
//             </form>
//           )}

//           {error && (
//             <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FlashOnIcon from '@material-ui/icons/FlashOn';

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // eslint-disable-next-line no-unused-vars
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


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Lightning Notes
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: { 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    marginTop: '25px'
  }
}));

// function SignIn() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <h1 className={classes.title}><FlashOnIcon />Lightning Notes<FlashOnIcon /></h1>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleFormSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            name="email"
            id="login-email"
            label="Email Address"
            autoComplete="email"
            value={user.email}
            onChange={onChangeInput}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={user.password}
            onChange={onChangeInput}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;
