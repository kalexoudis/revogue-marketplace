import {Routes, Route} from "react-router-dom";
import React, {useEffect, useState} from "react";

import './App.css';

import Homepage from "./pages/homepage/homepage.component";
import SignIn from "./components/sign-in/sign-in.component";
import SignUp from "./components/sign-up/sign-up.component";
import SignUpSeller from "./components/sign-up/sign-up-seller.component";
import AboutUs from "./pages/about-us/about-us.component";
import SellerMain from "./pages/seller-main/seller-main.component";
import OrdersSellerPage from "./pages/orders-seller/orders-seller-page.component";
import OutfitRecommendationPage from "./pages/RecommendationPage/outfitRecommendationPage";
import MainLayout from "./components/layout/MainLayout";
import MyAccountDetailsPage from "./pages/accountPage/MyAccountDetailsPage";
import WishlistPage from "./pages/wishlistPage/WishlistPage";
import Basket from "./pages/basket/BasketPage";
import CombinationProductMain from "./pages/combination-product-main/combination-product-main";
import BodyMeasurements from "./pages/body-measurements/body-measurements.component";
import OtherFeatures from "./pages/other-features/other-features.component";
import OrderDetailsPage from "./pages/accountPage/orderDetails/OrderDetailsPage";
import MyPointsPage from "./pages/accountPage/MyPointsPage";
import MyOrdersPage from "./pages/accountPage/MyOrdersPage";
import AdminDashboardPage from "./pages/admin-dashboard/admin-dashboard-page.component";
import AddProductPage from "./pages/add-product/add-product-page.component";
import SearchResultPage from "./pages/search/SearchResultPage";
import EditSellerProfilePage from "./pages/edit-seller-profile/edit-seller-profile-page.component";
import ProductDetailsPage from "./pages/product/product-details.page";

function App() {

    return (
        <div className="App">
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/about" element={<AboutUs/>}/>
                    <Route path="/sign-in" element={<SignIn/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                    <Route path="/sign-up-seller" element={<SignUpSeller/>}/>
                    <Route path="/edit-profile" element={<EditSellerProfilePage/>}/>
                    <Route path="/body-measurement" element={<BodyMeasurements/>}/>
                    <Route path="/other-features" element={<OtherFeatures/>}/>
                    <Route path="/seller-main" element={<SellerMain/>}/>
                    <Route path="/seller-orders" element={<OrdersSellerPage/>}/>
                    <Route path="/add-coat" element={<AddProductPage type_of_clothes="coat"/>}/>
                    <Route path="/add-skirt" element={<AddProductPage type_of_clothes="skirt"/>}/>
                    <Route path="/add-trousers" element={<AddProductPage type_of_clothes="trouser"/>}/>
                    <Route path="/outfit-recommendation" element={<OutfitRecommendationPage/>}/>
                    <Route path="/wishlist" element={<WishlistPage/>}/>
                    <Route path="/basket" element={<Basket/>}/>
                    <Route path="/combination-product" element={<CombinationProductMain/>}/>
                    <Route path="/product/:productId" element={<ProductDetailsPage />} />
                    <Route path="/order-details/:orderId" element={<OrderDetailsPage/>}/>
                    <Route path="/account/details" element={<MyAccountDetailsPage/>}/>
                    <Route path="/account/points" element={<MyPointsPage/>}/>
                    <Route path="/account/orders" element={<MyOrdersPage/>}/>
                    <Route path="/admin/dashboard" element={<AdminDashboardPage/>}/>
                    <Route path="/searchResult" element={<SearchResultPage/>}/>
                </Routes>
            </MainLayout>
        </div>
    );
}

export default App;
