import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { IoIosArrowForward } from "react-icons/io";

import "./style.css";
import { Breed } from "../../components/MaterialUI";
import { generatePublicUrl } from "../../urlConfig";

const OrderPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const payStatus = (status) => {
    let type;
    status.map((sta) => {
      if (sta.type === "Đã hoàn thành" && sta.isCompleted) {
        return (type = "Đã hoàn thành");
      } else if (sta.type === "Đã hủy" && sta.isCompleted) {
        // setDestroy(true);
        return (type = "Đã hủy");
      } else if (sta.type === "Hoàn lại" && sta.isCompleted) {
        return (type = "Hoàn lại");
      } else if (sta.type === "Đang chờ xử lý" && sta.isCompleted) {
        return (type = "Đang chờ xử lý");
      }
    });
    return type;
  };

  return (
    <Layout>
      <div
        style={{ maxWidth: "1160px", margin: "5px auto", marginTop: "60px" }}
      >
        <Breed
          breed={[
            { name: "Home", href: "/" },
            { name: "My Account", href: "/account" },
            { name: "My Orders", href: "/account/orders" },
          ]}
          breedIcon={<IoIosArrowForward />}
        />
        {user.orders.map((order) => {
          return order.items.map((item) => (
            <Card style={{ display: "block", margin: "5px 0" }}>
              <Link
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                }}
                to={`/react-client-electronic/order_details/${order._id}`}
                className="orderItemContainer"
              >
                <div className="orderImgContainer">
                  <img
                    className="orderImg"
                    src={generatePublicUrl(
                      item.productId.productPictures[0].img
                    )}
                    alt={""}
                  />
                </div>
                <div className="orderRow">
                  <div className="orderName textStyle">
                    {item.productId.name}
                  </div>
                  <div className="orderPrice textStyle">
                    Đơn giá
                    <br />
                    <br />
                    {item.payablePrice
                      .toFixed(0)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                    đ
                  </div>
                  <div className="orderPrice textStyle">
                    Số lượng
                    <br />
                    <br />
                    {item.purchasedQty}
                  </div>
                  <div className="textStyle">
                    {payStatus(order.paymentStatus)}
                  </div>
                </div>
              </Link>
            </Card>
          ));
        })}
      </div>
    </Layout>
  );
};

export default OrderPage;
