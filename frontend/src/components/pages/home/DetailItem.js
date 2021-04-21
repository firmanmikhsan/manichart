
import { gql, useQuery } from "@apollo/client";
import { Grid, LinearProgress, makeStyles } from "@material-ui/core";
import { lightBlue } from "@material-ui/core/colors";
import randomColor from "randomcolor";
import React from "react";
import { useParams } from "react-router";
import ItemDetailTabbar from "../../elements/StyledComponents";

export const getDetail = gql`
    query($id: Int!) {
        Media(id: $id) {
            id
            rankings {
                id
                rank
                type
                format
                season
                allTime
                context
                year
            }
            stats {
                scoreDistribution {
                    score
                    amount
                }
                statusDistribution {
                    status
                    amount
                }
            }
            trailer {
                id
                site
                thumbnail
            }
            recommendations {
                edges {
                    node {
                    mediaRecommendation {
                        id
                        source
                        status
                        coverImage {
                            extraLarge
                            large
                            medium
                            color
                        }
                        title {
                            romaji
                            english
                            native
                            userPreferred
                            }
                        }
                    }
                }
            }
            relations {
                edges {
                    node {
                        id
                        source
                        status
                        coverImage {
                            extraLarge
                            large
                            medium
                            color
                        }
                        title {
                            romaji
                            english
                            native
                            userPreferred
                        }
                    }
                }
            }
            characters {
                edges {
                    role
                    node {
                        name {
                            full
                            native
                        }
                        image {
                            medium
                            large
                        }
                    }
                    voiceActors(language: JAPANESE) {
                        name {
                            full
                            native
                        }
                        image {
                            medium
                            large
                        }
                    }
                }
            }
            staff {
                edges {
                    role
                    node {
                        name {
                            first
                            last
                            full
                            native
                        }
                        image {
                            large
                            medium
                        }
                    }
                }
            }
            description
            title {
                romaji
                english
                native
                userPreferred
            }
            bannerImage
            coverImage {
                extraLarge
                large
                medium
                color
            }
            episodes
            duration
            type
            format
            status
            genres
            synonyms
            meanScore
            averageScore
            status
            startDate {
                year
                month
                day
            }
            season
            seasonYear
            popularity
            source
            favourites
            studios {
                nodes {
                    name
                }
            }
        }
    }
`;

export var id;

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },
    detailContainer: {
        zIndex: 100,
        marginRight: "65px",
        marginLeft: "65px"
    },
    coverImage: {
        maxWidth: "155px",
        width: "100%",
        objectFit: "cover",
    },
    titleText: {
        color: lightBlue[700],
        fontSize: "22px",
        fontWeight: "bold",
        marginBottom: "0px"
    },
    descriptionText: {
        color: lightBlue[900],
        fontSize: "12px",
        fontWeight: "normal",
        fontStyle: "italic"
    }, infoBox: {
        margin: theme.spacing(1, 'auto'),
        padding: theme.spacing(1, 'auto')
    },infoTitle: {
        margin: 0,
        fontSize: "12px",
        fontWeight: "bold",
    }, infoSubTitle: {
        marginTop: "2px",
        fontSize: "10px",
        fontWeight: "normal",
    }
}));

