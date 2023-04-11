import {useLocation} from 'react-router-dom'
import {
    Box,
    Modal,
    Typography
} from '@mui/material'
import {Container} from '@mui/system'
import styled from 'styled-components'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'
import React, {useState, useContext, useEffect} from 'react'
import {SnackBarContext} from '../../contexts/SnackbarContext'
import ProductDetails from '../../components/product/product-details.component'
import {addProductToBasket} from '../../services/basket.service'
import SwiperComponent from "../../components/product/my-swiper.component";


const OutfitRecommendationPage = () => {
    const location = useLocation()
    const recommendationSelection = location.state
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [open, setOpen] = React.useState(false)

    const {setSnack} = useContext(SnackBarContext)

    useEffect(() => {
        //@todo: implement api here; data to request is in [recommendationSelection] variable
    }, [])

    const data = {
        single: [
            {
                _id: '123123123',
                title: 'Product 1',
                brand: 'Zara',
                expected_delivery_time: 12,
                price: 120,
                delivery_charge: 10,
                available_sizes: ['S', 'M', 'L'],
                image: 'uploads/0E2EDA79-598A-49A2-B7F0-D4A2C0535DA5.jpeg'
            },
            {
                _id: '123sdaa123123',
                title: 'Product 1',
                brand: 'Zara',
                expected_delivery_time: 12,
                price: 120,
                delivery_charge: 10,
                available_sizes: ['S', 'M', 'L'],
                image: 'uploads/0E2EDA79-598A-49A2-B7F0-D4A2C0535DA5.jpeg'
            },
            {
                _id: '123sdf123123',
                title: 'Product 1',
                brand: 'Zara',
                expected_delivery_time: 12,
                price: 120,
                delivery_charge: 10,
                available_sizes: ['S', 'M', 'L'],
                image: 'uploads/0E2EDA79-598A-49A2-B7F0-D4A2C0535DA5.jpeg'
            },
            {
                _id: '12312sdf3123',
                title: 'Product 1',
                brand: 'Zara',
                expected_delivery_time: 12,
                price: 120,
                delivery_charge: 10,
                available_sizes: ['S', 'M', 'L'],
                image: 'uploads/0E2EDA79-598A-49A2-B7F0-D4A2C0535DA5.jpeg'
            },
            {
                _id: '231132',
                title: 'Product 2',
                brand: 'C&A',
                expected_delivery_time: 5,
                price: 99,
                delivery_charge: 10,
                available_sizes: ['XS', 'S', 'M', 'L'],
                image: 'uploads/02CA6BCD-2304-4326-984A-FB36D250A094.jpeg'
            },
            {
                _id: '2311sdf32',
                title: 'Product 2',
                brand: 'C&A',
                expected_delivery_time: 5,
                price: 99,
                delivery_charge: 10,
                available_sizes: ['XS', 'S', 'M', 'L'],
                image: 'uploads/02CA6BCD-2304-4326-984A-FB36D250A094.jpeg'
            }
        ],
        combined: [
            [
                {
                    _id: '5345sdf3',
                    title: 'Product 3',
                    brand: 'Zara',
                    expected_delivery_time: 12,
                    price: 120,
                    available_sizes: ['S', 'M', 'L'],
                    delivery_charge: 10,
                    image: 'uploads/0E2EDA79-598A-49A2-B7F0-D4A2C0535DA5.jpeg'
                },
                {
                    _id: '5345sdfs3',
                    title: 'Product 3',
                    brand: 'Zara',
                    expected_delivery_time: 12,
                    price: 120,
                    available_sizes: ['S', 'M', 'L'],
                    delivery_charge: 10,
                    image: 'uploads/0E2EDA79-598A-49A2-B7F0-D4A2C0535DA5.jpeg'
                },
                {
                    _id: '5323453',
                    title: 'Product 3',
                    brand: 'Zara',
                    expected_delivery_time: 12,
                    price: 120,
                    available_sizes: ['S', 'M', 'L'],
                    delivery_charge: 10,
                    image: 'uploads/0E2EDA79-598A-49A2-B7F0-D4A2C0535DA5.jpeg'
                },
                {
                    _id: '53452313',
                    title: 'Product 3',
                    brand: 'Zara',
                    expected_delivery_time: 12,
                    price: 120,
                    available_sizes: ['S', 'M', 'L'],
                    delivery_charge: 10,
                    image: 'uploads/0E2EDA79-598A-49A2-B7F0-D4A2C0535DA5.jpeg'
                },
                {
                    _id: '53424342',
                    title: 'Product 4',
                    brand: 'Zara',
                    expected_delivery_time: 12,
                    price: 120,
                    delivery_charge: 10,
                    available_sizes: ['S', 'M', 'L'],
                    image: 'uploads/0E2EDA79-598A-49A2-B7F0-D4A2C0535DA5.jpeg'
                },
                {
                    _id: '123235343443',
                    title: 'Product 5',
                    brand: 'Zara',
                    expected_delivery_time: 12,
                    price: 120,
                    delivery_charge: 10,
                    available_sizes: ['S', 'M', 'L'],
                    image: ''
                }
            ],
            [
                {
                    _id: '5345sdfs3',
                    title: 'Product 3',
                    brand: 'Zara',
                    expected_delivery_time: 12,
                    price: 120,
                    available_sizes: ['S', 'M', 'L'],
                    delivery_charge: 10,
                    image: 'uploads/0E2EDA79-598A-49A2-B7F0-D4A2C0535DA5.jpeg'
                },
                {
                    _id: '5323453',
                    title: 'Product 3',
                    brand: 'Zara',
                    expected_delivery_time: 12,
                    price: 120,
                    available_sizes: ['S', 'M', 'L'],
                    delivery_charge: 10,
                    image: 'uploads/0E2EDA79-598A-49A2-B7F0-D4A2C0535DA5.jpeg'
                },
                {
                    _id: '53452313',
                    title: 'Product 3',
                    brand: 'Zara',
                    expected_delivery_time: 12,
                    price: 120,
                    available_sizes: ['S', 'M', 'L'],
                    delivery_charge: 10,
                    image: 'uploads/0E2EDA79-598A-49A2-B7F0-D4A2C0535DA5.jpeg'
                },
                {
                    _id: '53424342',
                    title: 'Product 4',
                    brand: 'Zara',
                    expected_delivery_time: 12,
                    price: 120,
                    delivery_charge: 10,
                    available_sizes: ['S', 'M', 'L'],
                    image: 'uploads/0E2EDA79-598A-49A2-B7F0-D4A2C0535DA5.jpeg'
                },
                {
                    _id: '123235343443',
                    title: 'Product 5',
                    brand: 'Zara',
                    expected_delivery_time: 12,
                    price: 120,
                    delivery_charge: 10,
                    available_sizes: ['S', 'M', 'L'],
                    image: ''
                }
            ],


        ]
    }

    const handleModalClose = () => {
        setOpen(false)
    }

    const openProductDetailModal = product => {
        setSelectedProduct({
            ...product
        })

        setOpen(true)
    }

    const handleAddToBasket = async formData => {
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
        handleModalClose()
    }

    return (
        <React.Fragment>
            <Container>
                <RecommendationWrapper>
                    <Typography fontSize="24px" fontWeight="bold" marginTop="20px">
                        Single Recommendations
                    </Typography>
                    <SwiperComponent products={data.single} openProductDetailModal={openProductDetailModal}/>
                    <hr/>
                    <Typography fontSize="24px" fontWeight="bold" marginTop="20px">
                        Combined Recommendations
                    </Typography>
                    {
                        data.combined.map((productsArray, index) => {
                            return (
                                <Box className="combinedBox">
                                    <SwiperComponent key={index} products={productsArray}
                                                     openProductDetailModal={openProductDetailModal}/>
                                </Box>
                            );
                        })
                    }
                </RecommendationWrapper>
            </Container>
            <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <ProductDetails
                        product={selectedProduct}
                        isFavorite={false}
                        addToBasket={handleAddToBasket}
                        toggleWishList={() => {
                        }}
                        fromWishlist
                    />
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default OutfitRecommendationPage

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
}

const RecommendationWrapper = styled.div`
  margin-top: 2rem;
  height: 100%;

  .mySwiper {
    padding: 10px;
  }

  .mySwiperSlide {
  }

  .combinedSwiper {
    background-color: green;
  }

  .productItem {
    margin: 5px;
  }

  .combinedBox {
    overflow-x: scroll;
    display: flex;
    justify-content: center;
    background-color: #f5f5f5;
    margin-top: 1rem;
    border: 1px solid black;
  }
`
