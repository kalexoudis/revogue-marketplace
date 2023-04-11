import React, { useState } from 'react';
import {
    IconButton,
    FormControl,
    Select,
    MenuItem,
    Button,
    Box,
    Typography
} from "@mui/material"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from "styled-components"

const CombinationProduct = ({
    productId,
    productName,
    productSeller,
    productPrice,
    productSizes,
    productSizeInfo,
    productColor,
    deliveryCost,
    productImgs
}) => {

    const [size, setSize] = useState('')
    const [isFavorite, setFavorite] = useState(false)
    const [mainImg, setMainImg] = useState(productImgs[0])
    const handleChange = (event) => {
        console.log(event.target.value)
        setSize(event.target.value);
    };

    return (
        <Box id={productId} display="flex">
            <Box flex={2} display={"flex"}>
                <Box flex={1} flexDirection={"column"}>
                    {productImgs.map(imgSrc =>
                        <Button
                            sx={{
                                background: "transparent",
                                border: 0,
                                cursor: "pointer"
                            }}
                            onClick={() => setMainImg(imgSrc)}>
                            <img
                                src={imgSrc}
                                style={{
                                    height: "50%",
                                    width: "auto",
                                    "max-width": "100%"
                                }} />
                        </Button>
                    )}
                </Box>
                <Box flex={2}>
                <img
                    src={mainImg}
                    style={{width: "100%"}}/>
                </Box>
            </Box>
            <Box  flex={3} border={1} p={5} ml={2} display="flex" flexDirection="column" alignItems="flex-start">
                <Typography variant='h5' color="#595959">{productSeller}</Typography>
                <Typography variant='h4'>{productName}</Typography>
                <Box display="flex" alignItems={"flex-end"} my={1}>
                    <Typography variant='h5'>{productPrice + "€"}</Typography>
                    <Typography variant='subtitle1' color="#595959">&nbsp; VAT included</Typography>
                </Box>
                <Typography my={1}>Colour: {productColor}</Typography>
                <Typography variant="caption" my={1} style={{ "font-style": "italic" }}>{deliveryCost == 0 ? "Free delivery" : "Delivery cost: " + deliveryCost + "€"}</Typography>

                <Box p={1} bgcolor={"#F5F5F5"} my={1}>
                    <Typography variant={"caption"}>We recommend size {productSizeInfo} for your profile. You can also select different size below.</Typography>
                </Box>
                <FormControl my={1} >
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={size}
                        onChange={handleChange}
                        sx={{textAlign: "start", borderRadius: 0, width: "29.5rem"}}
                    >
                        {productSizes.map(size => <MenuItem value={size}>{size}</MenuItem>)}
                    </Select>
                </FormControl>
                {/* <Box display="flex" my={1} width="29.5rem" justifyContent="space-between"> */}
                <ButtonContainer >
                    <Button
                        className="basket"
                        variant="contained">
                        <Typography variant='subtitle1'>{"Add to BasketComponent"}</Typography>
                    </Button>
                    <IconButton
                        className="favorite"
                        onClick={() => setFavorite(!isFavorite)}>
                        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    </ButtonContainer>
            </Box>
        </Box>
    );
};

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 29.5rem;
    margin-top: 1rem;
    
  .basket{
    background: black;
    color: white; 
    height: 3.5rem;
    border-radius:0;
    width: 25rem;
  }
  .basket:hover{
    background: black;
  }
  .favorite{
    color: black; 
    border: black;
    border-width: 1px;
    border-style: solid;
    border-radius:0; 
    height: 3.5rem; 
    width: 3.5rem;
  }
`

export default CombinationProduct
