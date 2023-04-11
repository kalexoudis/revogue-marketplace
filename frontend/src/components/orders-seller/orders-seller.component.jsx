import {useState, useEffect} from "react";

import OrdersTableSeller from "./orders-table-seller.component";
import {getOrders} from "../../services/order.service";


const OrdersSeller = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders(
            response => {
                setOrders(response.data);
                console.log(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    return (
        <OrdersTableSeller orders={orders}/>
    );
};

export default OrdersSeller;
