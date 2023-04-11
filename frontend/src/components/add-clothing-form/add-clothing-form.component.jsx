import React, {useState} from 'react';
import {
    Container,
    Paper,
    Box,
    Typography,
    TextField,
    Button,
    Input,
    InputLabel,
    Grid,
    MenuItem,
    Select, IconButton,
    Snackbar,
    Alert,
    Autocomplete,
    Checkbox,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {createProduct} from "../../services/product.service";
import {useLocation} from "react-router-dom";
import {uploadFile} from "../../services/upload.service";

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

const AddClothingForm = ({type_of_clothes}) => {
        const location = useLocation();
        const [isError, setIsError] = useState(false);
        const [image, setImage] = useState(null);
        const [inputFields, setInputFields] = useState({
            brand: localStorage.getItem("name"),
            title: "product",
            gender: "Male",
            price: "100",
            occasion: "Casual",
            type_of_clothes: type_of_clothes,
            colour: "red",
            image: "www.google.com",
            available_sizes: [],
            size: "xs",

        });

        const onChange = e => {
            let data = {...inputFields};
            let name = e.target.name;
            let val = e.target.value;
            let measure = inputFields.size;
            if (name === 'title' || name === 'gender' || name === 'price' || name === 'occasion' || name === 'type_of_clothes'
                || name === 'colour' || name === 'image' || name === 'size') {
                data = {...data, [name]: val};
            } else if (name === 'height' || name === 'hip_height' || name === 'chest_circumference'
                || name === 'hip_size' || name === 'upper_body_height') {
                data = {
                    ...data,
                    [measure]: {
                        ...data[measure],
                        [name]: val
                    }
                };
            }
            setInputFields(data);
        };
        const onChangeMultipe = event => {
            const {options} = event.target;
            const value = [];
            for (let i = 0, l = options.length; i < l; i += 1) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            console.log(value); // selected options
        };

        const onFileChange = e => {
            setImage(e.target.files[0]);
            setInputFields({...inputFields, image: `uploads/${e.target.files[0].name}`});
        }

        const submit = (e) => {
            e.preventDefault();
            const file = image
            uploadFile(
                file,
                () => {
                    createProduct(
                        inputFields,
                        () => {
                            alert('Product created successfully');
                        },
                        () => {
                            setIsError(true);
                        }
                    )
                },
                error => {
                    setIsError(true);
                }
            )

        };

        const handleErrorClose = () => {
            setIsError(false);
        }

        return (
            <Container component="main" maxWidth="xl">
                <Paper
                    elevation={0}
                    sx={{
                        padding: '1rem',
                        marginTop: '1rem',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        {location.pathname.toUpperCase().replace("/", "").replace("-", " ")}
                    </Typography>
                    <Box component="form"
                         sx={{
                             "& .MuiTextField-root": {width: "100%"},
                             display: "flex",
                             flexDirection: "column",
                             textAlign: "center",
                             justifyContent: "center",
                         }}>
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            {/*Column 1*/}
                            <Grid item xs={6} md={3}>
                                <InputLabel>TITLE</InputLabel>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    variant="filled"
                                    size="small"
                                    id="title"
                                    name="title"
                                    onChange={onChange}
                                    value={inputFields.title}
                                />
                            </Grid>
                            {/*Column 2*/}
                            <Grid item xs={6} md={3}>
                                <InputLabel>GENDER</InputLabel>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Select
                                    variant="filled"
                                    size="small"
                                    labelId="gender"
                                    id="gender"
                                    name="gender"
                                    label="gender"
                                    sx={{width: "100%"}}
                                    value={inputFields.gender}
                                    onChange={onChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"Male"}>Male</MenuItem>
                                    <MenuItem value={"Female"}>Female</MenuItem>
                                </Select>
                            </Grid>
                            {/*Column 3*/}
                            <Grid item xs={6} md={3}>
                                <InputLabel>PRICE</InputLabel>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    variant="filled"
                                    size="small"
                                    id="price"
                                    name="price"
                                    value={inputFields.price}
                                    onChange={onChange}
                                />
                            </Grid>
                            {/*Column 4*/}
                            <Grid item xs={6} md={3}>
                                <InputLabel>OCCASION</InputLabel>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Select
                                    variant="filled"
                                    size="small"
                                    labelId="occasion"
                                    id="occasion"
                                    name="occasion"
                                    label="occasion"
                                    value={inputFields.occasion}
                                    sx={{width: "100%"}}
                                    onChange={onChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"Casual"}>Casual</MenuItem>
                                    <MenuItem value={"Business"}>Business</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <InputLabel>COLOUR</InputLabel>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Select
                                    variant="filled"
                                    size="small"
                                    labelId="colour"
                                    id="colour"
                                    label="colour"
                                    name="colour"
                                    value={inputFields.colour}
                                    sx={{width: "100%"}}
                                    onChange={onChange}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={"red"}>red</MenuItem>
                                    <MenuItem value={"green"}>green</MenuItem>
                                    <MenuItem value={"brown"}>brown</MenuItem>
                                    <MenuItem value={"yellow"}>yellow</MenuItem>
                                    <MenuItem value={"white"}>white</MenuItem>
                                    <MenuItem value={"black"}>black</MenuItem>
                                </Select>
                            </Grid>
                            {/*Column 6*/}
                            <Grid item xs={6} md={3}>
                                <InputLabel>UPLOAD IMAGE</InputLabel>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <label htmlFor="contained-button-file">
                                    <Input accept="image/*" id="contained-button-file" sx={{display: "none"}} multiple
                                           type="file" onChange={onFileChange}/>
                                    <Button variant="contained" component="span">
                                        Upload
                                    </Button>
                                </label>
                            </Grid>
                            {image !== null
                                ? (
                                    <>
                                        <Grid item xs={6}>
                                            <InputLabel>FILE: </InputLabel>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography>{image.name}</Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <IconButton onClick={() => setImage(null)}>
                                                <HighlightOffIcon/>
                                            </IconButton>
                                        </Grid>
                                    </>
                                )
                                : null
                            }
                            <Grid item xs={6} md={3}>
                                <InputLabel>AVAILABLE SIZES</InputLabel>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Autocomplete
                                    multiple
                                    id="available_sizes"
                                    options={sizes}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option}
                                    onChange={(event, value) => {
                                        setInputFields({...inputFields, available_sizes: value})
                                    }}
                                    renderOption={(props, option, {selected}) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                checked={selected}
                                            />
                                            {option}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Checkboxes" variant="filled"
                                                   placeholder="Available sizes"/>
                                    )}
                                />
                            </Grid>
                            {/*Column 7*/}
                            <Grid item xs={6} md={3}>
                                <InputLabel>CHOOSE SIZE YOU WANT TO EDIT</InputLabel>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Select
                                    variant="filled"
                                    size="small"
                                    labelId="size"
                                    id="size"
                                    label="size"
                                    name="size"
                                    value={inputFields.size}
                                    sx={{width: "100%"}}
                                    onChange={onChangeMultipe}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={"xs"}>xs</MenuItem>
                                    <MenuItem value={"s"}>s</MenuItem>
                                    <MenuItem value={"m"}>m</MenuItem>
                                    <MenuItem value={"l"}>l</MenuItem>
                                    <MenuItem value={"xl"}>xl</MenuItem>
                                    <MenuItem value={"xxl"}>xxl</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <InputLabel>HEIGHT</InputLabel>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    variant="filled"
                                    size="small"
                                    id="height"
                                    name="height"
                                    onChange={onChange}
                                />
                            </Grid>
                            {location.pathname === "/add-trouser" || location.pathname === "/add-skirt"
                                ? (<Grid item xs={6} md={3}>
                                        <InputLabel>ANKLE TO HIP HEIGHT</InputLabel>
                                    </Grid>
                                ) : null
                            }
                            {location.pathname === "/add-trouser" || location.pathname === "/add-skirt"
                                ? (< Grid item xs={6} md={3}>
                                        <TextField
                                            variant="filled"
                                            size="small"
                                            id="hip_height"
                                            name="hip_height"
                                            onChange={onChange}
                                        />
                                    </Grid>
                                ) : null
                            }
                            {location.pathname === "/add-coat"
                                ? (
                                    <Grid item xs={6} md={3}>
                                        <InputLabel>CHEST CIRCUMFERENCE</InputLabel>
                                    </Grid>
                                )
                                : null
                            }
                            {location.pathname === "/add-coat"
                                ? (
                                    < Grid item xs={6} md={3}>
                                        <TextField
                                            variant="filled"
                                            size="small"
                                            id="chest_circumference"
                                            name="chest_circumference"
                                            onChange={onChange}
                                        />
                                    </Grid>
                                )
                                : null
                            }
                            <Grid item xs={6} md={3}>
                                <InputLabel>HIP SIZE</InputLabel>
                            </Grid>
                            < Grid item xs={6} md={3}>
                                <TextField
                                    variant="filled"
                                    size="small"
                                    id="hip_size"
                                    name="hip_size"
                                    onChange={onChange}
                                />
                            </Grid>
                            {location.pathname === "/add-coat"
                                ? (
                                    <Grid item xs={6} md={3}>
                                        <InputLabel>UPPER BODY LENGTH</InputLabel>
                                    </Grid>
                                )
                                : null
                            }
                            {location.pathname === "/add-coat"
                                ? (
                                    < Grid item xs={6} md={3}>
                                        <TextField
                                            variant="filled"
                                            size="small"
                                            id="upper_body_height"
                                            name="upper_body_height"
                                            onChange={onChange}
                                        />
                                    </Grid>
                                )
                                : null
                            }
                            {/*Final column*/}
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                    onClick={submit}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>

                <Snackbar open={isError} autoHideDuration={6000} onClose={handleErrorClose}>
                    <Alert onClose={handleErrorClose} severity="error" sx={{width: '100%'}}>
                        Creating update failed, please try again!
                    </Alert>
                </Snackbar>
            </Container>
        );
    }
;

export default AddClothingForm;

const sizes = ["xs", "s", "m", "l", "xl", "xxl"];
