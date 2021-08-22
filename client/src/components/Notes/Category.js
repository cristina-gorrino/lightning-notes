import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';


export default function Category(props) {

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      backgroundColor: "#33FF3F",
      ...props.bgColor
    },
    // title: {
    //   fontSize: '20px',
    // },
    // pos: {
    //   marginBottom: 5,
    // },
  });

  const classes = useStyles();

  return (
    <Container style={{ width: '100%', display: 'block'}}>
    <Card className={classes.root} style={{marginBottom: '10px'}}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.name}
        </Typography>
      </CardContent>
    </Card>
    </Container>
    
  );
}
