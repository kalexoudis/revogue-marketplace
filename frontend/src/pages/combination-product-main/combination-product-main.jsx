import React, {useState} from 'react';

import CombinationProductList from "../../components/combination-product/combination-product-list.component";
import SearchBar from '../../components/action-bar/SearchBar';
import {
    Box,
} from "@mui/material";

const CombinationProductMain = () => {
    const [searchfield, setSearchfield] = useState('');
    const [products, setProducts] = useState(
        [
            {
                productId: "1",
                productName: "Product 1",
                seller: "Brand 1",
                price: "100",
                color: "red",
                sizes: ["xs", "s", "m"],
                sizeInfo: "xs",
                deliveryCost: 0,
                imgs: ["https://www.reserved.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/4/0/4061P-33X-003-1_5.jpg", "https://www.reserved.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/4/0/4061P-33X-001-1_5.jpg"]
            },
            {
                productId: "2",
                productName: "Product 2",
                seller: "Brand 2",
                price: "200",
                color: "green",
                sizes: ["xs", "s", "m"],
                sizeInfo: "xs",
                deliveryCost: 5,
                imgs: ["https://www.reserved.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/1/4/1408L-77X-010-1_7.jpg", "https://www.reserved.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/1/4/1408L-77X-013-1_7.jpg"]

            },
        ]
    );

    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    };

    const filteredProducts = products.filter(product => {
        return product.productName.toLowerCase().includes(searchfield.toLowerCase());
    });

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end"
        }}>
            <Box mx={5} mt={1} style={{width: "fit-content"}}>
                <SearchBar onChange={onSearchChange} value={searchfield}/>
            </Box>
            <CombinationProductList products={filteredProducts}/>
        </div>
    );
};


export default CombinationProductMain;
