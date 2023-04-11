import {Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
import OrdersItemSellerComponent from "./orders-item-seller.component";

const OrdersTableSeller = ({orders}) => {
    return (
        <TableContainer component={Paper}>
            <Table arial-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>ORDER ID</TableCell>
                        {/*<TableCell align="right">Purchased on</TableCell>*/}
                        {/*<TableCell align="right">Address</TableCell>*/}
                        <TableCell align="right">Total (in €)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orders.map((order, i) => {
                            return (
                                <OrdersItemSellerComponent
                                    key={i}
                                    _id={orders[i]._id}
                                    total_amount={orders[i].total_amount}
                                    products={orders[i].products}
                                />
                            );
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrdersTableSeller;
