import {useEffect, useState} from "react";
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper} from "@mui/material";
import {getOrders} from "../../services/order.service";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders(
            response => {
                setOrders(response.data);
            },
            error => {
                console.log(error);
            }
        )
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="order table">
                <TableHead>
                    <TableRow>
                        <TableCell>ORDER ID</TableCell>
                        <TableCell align="right">SELLER</TableCell>
                        <TableCell align="right">AMOUNTs</TableCell>
                        <TableCell align="right">STATUS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow
                            key={order._id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {order._id}
                            </TableCell>
                            <TableCell align="right">{order._id}</TableCell>
                            <TableCell align="right">{order.total_amount}</TableCell>
                            <TableCell align="right">{order.products[0].status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminDashboard;
