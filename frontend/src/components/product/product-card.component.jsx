import {
    Box,
    Button,
    Card,
    Grid,
    Link,
    Stack,
    Typography
} from '@mui/material'

const ProductCard = ({product, openProductDetailModal}) => {
    const baseImageUrl = process.env.REACT_APP_BACKEND_URL

    return (
        <Card>
            <Stack className='sr-image-stack'>
                <img
                    style={{height: '400px'}}
                    crossOrigin='anonymous'
                    src={baseImageUrl + '/' + product.image}
                />
            </Stack>
            <Stack className='sr-product-details-stack'>
                <Grid
                    container
                    className='parent-sr-item-prod-details'
                    display='flex'
                    justifyContent='left'
                    padding='15px'
                >
                    <Grid item>
                        <Typography
                            className='brand-name'
                            align='left'
                            fontFamily='Italic'
                        >
                            {product.brand}
                        </Typography>
                        <Link href={"/product/" + product._id} underline={"hover"}>
                            <Typography className="item-name" align="left" fontWeight="bold">
                                {product.title}
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
                <Box display={'flex'} justifyContent={'space-between'} padding={'0px 15px'}>
                    <Typography
                        className='delivery-charge-information'
                        margin='5px 0px'
                        fontStyle='Italic'
                    >
                        {product.delivery_charge === 0
                            ? 'Free Delivery'
                            : 'Delivery: ' + product.delivery_charge}
                    </Typography>
                    <Typography
                        className='price'
                        margin='5px 5px'
                        fontWeight='bold'
                        variant="h6"
                    >
                        {product.price} €
                    </Typography>
                </Box>
            </Stack>
            <Stack className='sr-item-actions-stack'>
                <Grid
                    container
                    className='sr-item-actions-grid'
                    justifyContent='center'
                    alignItems='center'
                    padding='0px 15px 15px'
                >
                    <Button
                        onClick={() => openProductDetailModal(product)}
                        className='primary-btn-small'
                        variant='contained'
                        size='small'
                    >
                        Add to basket
                    </Button>
                </Grid>
            </Stack>
        </Card>
    );
}

export default ProductCard;