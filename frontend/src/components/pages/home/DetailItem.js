
import { gql, useQuery } from "@apollo/client";
import { Grid, LinearProgress, makeStyles } from "@material-ui/core";
import { lightBlue } from "@material-ui/core/colors";
import React from "react";
import { useParams } from "react-router";
import ItemDetailTabbar from "../../elements/StyledComponents";

export const getDetail = gql`
    query($id: Int!) {
        Media(id: $id) {
            id
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
            airingSchedule {
                edges {
                    node {
                        airingAt
                        timeUntilAiring
                        episode
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
            tags {
                name
                category
                description
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
                    <Grid container item xs={12} sm={12} md={2} lg={2} style={{
                        position: "relative"
                    }}>
                        <img className={classes.coverImage} src={data.Media.coverImage.extraLarge} alt={data.Media.coverImage.extraLarge}></img>
                    </Grid>
                    <Grid container item xs={12} sm={12} md={10} lg={10} style={{
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
                    <Grid container item xs={12} sm={12} md={2} lg={2} style={{
                        position: "relative"
                    }}>
                    </Grid>
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