import {
  Dialog,
  DialogContent,
  Icon,
  IconButton,
  makeStyles,
  Tooltip,
  Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URI } from "../../utils/constants";
import imagePlaceholder from "../../assets/image-placeholder.png";
import Moment from "react-moment";

const useStyles = makeStyles({
  action: {
    padding: "8px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #d7d7d6",
  },
  image: {},
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px 0",
    "& $image": {
      width: 500,
      height: 250,
      objectFit: "cover",
      borderRadius: 6,
      backgroundColor: "#d7d7d6",
    }
  },
  date: {
    color: "#868686",
    fontStyle: "italic",
  }
});

const ViewPostDialog = (props) => {
  const {
    onClose,
    open
  } = props;
  const selectedId = useSelector(state => state.post.selectedId);
  const [post, setPost] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    if(open) {
      getPost();
    } else {
      setPost(null);
    }
  // eslint-disable-next-line
  }, [open]);

  const getPost = () => {
    fetch(`${BASE_URI}/post/${selectedId}`)
      .then(res => res.json())
      .then(res => {
        setPost(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
    >
      <div className={classes.action}>
        <Tooltip title="Go Back">
          <IconButton onClick={onClose}>
            <Icon fontSize="small">arrow_back</Icon>
          </IconButton>
        </Tooltip>
        <Typography className={classes.date}>
          <Moment date={post?.dateCreated} format="MMM DD, YYYY hh:mm a"/>
        </Typography>
      </div>
      <DialogContent>
        <div className={classes.post}>
          <Typography variant="h3">
            {post?.title}
          </Typography>
          <div className={classes.imageContainer}>
            <img
              className={classes.image}
              src={post?.image || (post && imagePlaceholder)}
              alt="Post"
            />
          </div>
          <hr />
          <Typography variant="body">
            {post?.content}
          </Typography>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewPostDialog;