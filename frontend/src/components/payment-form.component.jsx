import {useContext, useState} from "react";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Backdrop, CircularProgress, Snackbar, Alert} from "@mui/material";
import {createOrder, payment} from "../services/order.service";
import {deleteProductInBasket} from "../services/basket.service";
import {SnackBarContext} from "../contexts/SnackbarContext";
import {deductPoints} from "../services/points.service";


const PaymentForm = ({total, products, handleClearBasket, usedPoints}) => {
    const stripe = useStripe();
    const elements = useElements();
    const { setSnack } = useContext(SnackBarContext);

    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const paymentHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!stripe || !elements) {
            return;
        }

        const response = await payment(JSON.stringify({amount: total * 100}))
            .then((res) => res.data)

        const client_secret = response.data.client_secret;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: "Jenny Rosen",
                }
            }
        });
        await setIsLoading(false);
        await setOpen(false);
        if (paymentResult.error) {
            setIsError(true);
            console.log(paymentResult.error)
        } else if (paymentResult.paymentIntent.status === "succeeded") {
            setIsSuccess(true);
            createOrder({products: products})
                .then(() => {
                    if(usedPoints > 0) {
                        deductPoints({
                            points: usedPoints
                        })
                    }
                })
                .then((res) =>{
                    setSnack({
                        message: 'Order created successfully.',
                        severity: 'success',
                        open: true
                    })
                    handleClearBasket();
                })
                .catch(err => console.error(err))
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSuccessClose = () => {
        setIsSuccess(false);
    }
    const handleErrorClose = () => {
        setIsError(false);
    }

    return (
        <div>
            <Backdrop
                sx={{zIndex: "1500"}}
                open={isLoading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Snackbar open={isSuccess} autoHideDuration={6000} onClose={handleSuccessClose}>
                <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
                    Payment successful
                </Alert>
            </Snackbar>
            <Snackbar open={isError} autoHideDuration={6000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                    Payment failed, please try again!
                </Alert>
            </Snackbar>
            <Button variant="contained" className="checkout-btn" onClick={handleClickOpen}>Checkout</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Credit Card Payment Information</DialogTitle>
                <DialogContent>
                    <CardElement/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" className="checkout-btn" sx={{backgroundColor: "black"}}
                            onClick={paymentHandler}>PAY</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default PaymentForm;
