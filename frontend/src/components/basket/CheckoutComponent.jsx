import {
    Button,
    Grid,
    Typography
} from "@mui/material";
import React from "react";
import {CheckoutParentDiv} from "./CheckoutComponent.styles";
import PaymentForm from "../payment-form.component";


const CheckoutComponent = ({checkoutCalculations, products, handleClearBasket}) => {
    const updatedSubTotal = checkoutCalculations.subTotal - checkoutCalculations.discountFromUsedPoints
    const total = checkoutCalculations.deliveryTotal + (updatedSubTotal < 0 ? 0 : updatedSubTotal)

    return (
        <CheckoutParentDiv container xs={12}>
            <Grid item xs={12} display="flex" justifyContent="center">
                <Typography fontWeight="bold">Total</Typography>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-start">
                <Typography>Subtotal: {checkoutCalculations.subTotal}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-start">
                <Typography>Delivery charge: {checkoutCalculations.deliveryTotal}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-start">
                <Typography>Discount(from points): {checkoutCalculations.discountFromUsedPoints}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-start" marginTop="10px">
                <Typography fontWeight="bold">Total (VAT included): {total}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center" marginTop="20px">
                {/*Use deduct points on the click of this button*/}
                <PaymentForm usedPoints={checkoutCalculations.discountFromUsedPoints * 100} total={total} products={products} handleClearBasket={handleClearBasket}/>
                {/*<Button variant="contained" className="checkout-btn">Checkout</Button>*/}
            </Grid>
        </CheckoutParentDiv>
    )
}

export default CheckoutComponent
