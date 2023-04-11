import {Box} from '@mui/material';

import CombinationProduct from "./combination-product.component";


const CombinationProductList = ({products}) => {
    return (
        < Box
            sx={{
                width: "100%",
                bgcolor: "background.paper",
                alignSelf: "left",
            }}
        >
            {
                products
                    .map((product, i) => {
                        return (
                            <Box m={5} boxShadow={3} key={products[i].id}>
                                <CombinationProduct
                                    productId={products[i].productId}
                                    productName={products[i].productName}
                                    productPrice={products[i].price}
                                    productSizes={products[i].sizes}
                                    productSeller={products[i].seller}
                                    productSizeInfo={products[i].sizeInfo}
                                    productColor={products[i].color}
                                    deliveryCost={products[i].deliveryCost}
                                    productImgs={products[i].imgs}
                                />
                            </Box>
                        );
                    })
            }
        </Box>
    );
};

export default CombinationProductList
