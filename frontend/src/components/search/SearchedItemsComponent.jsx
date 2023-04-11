import {
    Box,
    Button,
    Card,
    CircularProgress,
    Container,
    Divider,
    Grid,
    IconButton,
    Stack,
    Modal,
    Typography, Link
} from "@mui/material";
import {useState, useEffect, useContext} from "react";
import {useSearchParams} from "react-router-dom";
import {getProducts} from "../../services/product.service";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from "react";
import {addProductToWishlist, deleteProductInWishlist, getWishlist} from "../../services/wishlist.service";
import {isAuthenticated} from "../../utils/auth";
import {SnackBarContext} from "../../contexts/SnackbarContext";
import ProductDetails from "../product/product-details.component";
import { addProductToBasket } from "../../services/basket.service";

const SearchedItemsComponent = () => {
    const [params, setParams] = useSearchParams()
    const { setSnack } = useContext(SnackBarContext);
    const [isLoading, setIsLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([])
    const [wishList, setWishList] = useState([])
    const [open, setOpen] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const baseImageUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        setIsLoading(true);
        const queryString = `keyword=${params.get('keyword')}`

        getProducts(queryString, (data) => {
                setSearchResult(data)
            },
            (error) => {
                console.log(error)
                setSnack({
                    message: 'Something went wrong',
                    severity: 'error',
                    open: true
                })
            }, () => {
                setIsLoading(false)
            })
    }, [params])


    useEffect(() => {
        if (isAuthenticated()) {
            getWishlist()
                .then((response) => {
                    let list = response.data.data.map((item) => {
                        return item?._id
                    })
                    setWishList(list)
                })
                .catch((err) => {
                    console.log(err)
                    setSnack({
                        message: 'Something went wrong',
                        severity: 'error',
                        open: true
                    })
                })
        }
    }, [])

    const handleAddToBasket = async (formData) => {
        try {
            await addProductToBasket(formData)

            setSnack({
                message: 'Product added to basket',
                severity: 'success',
                open: true
            })
        } catch (err) {
            setSnack({
                message: 'Something went wrong!',
                severity: 'error',
                open: true
            })
        }
        handleModalClose()
    }

    const toggleProductToWishList = async (productId) => {
        try {
            let message = '';
            if (wishList.includes(productId)) {
                message = 'Product removed from wishlist.'
                await deleteProductInWishlist(productId)
                const newWishList = wishList.filter((item) => item !== productId)
                setWishList(newWishList)
            } else {
                message = 'Product added to wishlist.'
                await addProductToWishlist({product_id: productId})
                setWishList([...wishList, productId])
            }
            setSnack({
                message: message,
                severity: 'success',
                open: true
            })
        } catch (err) {
            console.log(err)
            setSnack({
                message: 'Something went wrong',
                severity: 'error',
                open: true
            })
        }
    }

    const openProductDetailModal = (product) => {
        setSelectedProduct({
            ...product,
        })

        setOpen(true)
    }

    const toggleWishListFromModal = async (productId) => {
        await toggleProductToWishList(productId)
        handleModalClose()
    }

    const handleModalClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Container>
                <Typography className="search-result-page-title" fontSize="24px" fontWeight="bold" marginTop="20px">
                    Search Results
                </Typography>
                <Divider/>
                {isLoading && <CircularProgress/>}
                {!isLoading &&
                    <Grid container className="sr-parent-container" display="flex" justifyContent="center"
                          alignItems="center" spacing="30px" marginTop="10px" marginBottom="10px">
                        {
                            searchResult.length === 0 &&
                            <Box className="no-items-box" display="flex" justifyContent="center" alignItems="center"
                                 width="100%" minHeight="300px">
                                <Typography fontStyle="Italic">
                                    There are currently no items that match your search result.
                                </Typography>
                            </Box>
                        }
                        {
                            searchResult?.map((product) => {
                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={3} className="sr-item-grid" key={product._id}>
                                        <Card>
                                            <Stack className="sr-image-stack">
                                                <img style={{height: "400px"}}
                                                     crossOrigin="anonymous"
                                                     src={baseImageUrl+'/'+product.image}
                                                />
                                            </Stack>
                                            <Stack className="sr-product-details-stack">
                                                <Grid container className="parent-sr-item-prod-details"
                                                      display="flex"
                                                      justifyContent="left" padding="15px">
                                                    <Grid item>
                                                        <Typography className="brand-name" align="left"
                                                                    fontFamily="Italic">{product.brand}
                                                        </Typography>
                                                        <Link href={"/product/"+product._id} underline={"hover"}>
                                                            <Typography className="item-name" align="left" fontWeight="bold">
                                                                {product.title}
                                                            </Typography>
                                                        </Link>
                                                    </Grid>
                                                </Grid>
                                                <Grid container className="parent-sr-item-price-details"                                                      padding="0px 10px 5px">
                                                    <Grid item xs={8} display="flex" justifyContent="left">
                                                        <Typography className="delivery-charge-information" margin="5px 0px"
                                                                    fontStyle="Italic">
                                                            {product.delivery_charge === 0 ? "Free Delivery" : "Delivery: " + product.delivery_charge}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4} display="flex" justifyContent="right">
                                                        <Typography variant="h6" className="price" margin="5px 0px" fontWeight="bold">
                                                            {product.price} €
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Stack>
                                            <Stack className="sr-item-actions-stack">
                                                <Grid container className="sr-item-actions-grid"
                                                      justifyContent="space-between" alignItems="center"
                                                      padding="0px 15px 15px">
                                                    <Button onClick={() => openProductDetailModal(product)} className="primary-btn-small" variant="contained" size="small">Add
                                                        to basket</Button>
                                                    <IconButton onClick={() => toggleProductToWishList(product._id)}>
                                                        {wishList.includes(product._id) ?
                                                            <FavoriteIcon style={{color: 'pink'}}/> : <FavoriteBorderIcon/>}
                                                    </IconButton>
                                                </Grid>
                                            </Stack>
                                        </Card>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                }
            </Container>
            <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ProductDetails
                        product={selectedProduct}
                        isFavorite={wishList.includes(selectedProduct?._id)}
                        addToBasket={handleAddToBasket}
                        toggleWishList={toggleWishListFromModal}
                    />
                </Box>
            </Modal>
        </>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default SearchedItemsComponent