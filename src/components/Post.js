import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Icon,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core';
import React from 'react';
import imagePlaceholder from '../assets/image-placeholder.png';

const useStyles = makeStyles({
  post: {
    width: 275,
    margin: 10,
    borderWidth: 0,
  },
  cardHeaderRoot: {
    justifyContent: "space-between",
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
    onDelete,
  } = props;
  const classes = useStyles();

  return (
    <Card
      className={classes.post}
      variant="outlined"
    >
      <CardHeader
        action={
          <IconButton onClick={() => onDelete(data._id)}>
            <Icon>delete</Icon>
          </IconButton>
        }
        className={classes.cardHeaderRoot}
        subheader="September 14, 2016"
      />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={data.image || imagePlaceholder}
          title="Contemplative Reptile"
        />
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
