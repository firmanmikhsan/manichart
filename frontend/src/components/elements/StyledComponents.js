import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { lightBlue } from '@material-ui/core/colors';
import {ButtonBase, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Link, Paper } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import randomColor from 'randomcolor';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    width: "100%",
  },
  img: {
    display: 'block',
    width: "60px"
  },
  card: {
    flexGrow: 1,
    margin: "15px"
  },
  cardLink: {
    textDecoration: "none"
  }
}));

export default function ItemDetailTabbar(data) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{
        backgroundColor: lightBlue[700]
      }}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="primary" variant="fullWidth">
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Characters" {...a11yProps(1)} />
          <Tab label="Staff" {...a11yProps(2)} />
          <Tab label="Stats" {...a11yProps(3)} />
          <Tab label="Socials" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div>
          <Grid container spacing={1} direction="row" justify="flex-start">
            {data.data.Media.relations.edges.map((media) => (
              <Grid container item xs={12} sm={12} md={2} lg={2} spacing={5} alignItems="strecth" style={{
                padding: "15px"
              }}>
                <Card className={classes.card}>
                  <Router>
                  <Link href={`/detail/${media.node.id}`} style={{textDecoration: 'none'}}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt={media.node.title.romaji}
                          height="90"
                          image={media.node.coverImage.extraLarge}
                          title={media.node.title.romaji}
                        />
                        <CardContent style={{
                          padding: "8px"
                        }}>
                            <p >
                              {media.node.title.romaji}
                            </p>
                          </CardContent>
                      </CardActionArea>
                    </Link>
                  </Router>
                  <CardActions disableSpacing={true}>
                    <p style={{
                      fontSize: "11px",
                      color: "#888",
                      textTransform: "lowercase",
                      margin: "0"
                    }}>
                      {media.node.source} . {removeSymbol(media.node.status)}
                    </p>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        <div>
          <Grid container spacing={1} direction="row" justify="space-between">
            <Grid container item xs={12} sm={12} md={6} lg={6} spacing={5} align="strecth" style={{
              padding: "15px"
            }}>
              <div style={{
                position: "relative",
                width: "100%",
                marginLeft: "5px",
                marginRight: "5px"
              }}>
                <Typography gutterBottom variant="h5" component="h2" style={{
                  paddingTop: "24px",
                  paddingBottom: "5px",
                  fontSize: "17px"
                }}>
                  Status Distribution
                </Typography>
              </div>
              {data.data.Media.stats.statusDistribution.map((media) => (
                <div style={{
                  marginLeft: "5px",
                  marginRight: "5px"
                }}>
                  <div style={{
                    backgroundColor: randomColor({
                      luminosity: 'dark',
                      hue: 'random'
                    }),
                    padding: "8px",
                    borderRadius: "5px",
                  }}>
                    <p style={{
                      margin: "0",
                      color: "white",
                      textTransform: "lowercase",
                      fontSize: "1rem"
                    }}>
                      {media.status}
                    </p>
                  </div>
                  <div>
                    <p style={{
                      textAlign: "center",
                      fontSize: "12px",
                      color: randomColor({
                        luminosity: 'dark',
                        hue: 'random'
                      })
                    }}>
                      {media.amount} users
                    </p>
                  </div>
                </div>
              ))}
            </Grid>
            <Grid container item xs={12} sm={12} md={6} lg={6} spacing={5} align="strecth" style={{
              padding: "15px"
            }}>
              <div style={{
                position: "relative",
                width: "100%",
                marginLeft: "5px",
                marginRight: "5px"
              }}>
                <Typography gutterBottom variant="h5" component="h2" style={{
                  paddingTop: "24px",
                  paddingBottom: "5px",
                  fontSize: "17px"
                }}>
                  Score Distribution
                </Typography>
              </div>
              {data.data.Media.stats.scoreDistribution.map((media) => (
                <div style={{
                  marginLeft: "5px",
                  marginRight: "5px"
                }}>
                  <div style={{
                    backgroundColor: randomColor({
                      luminosity: 'dark',
                      hue: 'random'
                    }),
                    padding: "8px",
                    borderRadius: "5px",
                  }}>
                    <p style={{
                      margin: "0",
                      color: "white",
                      textTransform: "lowercase",
                      fontSize: "1rem"
                    }}>
                      {media.score}
                    </p>
                  </div>
                  <div>
                    <p style={{
                      textAlign: "center",
                      fontSize: "12px",
                      color: randomColor({
                        luminosity: 'dark',
                        hue: 'random'
                      })
                    }}>
                      {media.amount}
                    </p>
                  </div>
                </div>
              ))}
            </Grid>
          </Grid>
        </div>
        <div>
          <Typography gutterBottom variant="h5" component="h2" style={{
            paddingTop: "24px",
            paddingBottom: "5px",
            fontSize: "17px"
          }}>
            Trailer
          </Typography>
          <Grid container spacing={1} direction="row" justify="space-between">
            <Grid container item xs={12} sm={12} md={6} lg={6} spacing={5} align="strecth" style={{
                padding: "15px"
              }}>
                <YoutubeEmbed embedID={data.data.Media.trailer.id}></YoutubeEmbed>
            </Grid>
          </Grid>
        </div>
        <div>
          <Typography gutterBottom variant="h5" component="h2" style={{
            paddingTop: "24px",
            paddingBottom: "5px",
            fontSize: "17px"
          }}>
            Recommendation
          </Typography>
          <Grid container spacing={1} direction="row" justify="flex-start">
            {data.data.Media.recommendations.edges.map((media) => (
              <Grid container item xs={12} sm={12} md={2} lg={2} spacing={5} alignItems="strecth" style={{
                padding: "15px"
              }}>
                <Card className={classes.card}>
                  <Router>
                  <Link href={`/detail/${media.node.mediaRecommendation.id}`} style={{textDecoration: 'none'}}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt={media.node.mediaRecommendation.title.romaji}
                          height="150"
                          image={media.node.mediaRecommendation.coverImage.extraLarge}
                          title={media.node.mediaRecommendation.title.romaji}
                        />
                        <CardContent tyle={{
                          padding: "8px"
                        }}>
                            <p >
                              {media.node.mediaRecommendation.title.romaji}
                            </p>
                          </CardContent>
                      </CardActionArea>
                    </Link>
                  </Router>
                  <CardActions disableSpacing>
                    <p style={{
                      fontSize: "11px",
                      color: "#888",
                      textTransform: "lowercase",
                      margin: "0"
                    }}>
                      {media.node.mediaRecommendation.source} . {removeSymbol(media.node.mediaRecommendation.status)}
                    </p>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={1} direction="row" justify="space-between">
          {data.data.Media.characters.edges.map((media) => (
            <Grid container item spacing={5} xs={12} sm={12} md={4} lg={4} alignItems="strecth" style={{
              padding: "15px"
            }}>
              <div className={classes.paper}>
              <Paper className={classes.paper}>
                <Grid container spacing={2} justify="space-between">
                  <Grid container item lg={6}>
                    <Grid item lg={4}>
                      <ButtonBase style={{
                        display: "block"
                      }}>
                        <img className={classes.img} alt="complex" src={media.node.image.medium} />
                      </ButtonBase>
                    </Grid>
                    <Grid item lg={8} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="subtitle1" style={{
                            fontSize: "12px"
                          }}>
                          {media.node.name.full}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" style={{
                            fontSize: "10px"
                          }}>
                          {media.node.name.native}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2" style={{ 
                            cursor: 'pointer',
                            fontSize: "10px"
                          }}>
                          {media.role}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container item lg={6}>
                    <Grid item lg={8} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="subtitle1" style={{
                            fontSize: "12px",
                            textAlign: "right"
                          }}>
                          {media.voiceActors[0].name.full}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" style={{
                            fontSize: "10px",
                            textAlign: "right"
                          }}>
                          {media.voiceActors[0].name.native}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2" style={{ 
                            cursor: 'pointer',
                            fontSize: "10px",
                            textAlign: "right"
                          }}>
                          Japanese
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={4}>
                      <ButtonBase style={{
                        display: "block"
                      }}>
                        <img className={classes.img} alt="complex" src={media.voiceActors[0].image.medium} />
                      </ButtonBase>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
              </div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Staff
      </TabPanel>
      <TabPanel value={value} index={3}>
        Stats
      </TabPanel>
      <TabPanel value={value} index={4}>
        Social
      </TabPanel>
    </div>
  );
}

function removeSymbol(str) {
  var i, frags = str.split('_');
  for (i=0; i<frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
}

export const YoutubeEmbed = ({embedID}) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedID}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedID: PropTypes.string.isRequired
}