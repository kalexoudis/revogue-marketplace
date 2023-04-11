import React, {useContext, useEffect} from "react";
import {useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    IconButton,
    List,
    ListItem,
    Stack,
    TextField,
    Typography,
    Grid
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {ParentDiv, CounterContainer} from "./BasketComponent.styles";
import CheckoutComponent from "./CheckoutComponent";
import {clearBasket, deleteProductInBasket, getBasket, updateItemInBasket} from "../../services/basket.service";
import {getPoints} from "../../services/points.service";
import paymentImage from "../../assets/payment.png"
import {addProductToWishlist} from "../../services/wishlist.service";
import {SnackBarContext} from '../../contexts/SnackbarContext';

const BasketComponent = () => {
    const {setSnack} = useContext(SnackBarContext);
    const [basketBrands, setBasketBrands] = useState([])
    const [basketProducts, setBasketProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [enteredPoints, setEnteredPoints] = useState(0)
    const [isFavourite, setIsFavourite] = useState(false)
    const [isRemoved, setIsRemoved] = useState(false)
    const [isSetPointEnabled, setIsSetPointEnabled] = useState(true)

    const baseImageUrl = process.env.REACT_APP_BACKEND_URL

    const handleSetPoints = (e) => {
        setEnteredPoints(e.target.value)
    }

    //checkout side
    const [checkoutCalculation, setCheckoutCalculation] = useState({
        subTotal: 0,
        deliveryTotal: 0,
        discountFromUsedPoints: 0
    })

    const addProductToWishList = async (objId, productId) => {
        setIsFavourite(false)
        try {
            await addProductToWishlist({product_id: productId})
            // Add product to wishlist after implementation of wishlist service
            await deleteProductInBasket(objId)
            setIsFavourite(true)
            setSnack({
                message: 'Product added to wishlist',
                severity: 'success',
                open: true
            })
        } catch (err) {
            setSnack({
                message: 'Something went wrong!',
                severity: 'error',
                open: true
            })
            console.log(err)
        }
    }

    const removeProductFromBasket = async (objId) => {
        setIsRemoved(false)
        try {
            await deleteProductInBasket(objId)
            setIsRemoved(true)
        } catch (err) {
            console.log(err)
            setSnack({
                message: 'Something went wrong!',
                severity: 'error',
                open: true
            })
        }
    }

    const increaseProductCount = async (objId) => {
        try {
            const objIndex = basketProducts.findIndex((item => item.id === objId));
            await updateItemInBasket(objId, {
                quantity: basketProducts[objIndex].quantity + 1
            })
            basketProducts[objIndex].quantity += 1
            setBasketProducts([...basketProducts])
        } catch (err) {
            setSnack({
                message: 'Something went wrong!',
                severity: 'error',
                open: true
            })
            console.log(err)
        }
    }

    const decreaseProductCount = async (objId) => {
        try {
            const objIndex = basketProducts.findIndex((item => item.id === objId));
            if (basketProducts[objIndex].quantity > 1) {
                await updateItemInBasket(objId, {
                    quantity: basketProducts[objIndex].quantity - 1
                })
                basketProducts[objIndex].quantity -= 1
                setBasketProducts([...basketProducts])
            }
        } catch (err) {
            setSnack({
                message: 'Something went wrong!',
                severity: 'error',
                open: true
            })
            console.log(err)
        }
    }

    useEffect(() => {
        let subTotal = basketProducts.reduce((accumulator, object) => {
            return accumulator + (object.price * object.quantity);
        }, 0);

        let deliveryTotal = basketProducts.reduce((accumulator, object) => {
            return accumulator + (object.delivery_charge * object.quantity);
        }, 0);

        setCheckoutCalculation({
            discountFromUsedPoints: 0,
            subTotal: subTotal,
            deliveryTotal: deliveryTotal,
        })
    }, [basketProducts])

    useEffect(() => {
        setIsLoading(true);
        getBasket().then((response) => {
            setBasketProducts(response.data.data.products)
            setBasketBrands(response.data.data.brands)
        }).catch((error) => {
            setSnack({
                message: 'Something went wrong!',
                severity: 'error',
                open: true
            })
            console.log(error)
        }).finally(() => {
            setIsLoading(false);
        })
    }, [isFavourite, isRemoved])

    const handleEditMyPoints = () => {
        setEnteredPoints(0)
        setIsSetPointEnabled(true);
    }

    const handleUseMyPoints = async () => {
        try {
            const pointsInformation = await getPoints()
            const availablePoints = pointsInformation.data.data
            if (enteredPoints > availablePoints) {
                setEnteredPoints(0);
                setSnack({
                    message: 'Not enough points',
                    severity: 'error',
                    open: true
                })
            } else {
                setIsSetPointEnabled(false);
                const updatedPointsUsed = checkoutCalculation.subTotal >= enteredPoints / 100 ?
                    enteredPoints : checkoutCalculation.subTotal * 100
                setEnteredPoints(updatedPointsUsed)
                setCheckoutCalculation({
                    ...checkoutCalculation,
                    discountFromUsedPoints: updatedPointsUsed / 100
                })
            }
        } catch (err) {
            console.log(err)
            setSnack({
                message: 'Something went wrong!',
                severity: 'error',
                open: true
            })
        }
    }

    const handleClearBasket = async () => {
        try {
            await clearBasket()

            setBasketProducts([])
        } catch (err) {
            console.log(err)
            setSnack({
                message: 'Something went wrong!',
                severity: 'error',
                open: true
            })
        }
    }

    return (
        <ParentDiv className="main-box">
            {!isLoading &&
                <>
                    {
                        basketProducts.length > 0 ?
                            (
                                <>
                                    <Box flex={4} mr={3} className="product-section">
                                        <Card className="basket-items-parent-card">
                                            <Stack>
                                                <Typography className="basket-page-title" align="left">
                                                    Your Basket
                                                    ({basketProducts.length} {basketProducts.length > 1 ? ' items' : ' item'})
                                                </Typography>
                                            </Stack>
                                            {
                                                basketProducts?.map(product => {
                                                    return (
                                                        <Card className="product-card" key={product._id}>
                                                            <Stack marginTop="20px">
                                                                <Grid container xs={12} className="basket-item-parent"
                                                                      padding="10px">
                                                                    <Grid item xs={3} className="item-image"
                                                                          display="flex"
                                                                          justifyContent="flex-start"
                                                                          padding="10px">
                                                                        <img
                                                                            crossOrigin={"anonymous"}
                                                                            src={baseImageUrl + '/' + product.image}
                                                                            style={{
                                                                                maxHeight: "150px"
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={9} className="item-details"
                                                                          display="flex"
                                                                          justifyContent="flex-end">
                                                                        <Grid container xs={12}
                                                                              padding="10px 20px 0px 0px">
                                                                            <Grid item xs={12}
                                                                                  className="item-brand-name"
                                                                                  display="flex"
                                                                                  justifyContent="flex-start"
                                                                                  alignItems="center">
                                                                                <Typography
                                                                                    fontSize="13px">{product.brand}</Typography>
                                                                            </Grid>
                                                                            <Grid container xs={12}>
                                                                                <Grid item xs={7} className="item-title"
                                                                                      display="flex"
                                                                                      justifyContent="flex-start"
                                                                                      alignItems="center">
                                                                                    <Typography
                                                                                        fontWeight="bold">{product.title}</Typography>
                                                                                </Grid>
                                                                                <Grid item xs={5}
                                                                                      className="item-counter-button"
                                                                                      display="flex"
                                                                                      justifyContent="flex-end"
                                                                                      alignItems="center">
                                                                                    <CounterContainer>
                                                                                        <Button
                                                                                            onClick={() => decreaseProductCount(product.id)}
                                                                                            size="small"
                                                                                            className="counterButton">
                                                                                            <Typography
                                                                                                variant="h5">-</Typography>
                                                                                        </Button>
                                                                                        <Box className="counterField">
                                                                                            <Typography
                                                                                                variant="h5">{product.quantity}</Typography>
                                                                                        </Box>
                                                                                        <Button
                                                                                            onClick={() => increaseProductCount(product.id)}
                                                                                            size="small"
                                                                                            className="counterButton">
                                                                                            <Typography
                                                                                                variant="h5">+</Typography>
                                                                                        </Button>
                                                                                    </CounterContainer>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid container xs={12}>
                                                                                <Grid item xs={6}
                                                                                      className="item-colour"
                                                                                      display="flex"
                                                                                      justifyContent="flex-start"
                                                                                      alignItems="center">
                                                                                    <Typography
                                                                                        fontSize="13px">Colour: {product.colour}</Typography>
                                                                                </Grid>
                                                                                <Grid item xs={6}
                                                                                      className="item-points"
                                                                                      display="flex"
                                                                                      justifyContent="flex-end"
                                                                                      alignItems="center">
                                                                                    <Typography variant="contained"
                                                                                                fontSize="13px">Points: {product.price * product.quantity}</Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid container xs={12}>
                                                                                <Grid item xs={6} className="item-size"
                                                                                      display="flex"
                                                                                      justifyContent="flex-start"
                                                                                      alignItems="center">
                                                                                    <Typography
                                                                                        fontSize="13px">Size: {product.size}</Typography>
                                                                                </Grid>
                                                                                <Grid item xs={6}
                                                                                      className="item-points"
                                                                                      display="flex"
                                                                                      justifyContent="flex-end"
                                                                                      alignItems="center">
                                                                                    <Typography variant="contained"
                                                                                                fontSize="13px">Delivery
                                                                                        Charge: {product.delivery_charge * product.quantity}
                                                                                        €</Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid container xs={12}
                                                                                  className="action-button item-price">
                                                                                <Grid item xs={5}
                                                                                      className="action-grid"
                                                                                      display="flex"
                                                                                      justifyContent="flex-start"
                                                                                      alignItems="center">
                                                                                    <IconButton
                                                                                        onClick={() => addProductToWishList(product.id, product.product_id)}>
                                                                                        <FavoriteBorderIcon/>
                                                                                    </IconButton>
                                                                                    <Typography>|</Typography>
                                                                                    <IconButton
                                                                                        onClick={() => removeProductFromBasket(product.id)}>
                                                                                        <DeleteOutlineIcon/>
                                                                                    </IconButton>
                                                                                </Grid>
                                                                                <Grid item xs={7} className="item-price"
                                                                                      display="flex"
                                                                                      justifyContent="flex-end"
                                                                                      alignItems="center">
                                                                                    Price: {product.price * product.quantity} €
                                                                                    (VAT
                                                                                    included)
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Stack>
                                                        </Card>);
                                                })
                                            }
                                        </Card>
                                        <Card className="delivery-details">
                                            <Stack>
                                                <Typography fontWeight="bold" fontSize="18px" margin="10px 30px"
                                                            className="delivery-details-title">
                                                    Estimated Delivery
                                                </Typography>
                                                <List>
                                                    {basketBrands.map((item) => {
                                                        return (
                                                            <ListItem className="brand-delivery-estimation">
                                                                <Typography
                                                                    fontWeight="bold">{item.brand}: </Typography>
                                                                <Typography>&nbsp;{item.expected_delivery_time}</Typography>
                                                            </ListItem>
                                                        );
                                                    })}
                                                </List>
                                            </Stack>
                                        </Card>
                                        <Card className="payment-methods-parent">
                                            <Grid container xs={12} display="flex">
                                                <Grid item xs={12} display="flex" justifyContent="flex-start">
                                                    <Typography className="payment-methods-title">
                                                        We accept
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} display="flex" justifyContent="center"
                                                      paddingBottom="10px">
                                                    <img src={paymentImage}
                                                         style={{
                                                             maxWidth: "700px",
                                                             maxHeight: "50px",
                                                             align: "center"
                                                         }}/>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Box>
                                    <Box flex={2} className="checkout-parent-box">
                                        <Box justifyContent="center" border={1} px={2} py={1} className="checkout-main">
                                            <CheckoutComponent checkoutCalculations={checkoutCalculation}
                                                               products={basketProducts}
                                                               handleClearBasket={handleClearBasket}/>
                                        </Box>
                                        <Accordion className="checkout-accordion">
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography>Use Points(optional)</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <TextField className="accordion-text-field"
                                                           hiddenLabel
                                                           disabled={!isSetPointEnabled}
                                                           id="filled-hidden-label-normal"
                                                           defaultValue="0"
                                                           variant="filled"
                                                           size="small"
                                                           value={enteredPoints}
                                                           onChange={handleSetPoints}
                                                />
                                                <Grid item xs={12} display="flex" justifyContent="center" margin="10px"
                                                      className="use-points-grid">
                                                    {isSetPointEnabled ? (
                                                        <Button className="use-points-btn" variant="outlined"
                                                                onClick={handleUseMyPoints}>
                                                            Use My Points
                                                        </Button>
                                                    ) : (
                                                        <Button className="use-points-btn" variant="outlined"
                                                                onClick={handleEditMyPoints}>
                                                            Edit My Points
                                                        </Button>
                                                    )}
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Box>
                                </>
                            )
                            : (
                                <Stack className="no-items-stack" display="flex" justifyContent="center" alignItems="center"
                                       width="100%" minHeight="300px">
                                    <Typography fontStyle="Italic" fontWeight="bold" marginBottom="10px">
                                        You currently have nothing saved in your basket.
                                    </Typography>
                                </Stack>
                            )
                    }
                </>
            }
        </ParentDiv>
    )
}

export default BasketComponent
