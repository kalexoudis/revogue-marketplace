import styled from "styled-components";

export const ParentDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #F5F5F5;
  padding: 10px 30px;

  .basket-page-title {
    font-weight: bold;
    font-size: 18px;
    margin: 10px 30px;
  }

  .product-section {
    background-color: #F5F5F5;
  }

  .product-card {
    max-height: 300px;
    margin: 20px;
  }

  .delivery-details {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
  }

  .payment-methods-parent {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
  }

  .payment-methods-title {
    font-weight: bold;
    font-size: 18px;
    margin: 10px 30px;
  }

  .checkout-main {
    background-color: #FFFFFF;
    height: fit-content;
  }

  .checkout-accordion {
    width: 100%;
    margin-top: 20px;
  }

  .accordion-text-field {
    width: 100%;
  }

  .use-points-btn {
    width: 200px;
    height: 30px;
    color: black;
    border-color: black;
  }

  .brand-delivery-estimation {
    margin: 0px 12px;
  }
`;

export const CounterContainer = styled.div`
  display: flex;
  justify-content: center;

  .counterButton {
    background: #000;
    color: #fff;
    margin: 5px 0px;
    min-width: 30px !important;
    height: 30px;
  }

  .counterButton:hover {
    background: #000
  }

  .counterField {
    background: #E8E8E8;
    padding: 0px 7px;
    margin: 5px 5px;
    width: 30px !important;
    height: 30px;
  }
`;