function DetailItem() {
    let { id } = useParams()
    const classes = useStyles();
    const { loading, error, data } = useQuery(getDetail, {
        variables: {
            id: id
        },
    });
    if (loading) {
        return (
            <LinearProgress color="secondary" />
        )
    }
    if (error) return `Error! ${error.message}`;
    console.log(data)
    return (
        <div>
            <Grid container spacing={1} direction="row" justify="space-evenly">
                <Grid container item xs={12} sm={12} md={12} lg={12} alignItems="strecth" style={{
                    paddingTop: "15px",
                    paddingBottom: "15px",
                }}>
                    <div style={{
                        position: "relative"
                    }}>
                        <img src={data.Media.bannerImage} alt={data.Media.bannerImage} style={{
                            width: "100%"
                        }}></img>
                        <div style={{
                            backgroundColor: "rgba(0,0,0,0.5)",
                            height: "100%",
                            position: "absolute",
                            top: "0",
                            width: "100%",
                        }}>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <div className={classes.detailContainer}>
                <Grid container spacing={1} direction="row" justify="flex-start">
                    <Grid container item xs={6} sm={6} md={2} lg={2} style={{
                        position: "relative"
                    }}>
                        <img className={classes.coverImage} src={data.Media.coverImage.extraLarge} alt={data.Media.coverImage.extraLarge}></img>
                    </Grid>
                    <Grid container item xs={6} sm={6} md={10} lg={10} style={{
                        position: "relative"
                    }}>
                        <div className={classes.root}>
                            <p className={classes.titleText}>
                                {data.Media.title.english}
                            </p>
                        </div>
                        <div dangerouslySetInnerHTML={{
                            __html: data.Media.description
                        }} className={classes.descriptionText}></div>
                    </Grid>
                </Grid>
                <Grid container spacing={1} direction="row" justify="flex-start">
                    <div style={{
                        maxWidth: "15%"
                    }}>
                        <Grid container item spacing={1} direction="row">
                            <Grid container item spacing={1} direction="column" justify="flex-start" lg={12} style={{
                                padding: "15px"
                            }}>
                                {data.Media.rankings.slice(0, 2).map((media) => (
                                    <div style={{
                                        border: "1px solid rgba(0,0,0,0.3)",
                                        borderRadius: "10px",
                                        width: "100%",
                                        height: "fit-content",
                                        marginTop: "4px",
                                        marginBottom: "4px"
                                    }}>
                                        <p style={{
                                            margin: "5px",
                                            fontSize: "10px",
                                            textAlign: "center",
                                            color: randomColor({
                                                luminosity: 'dark',
                                                hue: 'blue'
                                            })
                                        }}>
                                            #{media.rank} {media.context} {media.year ?? ""}
                                        </p>
                                    </div>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid container item spacing={1} direction="row">
                            <Grid container item spacing={1} direction="column" justify="flex-start" lg={12}>
                                <div style={{
                                    backgroundColor: lightBlue[50],
                                    borderRadius: "5px",
                                    padding: "5px",
                                }}>
                                    <div className={classes.infoBox}>
                                        <p className={classes.infoTitle}>
                                            Format
                                        </p>
                                        <p className={classes.infoSubTitle}>
                                            {data.Media.format}
                                        </p>
                                    </div>
                                    <div className={classes.infoBox}>
                                        <p className={classes.infoTitle}>
                                            Episode Duration
                                        </p>
                                        <p className={classes.infoSubTitle}>
                                            {data.Media.duration} Mins
                                        </p>
                                    </div>
                                    <div className={classes.infoBox}>
                                        <p className={classes.infoTitle}>
                                            Status
                                        </p>
                                        <p className={classes.infoSubTitle}>
                                            {data.Media.status}
                                        </p>
                                    </div>
                                    <div className={classes.infoBox}>
                                        <p className={classes.infoTitle}>
                                            Start Date
                                        </p>
                                        <p className={classes.infoSubTitle}>
                                            {data.Media.startDate.day}-{data.Media.startDate.month}-{data.Media.startDate.year}
                                        </p>
                                    </div>
                                    <div className={classes.infoBox}>
                                        <p className={classes.infoTitle}>
                                            Season
                                        </p>
                                        <p className={classes.infoSubTitle}>
                                            {data.Media.season}, {data.Media.startDate.seasonYear}
                                        </p>
                                    </div>
                                    <div className={classes.infoBox}>
                                        <p className={classes.infoTitle}>
                                            Average Score
                                        </p>
                                        <p className={classes.infoSubTitle}>
                                            {data.Media.averageScore}%
                                        </p>
                                    </div>
                                    <div className={classes.infoBox}>
                                        <p className={classes.infoTitle}>
                                            Mean Score
                                        </p>
                                        <p className={classes.infoSubTitle}>
                                            {data.Media.meanScore}%
                                        </p>
                                    </div>
                                    <div className={classes.infoBox}>
                                        <p className={classes.infoTitle}>
                                            Popularity
                                        </p>
                                        <p className={classes.infoSubTitle}>
                                            {data.Media.popularity}
                                        </p>
                                    </div>
                                    <div className={classes.infoBox}>
                                        <p className={classes.infoTitle}>
                                            Favourites
                                        </p>
                                        <p className={classes.infoSubTitle}>
                                            {data.Media.favourites}
                                        </p>
                                    </div>
                                    <div className={classes.infoBox}>
                                        <p className={classes.infoTitle}>
                                            Studios
                                        </p>
                                        {data.Media.studios.nodes.map((studio) => 
                                            <p className={classes.infoSubTitle}>
                                            {studio.name}
                                            </p>
                                        )}
                                    </div>
                                    <div className={classes.infoBox}>
                                        <p className={classes.infoTitle}>
                                            Source
                                        </p>
                                        <p className={classes.infoSubTitle}>
                                            {data.Media.source}
                                        </p>
                                    </div>
                                    <div className={classes.infoBox}>
                                        <p className={classes.infoTitle}>
                                            Genres
                                        </p>
                                        {data.Media.genres.map((genre) => 
                                            <p className={classes.infoSubTitle} style={{
                                                display: "inline-block",
                                                margin: 0
                                            }}>
                                            {genre}, 
                                            </p>
                                        )}
                                    </div>
                                    <div className={classes.infoBox}>
                                        <p className={classes.infoTitle}>
                                            Romaji
                                        </p>
                                        <p className={classes.infoSubTitle}>
                                            {data.Media.title.romaji}
                                        </p>
                                    </div>
                                    <div className={classes.infoBox}>
                                        <p className={classes.infoTitle}>
                                            English
                                        </p>
                                        <p className={classes.infoSubTitle}>
                                            {data.Media.title.english}
                                        </p>
                                    </div>
                                    <div className={classes.infoBox}>
                                        <p className={classes.infoTitle}>
                                            Native
                                        </p>
                                        <p className={classes.infoSubTitle}>
                                            {data.Media.title.native}
                                        </p>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <Grid container item xs={12} sm={12} md={10} lg={10} style={{
                        position: "relative"
                    }}>
                        <div className={classes.root} style={{
                            paddingBottom: "15px",
                            paddingTop: "15px"
                        }}>
                            <ItemDetailTabbar data={data}>

                            </ItemDetailTabbar>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default DetailItem;