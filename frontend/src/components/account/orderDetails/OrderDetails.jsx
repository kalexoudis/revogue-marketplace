import {
    Typography,
    Grid,
    Paper,
    Card,
    Divider,
    Stack,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress
} from "@mui/material";
import {useParams} from "react-router-dom";
import AlertDialog from "../../dialog/alertDialog";
import {useState, useEffect} from "react";
import {getOrderById, updateOrder} from "../../../services/order.service";
import {addPointsForAcceptedProductInOrder} from "../../../services/points.service";

const OrderDetails = () => {
    const {orderId} = useParams()
    const [products, setProducts] = useState({})
    const [order, setOrder] = useState({})
    const [open, setOpen] = useState(false);
    const [acceptProductItemId, setAcceptProductItemId] = useState(null)
    const [acceptProductId, setAcceptProductId] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    const baseImageUrl = process.env.REACT_APP_BACKEND_URL;


    useEffect(() => {
        setIsLoading(true)
        getOrderById(orderId).then((response) => {
            setOrder(response.data)
            setProducts(response.data.products)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setIsLoading(false)
        })
    }, []);


    const handleConfirmationAccept = (productId, productItemId) => {

        setAcceptProductItemId(productItemId)
        setAcceptProductId(productId)
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleAcceptAndClose = async (productId, productItemId) => {
        try {
            await updateOrder(orderId, {
                products: [{
                    itemId: productItemId,
                    status: 'accepted'
                }]
            })

            await addPointsForAcceptedProductInOrder({
                order_id: orderId,
                product_id: productId
            })

            const objIndex = products.findIndex((product => product._id === productItemId));
            products[objIndex].status = "accepted"
            setProducts([...products])

            setOpen(false);

        } catch (err) {
            console.log(err)
        }
    };

    let orderSubtotal = 0
    let deliveryCharge = 0
    let totalAmount = 0

    if (products.length > 0) {
        for (const product of products) {
            orderSubtotal += product.price * product.quantity
            deliveryCharge += product.delivery_charge * product.quantity
            totalAmount = orderSubtotal + deliveryCharge
        }
    }

    const handleClickConfirmDelivery = async (productItemId) => {
        try {
            await updateOrder(orderId, {
                products: [{
                    itemId: productItemId,
                    status: 'delivered'
                }]
            })

            const objIndex = products.findIndex((product => product._id === productItemId));
            products[objIndex].status = "delivered"
            setProducts([...products])
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {isLoading &&
                <CircularProgress/>
            }
            {
                !isLoading &&
                <Card style={{width: "100%", padding: "10px"}}>
                    <Grid xs={12}>
                        <Card style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <Typography
                                style={{fontWeight: "bold", fontSize: 18, marginBottom: "20px", padding: "20px"}}>
                                Order Details
                            </Typography>
                            <Divider/>
                            <Grid container style={{margin: "5px 0px", width: "100%"}}>
                                <Grid item xs>
                                    <Stack>
                                        <Typography>
                                            Order number:
                                        </Typography>
                                        <Typography fontWeight="bold">
                                            {order._id}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Divider orientation="vertical" flexItem/>
                                <Grid item xs>
                                    <Stack>
                                        <Typography>
                                            Ordered Date:
                                        </Typography>
                                        <Typography fontWeight="bold">
                                            {order.createdAt}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Divider/>
                            <Divider/>
                        </Card>
                    </Grid>
                    <div className="uniqueName" style={{border: "1px solid rgba(224, 224, 224, 1)"}}>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 700}} aria-label="spanning table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">
                                            <Typography>Product</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography>Size</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography>Amount</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography>Status</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography>Accept Product</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography>Quantity</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography>Delivery Charge</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        products.length > 0 ? (
                                            products.map((product) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell>
                                                            <img crossOrigin="anonymous"
                                                                 src={baseImageUrl + '/' + product.img ?? '/noImage.png'}
                                                                 style={{maxWidth: "70px", maxHeight: "100px"}}/>
                                                        </TableCell>
                                                        <TableCell align="center">{product.size}</TableCell>
                                                        <TableCell
                                                            align="center">{product.price * product.quantity}</TableCell>
                                                        <TableCell align="center">
                                                            <Typography
                                                                marginBottom="3px">{product.status}</Typography>
                                                            {product.status !== "delivered" && product.status !== "accepted" ? (
                                                                <Button variant="outlined" size="small" style={{
                                                                    fontWeight: "bold",
                                                                    borderColor: "black",
                                                                    minWidth: '130px',
                                                                    color: "black",
                                                                    height: "20px",
                                                                    textTransform: 'none'
                                                                }}
                                                                        onClick={() => handleClickConfirmDelivery(product._id)}>Confirm
                                                                    Delivery</Button>
                                                            ) : null}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {product.status !== "delivered" ? (
                                                                <Button variant="contained" disabled style={{
                                                                    height: "20px",
                                                                    textTransform: 'none'
                                                                }}>
                                                                    Accept
                                                                </Button>) : (
                                                                <Button variant="outlined"
                                                                        onClick={() => handleConfirmationAccept(product.id, product._id)}
                                                                        style={{
                                                                            backgroundColor: "black",
                                                                            fontWeight: "bold",
                                                                            color: "white",
                                                                            borderColor: "black",
                                                                            height: "20px",
                                                                            textTransform: 'none',
                                                                        }}>
                                                                    Accept
                                                                </Button>
                                                            )}
                                                        </TableCell>
                                                        <TableCell align="center">{product.quantity}</TableCell>
                                                        <TableCell align="center">{product.delivery_charge*product.quantity}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        ) : null}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <Grid container display="flex" justifyContent="right" style={{width: "100%", padding: "10px"}}>
                        <Stack display="flex" flexDirection="column" justifyContent="left"
                               minWidth="250px">
                            <Grid container>
                                <Grid item xs={6} marginTop="10px">
                                    <Typography align="left">SubTotal:</Typography>
                                </Grid>
                                <Grid item xs={6} marginTop="10px">
                                    <Typography align="right">{orderSubtotal}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={6} marginTop="10px">
                                    <Typography align="left">Delivery Charge:</Typography>
                                </Grid>
                                <Grid item xs={6} marginTop="10px">
                                    <Typography align="right">{deliveryCharge}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid xs={6} marginTop="20px">
                                    <Typography align="left" fontWeight="bold">Total:</Typography>
                                </Grid>
                                <Grid item xs={6} marginTop="20px">
                                    <Typography align="right" fontWeight="bold">{totalAmount}</Typography>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                </Card>
            }
            <AlertDialog open={open} onClose={handleClose} productId={acceptProductId}
                         productItemId={acceptProductItemId}
                         handleAcceptAndClose={handleAcceptAndClose}/>
        </>
    );
}

export default OrderDetails