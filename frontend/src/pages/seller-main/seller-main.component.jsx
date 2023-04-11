import React, {useState, useEffect} from 'react';
import {Grid} from "@mui/material";
import {getMyProducts} from "../../services/product.service";
import SellerProductList from "../../components/seller-product-list/seller-product-list.component";
import AddProductButton from "../../components/add-product-button/add-product-button.component";
import SearchBar from "../../components/action-bar/SearchBar";

const SellerMain = () => {
    const [searchfield, setSearchfield] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getMyProducts(
            response => {
                setProducts(response);
            },
            error => {
                console.log(error);
            }
        );
    }, []);

    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    };

    const filteredProducts = products.filter(product => {
        return product.title.toLowerCase().includes(searchfield.toLowerCase());
    });

    return (
        <>
            <Grid container justifyContent="flex-end">
                <Grid item xs={4} marginTop="10px" marginRight="10px">
                    <SearchBar onChange={onSearchChange}/>
                </Grid>
            </Grid>
            <SellerProductList products={filteredProducts}/>
            <AddProductButton buttonColour={"contained"} marginBottom={"10px"}/>
        </>
    );
};


export default SellerMain
