import {
  alpha,
  Button,
  Icon,
  InputBase,
  makeStyles
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setKeyword, shouldUpdateList } from "../redux/actions/postAction";

const useStyles = makeStyles(theme => ({
  keywordSearch: {
    display: "flex"
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: 5,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 250,
      border: "1px solid #d7d7d7",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const KeywordSearch = () => {
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(setKeyword(search));
    dispatch(shouldUpdateList(true));
  }

  return (
    <div className={classes.keywordSearch}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <Icon>search</Icon>
        </div>
        <InputBase
          placeholder="Keyword…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Button
        color="primary"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default KeywordSearch;
