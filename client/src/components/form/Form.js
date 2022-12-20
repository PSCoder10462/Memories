import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles.js";
import { unsetId } from "../../actions/editId.js";

const Form = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const editId = useSelector((state) => state.editId);
  const { posts } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.auth);
  const [postData, setPostData] = useState({
    message: "",
    selectedFile: "",
    tags: [],
    title: "",
  });

  useEffect(() => {
    if (editId) {
      const editPost = posts?.find((post) => post._id === editId);
      setPostData(editPost);
    }
  }, [posts, editId]);

  const clear = () => {
    if (editId) dispatch(unsetId());
    setPostData({
      message: "",
      selectedFile: "",
      tags: [],
      title: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (postData.message.length <= 0 || postData.title.length <= 0) {
      window.alert("Please fill in message and title");
      return;
    }

    let lowerCaseInputTags = [];
    if (postData.tags.length) {
      const inputTags = postData.tags.filter((tag) => tag.trim().length);
      lowerCaseInputTags = inputTags
        ? inputTags.map((tag) => tag.trim().toLowerCase())
        : [];
      // const post = postData;
    }

    if (!editId)
      dispatch(
        createPost({
          ...postData,
          tags: lowerCaseInputTags,
          creatorName: user.userProfile.name,
        })
      );
    else
      dispatch(updatePost(editId, { ...postData, tags: lowerCaseInputTags }));
    clear();
  };

  const handleChange = (e) => {
    if (e.target.name === "tags")
      setPostData({ ...postData, [e.target.name]: e.target.value?.split(",") });
    else setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  if (!user) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please sign in to create and like memories!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {editId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          required
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={handleChange}
        />
        <TextField
          required
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          value={postData.message}
          onChange={handleChange}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags <tag1,tag2,tag3...>"
          fullWidth
          value={postData.tags}
          onChange={handleChange}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({
                ...postData,
                selectedFile: base64,
              })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={clear}
        >
          {editId ? "Cancel" : "Clear"}
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
