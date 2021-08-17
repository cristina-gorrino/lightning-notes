// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// import { useMutation } from "@apollo/client";
// import { ADD_USER } from "../utils/mutations";

// import Auth from "../utils/auth";

// const Signup = () => {
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [addUser, { error, data }] = useMutation(ADD_USER);

//   const onChangeInput = (e) => {
//     const { name, value } = e.target;

//     setUser({
//       ...user,
//       [name]: value,
//     });
//   };

//   const registerSubmit = async (e) => {
//     e.preventDefault();
//     console.log(user);

//     try {
//       const { data } = await addUser({
//         variables: { ...user },
//       });

//       Auth.login(data.addUser.token);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <main>
//       <section>
//         <div className="sign-up">
//           <h2>Register</h2>
//           {data ? (
//             <p>
//               Success! You may now head{" "}
//               <Link to="/">back to the homepage.</Link>
//             </p>
//           ) : (
//             <form onSubmit={registerSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="User Name"
//                 required
//                 value={user.name}
//                 onChange={onChangeInput}
//               />
//               <input
//                 type="email"
//                 name="email"
//                 id="sign-up-email"
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
//                 autoComplete="true"
//                 onChange={onChangeInput}
//               />
//               <button type="submit">Sign Up</button>
//             </form>
//           )}

//           {error && <div className="error">{error.message}</div>}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Signup;


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

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  // eslint-disable-next-line no-unused-vars
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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        LightningNotes
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// export default function SignUp() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={registerSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="User Name"
                value={user.name}
                onChange={onChangeInput}
                autoFocus
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="email"
                required
                fullWidth
                id="sign-up-email"
                label="Email Address"
                name="email"
                value={user.email}
                onChange={onChangeInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={user.password}
                onChange={onChangeInput}
                autoComplete="true"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default Signup;