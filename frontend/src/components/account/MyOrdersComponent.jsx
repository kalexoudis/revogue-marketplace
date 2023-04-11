import {
    Button,
    Card, CircularProgress,
    Divider,
    Grid,
    Paper,
    Typography
} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Navigation} from "swiper";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {getMyOrders} from "../../services/order.service";

const MyOrdersComponent = () => {

    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const baseImageUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        setIsLoading(true)
        getMyOrders().then((response) => {
            setOrders(response.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setIsLoading(false)
        })
    }, []);

    let navigate = useNavigate();

    const handleOrderDetailsAction = (id) => {
        navigate('/order-details/' + id)
    }

    return (
        <>
            {isLoading &&
                <CircularProgress/>
            }
            {
                !isLoading &&
                <Card style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    marginBottom: "20px"
                }}>
                    <Typography style={{fontWeight: "bold", fontSize: 18, marginBottom: "20px", padding: "20px"}}>
                        My Orders
                    </Typography>
                    <Divider/>
                    {orders.length > 0 ? (
                        <Grid container>
                            <Grid item xs={6} fontSize="17px" fontWeight="bold" fontFamily="Italic"
                                  padding="5px">Products</Grid>
                            <Grid item xs={3} fontSize="17px" fontWeight="bold" fontFamily="Italic"
                                  padding="5px">Total</Grid>
                            <Grid item xs={3} fontSize="17px" fontWeight="bold" fontFamily="Italic" padding="5px">Order
                                Details</Grid>
                        </Grid>
                    ) : (
                        <Grid container display="flex" justifyContent="center">
                            <Typography>You have not placed an order yet.</Typography>
                        </Grid>
                    )}
                    <Divider/>
                    {
                        orders?.map((order) => {
                            return (
                                <Grid container bgcolor="mintcream" key={order.id}>
                                    <Paper style={{width: "100%"}}>
                                        <Card style={{display: "flex", justifyContent: "left", width: "100%"}}>
                                            <Grid container xs={12}>
                                                <Grid item xs={6} display="flex" alignItems="flex-start">
                                                    <Typography margin="10px 5px 0px" style={{color: "grey"}}>Order
                                                        Number: {order._id}</Typography>
                                                </Grid>
                                                <Grid item xs={6} display="flex" alignItems="flex-start">
                                                    <Typography margin="10px 5px 0px"
                                                                style={{color: "grey"}}>Date: {order.createdAt}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Swiper navigation={true} modules={[Navigation]}
                                                        className="mySwiper"
                                                        style={{
                                                            height: "170px", width: "200px", marginTop: "5px"
                                                        }}>
                                                    {
                                                        order.products.map((product) => {
                                                            return (
                                                                <SwiperSlide>
                                                                    <img
                                                                        crossOrigin="anonymous"
                                                                        src={baseImageUrl + '/' + product.img}
                                                                        style={{
                                                                            maxWidth: "100px",
                                                                            maxHeight: "150px",
                                                                            marginTop: "10px"
                                                                        }}/>
                                                                </SwiperSlide>
                                                            )
                                                        })
                                                    }
                                                </Swiper>
                                            </Grid>
                                            <Divider orientation="vertical" flexItem/>
                                            <Grid item xs display="flex" alignItems="center" justifyContent="center"
                                                  fontWeight="bold">{order.total_amount}</Grid>
                                            <Divider orientation="vertical" flexItem/>
                                            <Grid item xs display="flex" alignItems="center" justifyContent="center"
                                                  fontWeight="bold">
                                                <Button variant="contained" size="small"
                                                        style={{
                                                            backgroundColor: "black",
                                                            width: "100px",
                                                            height: "25px",
                                                            fontSize: "13px",
                                                            textTransform: "none"
                                                        }} onClick={() => {
                                                    handleOrderDetailsAction(order._id)
                                                }}>View Details</Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Card>
            }
        </>
    )
}

export default MyOrdersComponent