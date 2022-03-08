import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../actions";
import Layout from "../../components/Layout";
import Price from "../../components/UI/Price";

import "./style.css";

const Invoice = (props) => {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.user.orderDetails);

  useEffect(() => {
    console.log({ props });
    const payload = {
      orderId: props.match.params.orderId,
    };
    dispatch(getOrder(payload));
  }, []);

  if (!(orderDetails && orderDetails.address)) {
    return null;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout>
      <main
        className="m-5 p-5 lg:max-w-4xl lg:mx-auto bg-white
      rounded shadow"
        style={{ marginTop: "100px" }}
      >
        <header
          className="flex flex-col items-center
         mb-5 xl:flex-row xl:justify-between"
        >
          <div>
            <h2 className="font-bold uppercase tracking-wide text-4xl mb-3">
              Hóa đơn
            </h2>
          </div>

          <div>
            <p
              className="flex 
            justify-between flex-wrap"
            >
              <button
                onClick={() => handlePrint()}
                className="
                bg-gray-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-gray-500 hover:bg-transparent hover:text-gray-500 transition-all duration-300"
              >
                In hóa đơn
              </button>
            </p>
          </div>
        </header>

        <section className="mt-5" style={{ marginTop: "10vh" }}>
          <h2 className="text-xl upppercase">
            Khách hàng: {orderDetails.address.name}
          </h2>
          <p>
            Địa chỉ:{" "}
            {orderDetails.address.specificAddress +
              " " +
              orderDetails.address.town +
              " " +
              orderDetails.address.district +
              " " +
              orderDetails.address.province}
          </p>
          <p>Phương thức thanh toán: {orderDetails.paymentType}</p>
        </section>

        <article className="mt-5 flex items-end justify-end">
          <ul>
            <li>
              <span className="font-bold">Hóa đơn số: </span>
              {orderDetails._id}
            </li>
            <li>
              <span className="font-bold">Ngày nhận hóa đơn: </span>
              {orderDetails.createdAt}
            </li>
          </ul>
        </article>

        <section>
          <table width="100%" className="mb-10">
            <thead>
              <tr className="bg-gray-100 p-1">
                <td className="font-bold">Tên</td>
                <td className="font-bold">Số lượng</td>
                <td className="font-bold">Đơn giá</td>
                <td className="font-bold">Tổng cộng</td>
              </tr>
            </thead>
            {console.log(orderDetails)}
            {orderDetails.items.map((item, index) => (
              <React.Fragment key={index}>
                <tbody>
                  <tr>
                    <td>{item.productId.name}</td>
                    <td>{item.purchasedQty}</td>
                    <td>
                      <Price value={item.payablePrice} />
                    </td>
                    <td>
                      <Price value={item.purchasedQty * item.payablePrice} />
                    </td>
                  </tr>
                </tbody>
              </React.Fragment>
            ))}
            <tbody>
              <tr></tr>
              <tr>
                <td>Gíá tổng đơn hàng</td>
                <td></td>
                <td></td>
                <td>
                  <Price value={orderDetails.totalAmount} />
                </td>
              </tr>
              <tr>
                <td>Thuế VAT</td>
                <td></td>
                <td>
                  <Price value={orderDetails.VAT} />
                </td>
                <td>
                  <Price value={orderDetails.VAT} />
                </td>
              </tr>
              <tr>
                <td>Phí vận chuyển</td>
                <td></td>
                <td>
                  <Price value={orderDetails.shippingFee} />
                </td>
                <td>
                  <Price value={orderDetails.shippingFee} />
                </td>
              </tr>
              <tr>
                <td>Tổng thanh toán</td>
                <td></td>
                <td></td>
                <td style={{ fontWeight: 600 }}>
                  <Price
                    value={
                      orderDetails.payingThroughBank > 0
                        ? orderDetails.payingThroughBank
                        : orderDetails.paymentOnDelivery
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section></section>
        <footer>
          <ul className="flex flex-wrap items-center justify-center">
            <li>
              <span className="font-bold">Your Name: </span>
              {orderDetails.address.name}&nbsp;
            </li>
            <li>
              <span className="font-bold">Phone number: </span>
              {orderDetails.address.mobileNumber}&nbsp;
            </li>
            <li>
              <span className="font-bold">Phương thức thanh toán: </span>
              {orderDetails.paymentType}&nbsp;
            </li>
            <li>
              <span className="font-bold">Account holder: </span>
              {orderDetails.address.name}&nbsp;
            </li>
            <li>
              <span className="font-bold">Account number: </span>
              {orderDetails.address.mobileNumber}&nbsp;
            </li>
            <li>
              <span className="font-bold">Website: </span>{" "}
              <a
                href="https://cellelectronic.com"
                style={{ textDecoration: "none" }}
              >
                https://cellelectronic.com
              </a>
            </li>
          </ul>
        </footer>
      </main>
    </Layout>
  );
};

export default Invoice;
