import {useState} from 'react'
import {
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@mui/material'
import {Box} from '@mui/system'
import styled from 'styled-components'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {ColorSelectBoxGroup} from '../StyledComponents/StyledComponents'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import {isAuthenticated} from '../../utils/auth';

const ProductDetails = ({product, isFavorite, addToBasket, toggleWishList, fromWishlist = false}) => {
    const [formData, setFormData] = useState({
        product_id: product._id,
        size: product?.available_sizes?.length > 0 ? product.available_sizes[0] : '',
        colour: product.colour
    });

    const handleChangeColor = (colour) => {
        setFormData({
            ...formData,
            colour: colour
        })
    }

    const handleSelectSize = event => {
        setFormData({
            ...formData,
            size: event.target.value
        })
    }

    const handleAddToBasket = () => {
        addToBasket(formData)
    }

    const handleToggleWishList = () => {
        toggleWishList(product._id)
    }

    return (
        <ProductDetailWrapper className='details'>
            <Typography variant='h6' component={'h5'} color='#595959'>
                {product.brand}
            </Typography>
            <Typography variant='h4' component={'h4'} sx={{fontWeight: 'bold'}}>
                {product.title}
            </Typography>

            <Box display='flex' alignItems={'flex-end'} my={1}>
                <Typography variant='h5' sx={{fontWeight: 'medium'}}>
                    {product.price + '€'}
                </Typography>
                <Typography variant='caption' color='#595959'>
                    &nbsp; VAT included
                </Typography>
            </Box>
            {product.colour &&
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography my={1}>Colour:</Typography>
                    <ColorSelectBoxGroup colours={[product.colour]} value={formData.colour}
                                         handleChangeColor={handleChangeColor}/>
                </Box>}
            <Box className='actions'>
                {isAuthenticated() &&
                    <Typography
                        variant={'subtitle1'}
                        component='div'
                        className='highlighted-text'
                    >
                        Recommended size for your
                        profile: {product?.available_size?.length > 0 ? product.available_sizes[0].toUpperCase() : '-'}
                    </Typography>}
                <FormControl className='select-box'>
                    <InputLabel id='select-size-label'>Size</InputLabel>

                    <Select
                        labelId='select-size-label'
                        label='size'
                        value={formData.size}
                        onChange={handleSelectSize}
                        sx={{textAlign: 'start', borderRadius: 0, width: '100%'}}
                    >
                        {product.available_sizes?.map((size, index) => {
                            const isRecommendedSize = size === "XL" //todo: Change after recommended size done
                            return (
                                <MenuItem value={size} key={index}>
                                    {size.toUpperCase()} {isRecommendedSize ? '(Recommended)' : null}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <Box className='button-box'>
                    <Button
                        className='basket'
                        variant='contained'
                        sx={{flexGrow: 1}}
                        onClick={handleAddToBasket}
                    >
                        <Typography variant='subtitle1' sx={{fontWeight: 'bold'}}>
                            {'Add to Basket'}
                        </Typography>
                    </Button>
                    {!fromWishlist && <IconButton className='favorite' onClick={handleToggleWishList}>
                        {isFavorite ? <FavoriteIcon style={{color: 'pink'}}/> : <FavoriteBorderIcon/>}
                    </IconButton>}
                </Box>

                <Box className='additional-info'>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <LocalShippingIcon/> &nbsp;
                        <Typography fontWeight={'bold'}>Delivery</Typography>
                    </Box>
                    <Box className='info-item'>
                        <Typography variant='body1' component='div'>
                            {
                                product.expected_delivery_time
                                    ? product.expected_delivery_time - 1 + '-' + product.expected_delivery_time
                                    : '3-5'
                            }&nbsp; Working Days
                        </Typography>
                        <Typography
                            variant='body1'
                            component='div'
                            sx={{fontWeight: 'bold'}}
                        >
                            {product.delivery_charge > 0
                                ? product.delivery_charge + ' €'
                                : 'Free'}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </ProductDetailWrapper>
    )
}

const ProductDetailWrapper = styled.div`
  border: 1px solid;
  padding: 2rem;
  text-align: left;

  .actions {
    display: flex;
    flex-direction: column;
  }

  .highlighted-text {
    background-color: #f5f5f5;
    padding: 7px;
  }

  .select-box {
    margin-top: 15px;
  }

  .button-box {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }

  .basket {
    background: black;
    color: white;
    border-radius: 0;
  }

  .basket:hover {
    background: black;
  }

  .favorite {
    margin-left: 10px;
    color: black;
    border: black;
    border-width: 1px;
    border-style: solid;
    border-radius: 0;
  }

  .additional-info {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    border: 1px solid;
    border-color: #595959;
    padding: 10px;
  }

  .info-item {
    padding: 5px 7px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

export default ProductDetails
