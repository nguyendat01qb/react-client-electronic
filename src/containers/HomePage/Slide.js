import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { generatePublicUrl } from "../../urlConfig";
import { addToCart, getProducts as listProducts } from "../../actions";
import { useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Price from "../../components/UI/Price";
import { IoIosCart } from "react-icons/io";
import { useState } from "react";
import { toast } from "react-toastify";

toast.configure();
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const useStyle = makeStyles({
  component: {
    marginTop: 12,
    background: "#ffffff",
    zIndex: 0,
  },
  deal: {
    padding: "15px 20px",
    display: "flex",
  },
  dealText: {
    fontSize: 22,
    fontWeight: 600,
    lineHeight: "32px",
    marginRight: 25,
  },
  timer: {
    color: "#2f2f2f",
    marginLeft: 10,
    display: "flex",
    alignItems: "center",
  },
  image: {
    height: 150,
  },
  button: {
    marginLeft: "auto",
  },
  text: {
    fontSize: 14,
    marginTop: 5,
  },
  wrapper: {
    padding: "25px 15px",
    color: "#000",
    textDecoration: "none",
    position: "relative",
    "&:hover": {
      cartIcon: {
        display: "block",
      },
    },
  },
  cartIcon: {
    position: "absolute",
    bottom: 10,
    background: "#2874f0",
    borderRadius: 4,
    color: "#fff",
    width: "30px",
    height: "30px",
    display: "block",
  },
  toast: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "2px",
    padding: "20px 0",
    minWidth: "400px",
    maxWidth: "450px",
    borderLeft: "4px solid #2874f0",
    boxShadow: "0px 5px 8px rgba(0, 0, 0, 0.08)",
    position: "fixed",
    top: "-400px",
    right: "32px",
  },
  toastIcon: {
    fontSize: "24px",
    padding: "0px 16px",
    color: "#2874f0",
  },
  toastBody: {
    flexGrow: 1,
  },
  toastTitle: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#333",
  },
  toastMsg: {
    fontSize: "14px",
    color: "#888",
    marginTop: "4px",
    lineHeight: 1.6,
  },
  toastClose: {
    padding: "0px 16px",
    fontSize: "20px",
    color: "rgba(0, 0, 0, 0.3)",
  },
});

const Slide = ({ title, value }) => {
  const classes = useStyle();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <Box className={classes.component}>
      <Box className={classes.deal}>
        <Typography className={classes.dealText}>{title}</Typography>
        <Button variant="contained" color="primary" className={classes.button}>
          Nhiều hơn
        </Button>
      </Box>
      <Divider />
      <Divider style={{ marginBottom: 18 }} />
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        centerMode={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={10000}
        keyBoardControl={true}
        showDots={false}
        containerClass="carousel-container"
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {value.map((product) => (
          <>
            <Link
              key={product._id}
              to={`/${product.slug}/${product._id}/p`}
              className={classes.wrapper}
            >
              <img
                src={generatePublicUrl(product.productPictures[0].img)}
                className={classes.image}
                alt={""}
              />
              <Typography
                className={classes.text}
                style={{ fontWeight: 600, color: "#212121", width: "80%" }}
              >
                {product.name}
              </Typography>
              <Typography className={classes.text}>
                <Price
                  color="#666"
                  fontSize="12px"
                  textDecoration="line-through"
                  value={product.priceOld}
                />
                <Price color="green" value={product.price} />
              </Typography>
              <Typography className={classes.text}>
                Kho: {product.quantity > 0 ? product.quantity : "Hết hàng"}
              </Typography>
            </Link>
            <button
              className={classes.cartIcon}
              style={
                product.quantity > 0
                  ? { right: "50px" }
                  : {
                      right: "50px",
                      opacity: 0.5,
                      cursor: "auto",
                    }
              }
              onClick={() => {
                const { _id, name, price } = product;
                const img = product.productPictures[0].img;
                if (product.quantity > 0) {
                  dispatch(addToCart({ _id, name, price, img }));
                } else {
                  return;
                }
              }}
            >
              <IoIosCart style={{ width: "100%" }} />
            </button>
          </>
        ))}
      </Carousel>
    </Box>
  );
};

export default Slide;
