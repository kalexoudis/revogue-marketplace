import {useState} from "react";
import {
    Table,
    TableRow,
    TableBody,
    TableHead,
    TableCell,
    IconButton,
    Typography,
    Collapse,
    Box,
    Button
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const OrdersItemSeller = ({products, _id, total_amount}) => {
    const [open, setOpen] = useState(false);
    const updateOrder = () => {
        updateOrder(_id, products,
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
            }
        );
    }
    return (
        <>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{_id}</TableCell>
                <TableCell align="right">{total_amount}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Products
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>SIZE</TableCell>
                                        <TableCell align="right">STATUS</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product, i) => (
                                        <TableRow key={product.id}>
                                            <TableCell component="th" scope="row">{product.id}</TableCell>
                                            <TableCell>{product.size}</TableCell>
                                            <TableCell align="right">
                                                {product.status == "created"
                                                    ? (
                                                        <Button variant="outlined"
                                                                size="small"
                                                                style={{
                                                                    borderColor: "black",
                                                                    color: "black",
                                                                    height: "20px",
                                                                    textTransform: 'none'
                                                                }}
                                                                onClick={updateOrder}>
                                                            shipped?
                                                        </Button>
                                                    )
                                                    : product.status
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default OrdersItemSeller;
