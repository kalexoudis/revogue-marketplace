import {Divider, List, ListSubheader} from '@mui/material';

import SellerProducts from "../seller-products/seller-products.component";


const SellerProductList = ({products}) => {
    return (
        < List
            sx={{
                width: "100%",
                bgcolor: "background.paper",
                alignSelf: "left",
            }}
        >
            < ListSubheader
                sx={
                    {
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "black",
                    }
                }
            >
                Clothes
            < /ListSubheader>
            {
                products
                    .map((product, i) => {
                        return (
                            <div key={products[i]._id}>
                                <SellerProducts
                                    product={product}
                                    productId={products[i]._id}
                                    productName={products[i].title}
                                    productPrice={products[i].price}
                                />
                                <Divider/>
                            </div>
                        );
                    })
            }
        </List>
    );
};

export default SellerProductList
