import {
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton
} from "@mui/material"

import DeleteIcon from '@mui/icons-material/Delete';

import {deleteProduct} from "../../services/product.service";
import EditClothingForm from "../edit-clothing-form/edit-clothing-form-component";

const SellerProducts = ({product, productId, productName, productPrice}) => {

    const removeProduct = () => {
        deleteProduct(
            productId,
            response => {
                // TODO: find a more elegant way to do this
                window.location.reload();
            },
            error => {
                console.log(error);
            }
        );
    };

    return (
        <ListItem id={productId}>
            <ListItemIcon>
                <img
                    crossOrigin={'anonymous'}
                    src={"http://localhost:8000/" + product.image}
                    alt="product"
                    style={{
                        maxHeight: "130px",
                        height: "auto",
                    }}
                />
            </ListItemIcon>
            <ListItemText
                primary={productName}
                secondary={"price: " + productPrice + "€"}
                sx={{textAlign: 'left', paddingLeft: '10px'}}
            />
            <EditClothingForm productId={productId} product={product}/>
            <IconButton
                sx={{
                    justifyContent: "flex-end",
                }}
                aria-label="delete"
                onClick={removeProduct}
            >
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    );
};

export default SellerProducts
