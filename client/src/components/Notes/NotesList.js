import Note from "./Note";
import IconButton from "@material-ui/core/IconButton";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Button from "@material-ui/core/Button";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { NOTES_BY_CATEGORY, QUERY_SINGLE_CATEGORY } from "../../utils/queries";
import Auth from "../../utils/auth";
import { Container } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const NotesList = () => {
  const { categoryId } = useParams();
  const noteAuthor = Auth.getProfile().data.username

  const categoryQuery = useQuery(QUERY_SINGLE_CATEGORY, {
    variables: { categoryId },
  });
  const { loading, data } = useQuery(NOTES_BY_CATEGORY, {
    variables: { noteAuthor: noteAuthor, categoryId: categoryId },
  });
  const notes = data?.notesCat || [];
  const category = categoryQuery.data?.category || [];
console.log(notes)
  return (
    <div className="create-note">
      {Auth.loggedIn() ? (
        <Container
          style={{
            height: "100%",
            display: "flex",
            flexWrap: "wrap",
            margin: "20px",
          }}
        >
          <div className="notes-list">
            {categoryQuery.loading ? (
              <div>Loading...</div>
            ) : (
              <div>
                <h1 >Category: {category.name}</h1>
              </div>
            )}
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {notes.map((note) => (
                  <Note
                    key={note._id}
                    id={note._id}
                    title={note.title}
                    text={note.text}
                    createdAt={note.createdAt}
                  />
                ))}
              </div>
            )}
            <Link to="/">
              <IconButton
                aria-label="Return to Dashboard"
                style={{ marginLeft: "100px" }}
              >
                <DashboardIcon />
                <p style={{ marginLeft: "10px" }}>Go Back to Dashboard</p>
              </IconButton>
            </Link>
            <Link to={{ pathname: "/create-note", hash: `${categoryId}` }}>
              <IconButton
                aria-label="Add new Note"
                style={{ marginLeft: "100px" }}
              >
                <AddCircleOutlineIcon />
                <p style={{ marginLeft: "10px" }}>Create a new Note</p>
              </IconButton>
            </Link>
          </div>
        </Container>
      ) : (
        <p>
          You need to be logged in to use lightning notes. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default NotesList;
