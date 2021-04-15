
import React from "react";
import {BrowserRouter as Router, useParams } from 'react-router-dom';

//import apoloclient
import { gql, useQuery } from '@apollo/client';
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, LinearProgress, Link, makeStyles, Typography } from "@material-ui/core";

const getPopularShow = gql`
  query ($season: MediaSeason!) {
    Page {
        media(season: $season, seasonYear: 2021, format: TV, sort: POPULARITY_DESC) {
          id
          description
          title {
            romaji
            english
            native
            userPreferred
          }
          coverImage {
            extraLarge
            large
            medium
            color
          }
        }
      }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    margin: "15px"
  },
  cardLink: {
    textDecoration: "none"
  }
}));

function Home() {
    let {id} = useParams()
    const classes = useStyles();
    const { loading, error, data } = useQuery(getPopularShow, {
        variables: { 
            season: id.toUpperCase()
         },
      });

    if (loading) {
      return (
        <LinearProgress color="secondary" />
      )
    }
    if (error) return `Error! ${error.message}`;
    return (
        <div className={classes.root}>
          <h2>{id}</h2>
            <Grid container spacing={1} direction="row" justify="space-evenly">
              {data.Page.media.map((media) => (
                <Grid container item xs={12} sm={12} md={6} lg={3} spacing={5} alignItems="strecth" style={{
                  paddingTop: "15px",
                  paddingBottom: "15px"
                }}>
                  <Card className={classes.card}>
                    <Router>
                      <Link href={`/detail/${media.id}`} style={{textDecoration: 'none'}}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            alt={media.title.romaji}
                            height="280"
                            image={media.coverImage.extraLarge}
                            title={media.title.romaji}
                          />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {media.title.romaji}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            <div dangerouslySetInnerHTML={{
                              __html: media.description
                            }}></div>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      </Link>
                    </Router>
                    <CardActions>
                      <Router>
                        <Link href={`/detail/${media.id}`}>
                          <Button size="small" color="primary">
                            Learn More
                          </Button>
                        </Link>
                      </Router>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
        </div>
    )
}

export default Home;