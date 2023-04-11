import {Swiper, SwiperSlide} from 'swiper/react'
import {Grid as SwiperGrid, Navigation, Pagination} from 'swiper'
import ProductCard from "./product-card.component";

const SwiperComponent = ({products, openProductDetailModal}) => {
    return (
        <Swiper
            slidesPerView={4}
            spaceBetween={30}
            navigation={true}
            pagination={{
                clickable: true
            }}
            breakpoints={{
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                425: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
            }}
            modules={[SwiperGrid, Pagination, Navigation]}
            className='mySwiper'
        >
            {products.map(product => {
                return (
                    <SwiperSlide key={product._id} className='mySwiperSlide'>
                        <ProductCard product={product} openProductDetailModal={openProductDetailModal}/>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    );
}

export default SwiperComponent