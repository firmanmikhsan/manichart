import { AppBar, fade, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { cyan, lightBlue } from '@material-ui/core/colors';
import 'fontsource-roboto'
import { NavLink } from 'react-router-dom';
import AsyncAutoComplete from './AsyncAutoComplete';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      '& > * + *': {
        marginLeft: theme.spacing(2),
      }
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
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
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    typoLink: {
      flexGrow: 1,
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5)
    },
    link: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        textDecoration: "none",
        color: fade(theme.palette.common.white, 0.6),
        display: "inline-block",
        textAlign: "center"
    },
    linkActive: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      textDecoration: "none",
      display: "inline-block",
      textAlign: "center",
      color: cyan[800],
    },
    linkDiv: {
      fontSize: "16px",
      display: "block"
    },
    linkDivSmall: {
      fontSize: "12px",
      display: "block"
    }
  }));
  const linkActiveStyle = {
    textDecoration: "none",
    display: "inline-block",
    textAlign: "center",
    color: "#fff",
  }

export default function SearchAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: `${lightBlue[700]}` }}>
        <Toolbar>
          <Grid container direction="row" justify="space-between" alignItems="center">
              <Typography className={classes.title} variant="h6" noWrap>
                  ManAniChart
              </Typography>
              <Typography className={classes.typoLink} align="left">
                  <NavLink to="/spring" activeStyle={linkActiveStyle} className={classes.link}>
                      <div className={classes.linkDiv}>
                        Spring
                      </div>
                      <div className={classes.linkDivSmall}>
                        {new Date().getFullYear()}
                      </div>
                  </NavLink>
                  <NavLink to="/summer" activeStyle={linkActiveStyle} className={classes.link}>
                      <div className={classes.linkDiv}>
                        Summer
                      </div>
                      <div className={classes.linkDivSmall}>
                        {new Date().getFullYear()}
                      </div>
                  </NavLink>
                  <NavLink to="/fall" activeStyle={linkActiveStyle} className={classes.link}>
                      <div className={classes.linkDiv}>
                        Fall
                      </div>
                      <div className={classes.linkDivSmall}>
                        {new Date().getFullYear()}
                      </div>
                  </NavLink>
                  <NavLink to="/winter" activeStyle={linkActiveStyle} className={classes.link}>
                      <div className={classes.linkDiv}>
                        Winter
                      </div>
                      <div className={classes.linkDivSmall}>
                        {new Date().getFullYear()}
                      </div>
                  </NavLink>
              </Typography>
              <div className={classes.search}>
                  <AsyncAutoComplete classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }} ></AsyncAutoComplete>
              </div>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}