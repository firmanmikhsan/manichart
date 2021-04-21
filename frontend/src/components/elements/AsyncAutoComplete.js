import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { gql } from "@apollo/client";
import { client } from '../../index';
import { Grid, Link, makeStyles } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

const getSearch = gql`
query($search: String!) {
  Page {
    media(search: $search, type: ANIME) {
      id
      type
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
}`;

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: lightBlue[700]
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: lightBlue[700]
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: lightBlue[700]
        },
        "& .MuiOutlinedInput-input": {
            color: "white"
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "white"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "white"
        },
        "& .MuiInputLabel-outlined": {
            color: "white"
        },
        "&:hover .MuiInputLabel-outlined": {
            color: "white"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "white"
        }
    }
}))

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function AsyncAutoComplete() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const { data } = await client.query({
                query: getSearch,
                variables: {
                    search: ""
                }
            });
            await sleep(1e3); // For demo purposes.
            console.log(data.Page.media)
            if (active) {
                setOptions(data.Page.media.map((media) => media.title.english));
                // setOptions([]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            freeSolo
            style={{ width: 300 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option.title.romaji === value.title.romaji}
            getOptionLabel={(option) => option.title.romaji}
            options={options}
            loading={loading}
            onInputChange={(event, value) => {
                (async () => {
                    const { data } = await client.query({
                        query: getSearch,
                        variables: {
                            search: value
                        }
                    });
                    await sleep(1e3); // For demo purposes.
                    console.log(data.Page.media)
                    setOptions(data.Page.media);
                    // setOptions([]);
                })();
            }}
            renderOption={(option) => (
                <Router>
                    <Link href={`/detail/${option.id}`}>
                        <Grid container spacing={1} justify="flex-start" direction="row">
                            <Grid container item lg={3} spacing={1} style={{
                                paddingTop: "15px",
                                paddingBottom: "15px"
                            }}>
                                <img src={option.coverImage.medium} alt={option.coverImage.medium} style={{
                                    width: "100%"
                                }}></img>
                            </Grid>
                            <Grid container item lg={8} spacing={1} style={{
                                padding: "15px",
                            }}>
                                <div>
                                    <p style={{
                                        fontSize: "12px",
                                        color: lightBlue[700],
                                        margin: 0
                                    }}>
                                        {option.title.romaji}
                                    </p>
                                    <p style={{
                                        fontSize: "10px",
                                        color: lightBlue[400],
                                        margin: 0
                                    }}>
                                        {option.type}
                                    </p>
                                </div>
                            </Grid>
                        </Grid>
                    </Link>
                </Router>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search"
                    variant="outlined"
                    size="small"
                    className={classes.root}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}