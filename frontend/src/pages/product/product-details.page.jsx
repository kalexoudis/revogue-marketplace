import {useState, useEffect, useContext} from 'react'
import ImageGallery from 'react-image-gallery'
import { Container, Box } from '@mui/system'
import ProductDetails from '../../components/product/product-details.component'
import {CircularProgress, Grid, Paper} from '@mui/material'
import { getProductById } from '../../services/product.service'
import {useParams} from 'react-router-dom'
import { SnackBarContext } from '../../contexts/SnackbarContext'
import { isAuthenticated } from '../../utils/auth'
import {addProductToWishlist, deleteProductInWishlist, getWishlist} from '../../services/wishlist.service'
import {addProductToBasket} from "../../services/basket.service";

const ProductDetailsPage = () => {
    const { setSnack } = useContext(SnackBarContext);
    const {productId} = useParams()
    const baseImageUrl = process.env.REACT_APP_BACKEND_URL
    const [isLoading, setIsLoading] = useState(false);
    const [wishList, setWishList] = useState([])
    const [product, setProduct] = useState({});

    useEffect(() => {
        setIsLoading(true);

        getProductById(productId, (response) => {
                setProduct(response.data)
            },
            (error) => {
                let message = 'Something went wrong.';
                if(error.response.status === 404) {
                    message = "Product not found."
                }
                setSnack({
                    message: message,
                    severity: 'error',
                    open: true
                })
            }, () => {
                setIsLoading(false)
            })


    }, [])

    useEffect(() => {
        if (isAuthenticated()) {
            getWishlist()
                .then((response) => {
                    let list = response.data.data.map((item) => {
                        return item?._id
                    })
                    setWishList(list)
                })
                .catch((err) => {
                    setSnack({
                        message: 'Something went wrong',
                        severity: 'error',
                        open: true
                    })
                })
        }
    }, [])

    const handleAddToBasket = async(formData) => {
        try {
            await addProductToBasket(formData)

            setSnack({
                message: 'Product added to basket',
                severity: 'success',
                open: true
            })
        } catch (err) {
            setSnack({
                message: 'Something went wrong!',
                severity: 'error',
                open: true
            })
        }
    }

    const toggleProductInWishList = async () => {
        try {
            let message = '';
            if (wishList.includes(productId)) {
                message = 'Product removed from wishlist.'
                await deleteProductInWishlist(productId)
                const newWishList = wishList.filter((item) => item !== productId)
                setWishList(newWishList)
            } else {
                message = 'Product added to wishlist.'
                await addProductToWishlist({product_id: productId})
                setWishList([...wishList, productId])

            }
            setSnack({
                message: message,
                severity: 'success',
                open: true
            })
        } catch (err) {
            console.log(err)
            setSnack({
                message: 'Something went wrong',
                severity: 'error',
                open: true
            })
        }
    }

    return (
        <Container maxWidth='xl' sx={{ marginTop: 5 }}>
            {isLoading && <CircularProgress/> }
            {!isLoading &&
                <Grid container display='flex' spacing={2}>
                    <Grid item md={6} width={"100%"}>
                        <Box sx={{ backgroundColor: '#f5f5f5',display: 'flex', justifyContent: 'center'}}>
                            <img crossOrigin="anonymous" height={'500px'} src={product.image?baseImageUrl+'/'+product.image:'/noImage.png'} />
                            {/*<ImageGallery
                                originalHeight={'200px'}
                                thumbnailPosition={'left'}
                                items={}
                                useBrowserFullscreen={false}
                                showPlayButton={false}
                            />*/}
                        </Box>
                    </Grid>
                    <Grid item flexGrow={1} alignItems={'center'}>
                        <ProductDetails
                            product={product}
                            isFavorite={wishList.includes(product._id)}
                            addToBasket={handleAddToBasket}
                            toggleWishList={toggleProductInWishList}/>
                    </Grid>
                </Grid>
            }
        </Container>
    )
}

export default ProductDetailsPage
