import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Icon,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import imagePlaceholder from "../assets/image-placeholder.png";
import { openDialog } from "../redux/actions/dialogAction";
import { setSelected } from "../redux/actions/postAction";
import { DIALOGS } from "../utils/constants";

const ellipsis = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const useStyles = makeStyles({
  post: {
    width: 275,
    margin: 10,
  },
  actions: {
    display: "flex",
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 5,
  },
  media: {
    height: 140,
  },
  title: {
    ...ellipsis,
  },
  content: {
    width: "100%",
    ...ellipsis,
  },
});

const Post = (props) => {
  const { data } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    dispatch(setSelected(data._id));
    dispatch(openDialog(DIALOGS.DELETE_POST));
  };

  const handleClick = () => {
    dispatch(setSelected(data._id));
    dispatch(openDialog(DIALOGS.VIEW_POST));
  };

  return (
    <Card className={classes.post}>
      <CardMedia
        className={classes.media}
        image={data.image || imagePlaceholder}
      >
        <div className={classes.actions}>
          <Tooltip title="Delete Post">
            <IconButton onClick={handleDeleteClick}>
              <Icon fontSize="small">delete</Icon>
            </IconButton>
          </Tooltip>
        </div>
      </CardMedia>
      <Tooltip title="View Post">
        <CardActionArea onClick={handleClick}>
          <CardContent>
            <Typography
              variant="h5"
              align="left"
              className={classes.title}
              gutterBottom
            >
              {data.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              align="left"
              component="p"
              className={classes.content}
            >
              {data.content}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Tooltip>
    </Card>
  );
};

export default Post;
