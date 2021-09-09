import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Icon,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import imagePlaceholder from '../assets/image-placeholder.png';
import { openDialog } from '../redux/actions/dialogAction';
import { setSelected } from '../redux/actions/postAction';
import { DIALOGS } from '../utils/constants';

const useStyles = makeStyles({
  post: {
    width: 275,
    margin: 10,
  },
  actions: {
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5,
  },
  media: {
    height: 140
  },
  content: {
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }
});

const Post = (props) => {
  const {
    data,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    dispatch(setSelected(data._id));
    dispatch(openDialog(DIALOGS.DELETE_POST));
  }

  return (
    <Card
      className={classes.post}
    >
      <CardMedia
        className={classes.media}
        image={data.image || imagePlaceholder}
      >
        <div className={classes.actions}>
          <IconButton onClick={handleDeleteClick}>
            <Icon fontSize="small">delete</Icon>
          </IconButton>
        </div>
      </CardMedia>
      <CardActionArea onClick={() => console.log("View Post")}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            align="left"
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
    </Card>
  );
}

export default Post;
