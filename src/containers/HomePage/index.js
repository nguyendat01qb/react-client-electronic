import { Box, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { FiChevronUp } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerOrders } from "../../actions";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import Banner from "./Banner";
// import NavBar from "./NavBar";
import Slide from "./Slide";

const useStyle = makeStyles({
  component: {
    padding: 10,
    background: "#f2f2f2",
  },
  rightWrapper: {
    background: "#ffffff",
    padding: 5,
    margin: "12px 0 0 10px",
    width: "17%",
  },
});

const HomePage = () => {
  const classes = useStyle();
  const product = useSelector((state) => state.product);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [showGoToTop, setShowGoToTop] = useState(false);

  const adURL =
    "https://genk.mediacdn.vn/Images/Uploaded/Share/2011/02/28/38IPhone.jpg";
  useEffect(() => {
    const handleScroll = () => {
      setShowGoToTop(window.scrollY >= 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(getCustomerOrders());
  }, []);

  const productPercent = [];
  product.products.map((product) => {
    (100 - (product.price / product.priceOld) * 100).toFixed(0) > 10 &&
      productPercent.push(product);
    // console.log(productPercent);
  });

  const orderList = [];
  order.orders.map((orderItems) => {
    orderItems.items.map((itemProducts) => {
      product.products.map((productItem) =>
        itemProducts.productId._id === productItem._id
          ? orderList.push(productItem)
          : ""
      );
    });
  });

  const productCheap = [];
  product.products.map((productItem) => {
    productItem.price < 10000000 && productCheap.push(productItem);
  });

  const prosuctTablet = [];
  product.products.map((productItem) => {
    if (productItem.slug.includes("May-tinh-bang-")) {
      prosuctTablet.push(productItem);
    }
  });
  // console.log(prosuctTablet);

  return (
    <Layout>
      {/* <NavBar /> */}
      <Box className={classes.component}>
        <Banner />
        <Box style={{ display: "flex" }}>
          <Box style={{ width: "83%" }}>
            <Slide title="Ưu đãi trong ngày" value={productPercent} />
          </Box>
          <Box className={classes.rightWrapper}>
            <img src={adURL} alt={""} style={{ width: 245, height: 345 }} />
          </Box>
        </Box>
      </Box>

      <Slide title="Giảm giá cho bạn" value={productPercent} />

      <Slide title="Các mặt hàng được đề xuất" value={productPercent} />

      <Slide title="Bạn cũng có thể tham khảo" value={prosuctTablet} />

      {/* <Slide title="Lựa chọn hàng đầu" value={orderList} /> */}

      <Slide title="Các đề mục được đề xuất" value={productCheap} />

      {/* <Slide title="Bán chạy nhất" value={orderList} /> */}
      {showGoToTop && (
        <button
          style={{
            position: "fixed",
            right: 20,
            bottom: 20,
            borderRadius: "50%",
            width: 50,
            height: 50,
            backgroundColor: "#2874f0",
            transition: "0.35s ease",
          }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <FiChevronUp style={{ margin: "0 auto", fontSize: "32px" }} />
        </button>
      )}
      <Footer style={{ width: "100%" }} />
    </Layout>
  );
};

export default HomePage;
