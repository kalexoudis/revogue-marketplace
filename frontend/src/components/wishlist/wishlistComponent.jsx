import {
    Button,
    Card, CircularProgress,
    Container,
    Divider,
    Grid,
    IconButton, Link, Modal,
    Stack,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState, useEffect, useContext} from "react";
import {deleteProductInWishlist, getWishlist} from "../../services/wishlist.service";
import {Box} from "@mui/system";
import ProductDetails from "../product/product-details.component";
import {addProductToBasket} from "../../services/basket.service";
import {SnackBarContext} from "../../contexts/SnackbarContext";
import React from "react";


const WishlistComponent = () => {
    const { setSnack } = useContext(SnackBarContext);
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isRemoved, setIsRemoved] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const baseImageUrl = process.env.REACT_APP_BACKEND_URL

    const handleRemoveAction = async (productId) => {
        setIsRemoved(false)
        try {
            await deleteProductInWishlist(productId)
            setIsRemoved(true)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getWishlist().then((response) => {
            setItems(response.data.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setIsLoading(false);
        })
    }, [isRemoved])

    const openProductDetailModal = (product) => {
        setSelectedProduct({
            ...product,
        })

        setOpen(true)
    }

    const handleAddToBasket = async (formData) => {
        try {
            await addProductToBasket(formData)
            await deleteProductInWishlist(formData.product_id)

            const newItems = items.filter((item) => item._id !== formData.product_id)
            setItems(newItems)

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


    const handleModalClose = () => {
        setOpen(false)
    }

    return (
        <Container>
            {isLoading &&
                <CircularProgress/>
            }
            {
                !isLoading &&
                <>
                    <Typography className="wishlist-page-title" fontSize="24px" fontWeight="bold" marginTop="20px">
                        My Wishlist
                    </Typography>
                    <Divider sx={{marginBottom: '20px'}}/>
                    <Grid container className="wishlist-parent-container" display="flex" justifyContent="center"
                          alignItems="center" spacing="10px" marginBottom="10px">
                        {
                            items.length === 0 &&
                            <Stack className="no-items-stack" display="flex" justifyContent="center" alignItems="center"
                                   width="100%" minHeight="300px">
                                <Typography fontStyle="Italic" fontWeight="bold" marginBottom="10px">
                                    You currently have nothing saved in your Wishlist.
                                </Typography>
                                <Typography color="gray">
                                    Personalize your shopping experience by adding items to your Wishlist.
                                </Typography>
                            </Stack>
                        }
                        {
                            items.map((product) => {
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
                                                    <IconButton onClick={() => handleRemoveAction(product._id)}
                                                                aria-label="delete" size="small">
                                                        <DeleteIcon fontSize="inherit"/>
                                                    </IconButton>
                                                </Grid>
                                            </Stack>
                                        </Card>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </>
            }
            <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ProductDetails
                        product={selectedProduct}
                        isFavorite={true}
                        addToBasket={handleAddToBasket}
                        toggleWishList={()=>{}}
                        fromWishlist={true}
                    />
                </Box>
            </Modal>
        </Container>
    )
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default WishlistComponent