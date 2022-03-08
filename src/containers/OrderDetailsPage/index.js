import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrder } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import Price from "../../components/UI/Price";
import { generatePublicUrl } from "../../urlConfig";

import "./style.css";

/**
 * @author
 * @function OrderDetails
 **/

const OrderDetailsPage = (props) => {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.user.orderDetails);

  useEffect(() => {
    console.log({ props });
    const payload = {
      orderId: props.match.params.orderId,
    };
    dispatch(getOrder(payload));
  }, []);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    }
    return "";
  };

  const formatDate2 = (date) => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (date) {
      const d = new Date(date);
      return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
  };

  if (!(orderDetails && orderDetails.address)) {
    return null;
  }

  return (
    <Layout>
      <div id="paypal-button"></div>
      <div
        style={{
          width: "1160px",
          margin: "10px auto",
          marginTop: "100px",
        }}
      >
        <Card
          style={{
            margin: "10px 0",
          }}
        >
          <div className="delAdrContainer">
            <div className="delAdrDetails">
              <div className="delTitle">Địa chỉ giao hàng</div>
              <div className="delName">{orderDetails.address.name}</div>
              <div className="delAddress">
                {orderDetails.address.specificAddress +
                  " " +
                  orderDetails.address.town +
                  " " +
                  orderDetails.address.district +
                  " " +
                  orderDetails.address.province}
              </div>
              <div className="delPhoneNumber">
                Số điện thoại {orderDetails.address.mobileNumber}
              </div>
            </div>
            <div className="delMoreActionContainer">
              <div className="delTitle" style={{ fontWeight: 700 }}>
                Bảng tình trạng đơn hàng
              </div>
              <div className="delTitle">Bạn cũng có thể: </div>
              <Link to={`/invoice/${orderDetails._id}`} className="loginButton">
                Xem hoá đơn chi tiết
              </Link>
            </div>
          </div>
        </Card>

        {orderDetails.items.map((item, index) => (
          <Card
            style={{ display: "flex", padding: "20px 0", margin: "10px 0" }}
          >
            <div className="flexRow">
              <div className="delItemImgContainer">
                <img
                  src={generatePublicUrl(item.productId.productPictures[0].img)}
                  alt=""
                />
              </div>
              <div style={{ width: "300px", margin: "0 40px 0 60px" }}>
                <div className="delItemName">{item.productId.name}</div>
                Đơn giá: <Price value={item.payablePrice} />
                Số lượng: {item.purchasedQty}
              </div>
            </div>
            <div style={{ padding: "25px 50px" }}>
              <div className="orderTrack">
                {orderDetails.orderStatus.map((status) => (
                  <div
                    className={`orderStatus ${
                      status.isCompleted ? "active" : ""
                    }`}
                  >
                    <div
                      className={`point ${status.isCompleted ? "active" : ""}`}
                    ></div>
                    <div className="orderInfo">
                      <div className="status">{status.type}</div>
                      <div className="date">{formatDate(status.date)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ fontWeight: "500", fontSize: 14 }}>
              {orderDetails.orderStatus[3].isCompleted &&
                `Delivered on ${formatDate2(orderDetails.orderStatus[3].date)}`}
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default OrderDetailsPage;
