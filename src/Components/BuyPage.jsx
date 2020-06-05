import React, { useState, useEffect } from "react";
import Axios from "axios";
import CartItem from "./CartItem";

import { random, commerce } from "faker";
import { Container, Col, Row } from "reactstrap";
import { cleanup } from "@testing-library/react";

const apiKey = "563492ad6f91700001000001042bb0f473df46698d8094cffe7ff630";

const url = "https://api.pexels.com/v1/search?query=laptop&per_page=6&page=1";
const localurl =
  "https://jsonware.com/json/3631f2ed0b38f18d32387d6c5c92c665.json";

const BuyPage = ({ addInCart }) => {
  const [product, setProduct] = useState([]);

  // const fetchPhotos = async () => {
  //   const response = await Axios.get(url, {
  //     header: {
  //       Authorization: apiKey,
  //     },
  //   });

  const fetchPhotos = async () => {
    const { data } = await Axios.get(localurl);

    const { photos } = data;

    const allProduct = photos.map((photo) => ({
      smallImage: photo.src.medium,
      tinyImage: photo.src.tiny,
      productName: random.word(),
      productPrice: commerce.price(),
      id: random.uuid(),
    }));

    setProduct(allProduct);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <Container fluid>
      <h1 className="text-success text-center">Buy Page</h1>
      <Row>
        {product.map((product) => (
          <Col md={4} key={product.id}>
            <CartItem product={product} addInCart={addInCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BuyPage;
