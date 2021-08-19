// import React from "react";

// import NoteForm from "../components/Notes";

// const Home = () => {
//   return (
//     <main>
      
//         <div>
//           <NoteForm />
//           <div>note form goes here</div>
//         </div>
      
//     </main>
//   );
// };

// export default Home;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: '#33FF3F',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Category Name
        </Typography>
      </CardContent>
    </Card>
  );
}