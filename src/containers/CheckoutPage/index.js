import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrder,
  getAddress,
  getCartItems,
  login,
  signup as _signup,
} from "../../actions";
import Layout from "../../components/Layout";
import {
  Anchor,
  MaterialButton,
  MaterialInput,
} from "../../components/MaterialUI";
import PriceDetails from "../../components/PriceDetails";
import Card from "../../components/UI/Card";
import CartPage from "../CartPage";
import AddressForm from "./AddressForm";
import momoQr from "../../images/qr/momo/269831800_448623376925343_3948327536734450820_n.jpg";
// import Paypal from "./Paypal";

import "./style.css";

/**
 * @author
 * @function CheckoutPage
 **/

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
}) => {
  return (
    <div className="flexRow addressContainer">
      <div>
        <input name="address" onClick={() => selectAddress(adr)} type="radio" />
      </div>
      <div className="flexRow sb addressinfo">
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className="addressDetail">
              <div>
                <span className="addressName">{adr.name}</span>
                <span className="addressType">{adr.addressType}</span>
                <span className="addressMobileNumber">{adr.mobileNumber}</span>
              </div>
              {adr.selected && (
                <Anchor
                  name="SỬA"
                  onClick={() => enableAddressEditForm(adr)}
                  style={{
                    fontWeight: "500",
                    color: "#2874f0",
                  }}
                />
              )}
            </div>
            <div className="fullAddress">
              {`${adr.specificAddress ? adr.specificAddress : ""}, ${
                adr.town ? adr.town : ""
              }, ${adr.district ? adr.district : ""}, ${
                adr.province ? adr.province : ""
              }`}{" "}
              <br />{" "}
              {`${adr.state ? adr.state : ""} - ${
                adr.pinCode ? adr.pinCode : ""
              }`}
            </div>
            {adr.selected && (
              <MaterialButton
                title="GIAO HÀNG TẠI ĐÂY"
                onClick={() => confirmDeliveryAddress(adr)}
                style={{
                  width: "200px",
                  margin: "10px 0",
                }}
              />
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => {}}
          />
        )}
      </div>
    </div>
  );
};

const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const [paymentType, setPaymentType] = useState("");
  const [signup, setSignup] = useState(false);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [payBank, setPayBank] = useState(false);
  const [bankOnline, setBankOnline] = useState(false);
  const [momo, setMomo] = useState(false);
  const [click, setClick] = useState(false);
  const [bank, setBank] = useState(false);

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // console.log(paymentType);

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const selectAddress = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };

  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      },
      0
    );

    let shippingFee = 0;
    if (totalAmount >= 10000000) shippingFee = 50000;
    if (totalAmount >= 5000000) shippingFee = 25000;
    const VAT = totalAmount * 0.0002;

    let payingThroughBank = 0;
    let paymentOnDelivery = 0;

    if (paymentType === "Qua ngân hàng") {
      payingThroughBank = totalAmount + shippingFee + VAT;
    }
    if (paymentType === "Thanh toán khi nhận hàng") {
      paymentOnDelivery = totalAmount + shippingFee + VAT;
    }

    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));

    const payload = {
      addressId: selectedAddress._id,
      shippingFee,
      VAT,
      totalAmount,
      payingThroughBank,
      paymentOnDelivery,
      items,
      // paymentStatus,
      paymentType,
      // productQuantity
    };
    dispatch(addOrder(payload));
    payload.paymentType === "Qua ngân hàng"
      ? setConfirmPayment(true)
      : setConfirmOrder(true);
  };

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
    //user.address.length === 0 && setNewAddress(true);
  }, [user.address]);

  useEffect(() => {
    if (confirmOrder && user.placedOrderId) {
      props.history.push(`/order_details/${user.placedOrderId}`);
    }
    if (confirmPayment && user.placedOrderId) {
      props.history.push(`/order_details/${user.placedOrderId}`);
    }
  }, [user.placedOrderId]);

  const userSignup = () => {
    const user = { username, fullname, phone, email, password };
    if (
      username === "" ||
      fullname === "" ||
      phone === "" ||
      email === "" ||
      password === ""
    ) {
      return;
    }

    dispatch(_signup(user));
  };

  const userLogin = () => {
    if (signup) {
      userSignup();
    } else if (login) {
      dispatch(login({ username, password }));
    }
  };

  // console.log(bankOnline);

  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <div className="checkoutContainer">
          {/* check if user logged in or not */}
          <CheckoutStep
            stepNumber={"1"}
            title={"NGƯỜI DÙNG"}
            active={!auth.authenticate}
            body={
              auth.authenticate ? (
                <div className="loggedInId">
                  <span style={{ fontWeight: 500 }}>{auth.user.fullname}</span>
                  <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                </div>
              ) : (
                <div>
                  <MaterialInput
                    type="text"
                    label="Tên đăng nhập"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />

                  {signup && (
                    <MaterialInput
                      type="text"
                      label="Tên đầy đủ"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  )}

                  {signup && (
                    <MaterialInput
                      type="text"
                      label="Địa chỉ email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  )}

                  {signup && (
                    <MaterialInput
                      type="text"
                      label="Số điện thoại"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  )}

                  <MaterialInput
                    type="password"
                    label="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // rightElement={<a href="#">Forgot?</a>}
                  />

                  <div style={{ display: "block" }}>
                    <MaterialButton
                      title={signup ? "Đăng ký" : "Đăng nhập"}
                      bgColor="#fb641b"
                      textColor="#ffffff"
                      style={{
                        margin: "40px 0 20px 0",
                      }}
                      onClick={signup ? userSignup : userLogin}
                    />

                    {signup && (
                        <MaterialButton
                          title="Đăng nhập"
                          bgColor="#ffffff"
                          textColor="#2874f0"
                          style={{
                            margin: "20px 0",
                          }}
                          onClick={() => {
                            setSignup(false);
                          }}
                        />
                      ) && (
                        <div>
                          Chuyển đến trang đăng nhập{" "}
                          <button
                            onClick={() => {
                              setSignup(false);
                            }}
                            style={{ color: "#2874f0" }}
                          >
                            Đăng nhập
                          </button>
                        </div>
                      )}
                    {!signup && (
                        <MaterialButton
                          title="Đăng ký"
                          bgColor="#ffffff"
                          textColor="#2874f0"
                          style={{
                            margin: "20px 0",
                          }}
                          onClick={() => {
                            setSignup(true);
                          }}
                        />
                      ) && (
                        <div>
                          Bạn chưa có tài khoản?{" "}
                          <button
                            onClick={() => {
                              setSignup(true);
                            }}
                            style={{ color: "#2874f0" }}
                          >
                            Đăng ký
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              )
            }
          />
          <CheckoutStep
            stepNumber={"2"}
            title={"ĐỊA CHỈ GIAO HÀNG"}
            active={!confirmAddress && auth.authenticate}
            body={
              <>
                {confirmAddress ? (
                  <div className="stepCompleted">{`${selectedAddress.name} - ${selectedAddress.specificAddress}, ${selectedAddress.town}, ${selectedAddress.district}, ${selectedAddress.province} - ${selectedAddress.pinCode}`}</div>
                ) : (
                  address.map((adr) => (
                    <Address
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                      adr={adr}
                    />
                  ))
                )}
              </>
            }
          />

          {/* AddressForm */}
          {confirmAddress ? null : newAddress ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
          ) : auth.authenticate ? (
            <CheckoutStep
              stepNumber={"+"}
              title={"THÊM ĐỊA CHỈ MỚI"}
              active={false}
              onClick={() => setNewAddress(true)}
            />
          ) : null}

          <CheckoutStep
            stepNumber={"3"}
            title={"SỐ LƯỢNG MẶT HÀNG"}
            active={orderSummary}
            body={
              orderSummary ? (
                <CartPage onlyCartItems={true} />
              ) : orderConfirmation ? (
                <div className="stepCompleted">
                  {Object.keys(cart.cartItems).length > 0
                    ? Object.keys(cart.cartItems).length
                    : // : (alert("Bạn chưa có đơn hàng nào"),
                      //   props.history.push(`/cart`))}{" "}
                      Object.keys(cart.cartItems).length}{" "}
                  mặt hàng
                </div>
              ) : null
            }
          />

          {orderSummary && (
            <Card
              style={{
                margin: "10px 0",
              }}
            >
              <div
                className="flexRow sb"
                style={{
                  padding: "20px",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "12px" }}>
                  Bạn có {Object.keys(cart.cartItems).length} mặt hàng
                </p>
                <MaterialButton
                  title="TIẾP TỤC"
                  onClick={userOrderConfirmation}
                  style={{
                    width: "200px",
                  }}
                />
              </div>
            </Card>
          )}
          <CheckoutStep
            stepNumber={"4"}
            title={"PHƯƠNG THỨC THANH TOÁN"}
            active={paymentOption}
            body={
              paymentOption && (
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        width: "100%",
                        margin: "10px 0 5px 10px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentOption"
                        value="Thanh toán khi nhận hàng"
                        checked={paymentType === "Thanh toán khi nhận hàng"}
                        onChange={(e) => setPaymentType(e.target.value)}
                      />
                      Thanh toán khi nhận hàng
                    </div>
                    <div
                      style={{
                        // margin: "5px 0 10px 10px",
                        width: "100%",
                        margin: "10px 0 5px 10px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentOption"
                        value="Qua ngân hàng"
                        checked={paymentType === "Qua ngân hàng"}
                        onChange={(e) => setPaymentType(e.target.value)}
                      />
                      {/* <div style={{ display: "block", width: "580px" }}> */}
                      Qua ngân hàng
                      {/* </div> */}
                    </div>
                  </div>
                  <MaterialButton
                    title="TIẾP TỤC HOẶC XÁC NHẬN ĐƠN HÀNG"
                    onClick={() => {
                      if (paymentType === "Qua ngân hàng") {
                        setPayBank(true);
                      } else {
                        onConfirmOrder();
                        setPayBank(false);
                      }
                      setClick(true);
                    }}
                    style={
                      click
                        ? { display: "none" }
                        : {
                            width: "200px",
                            margin: "50px 0 20px 340px",
                          }
                    }
                  />
                </div>
              )
            }
          />

          <CheckoutStep
            stepNumber={"5"}
            title={"THANH TOÁN ONLINE"}
            active={payBank}
            body={
              payBank && (
                <div style={{ display: "flex", margin: "20px 0" }}>
                  <MaterialButton
                    title="Thanh toán qua ngân hàng"
                    onClick={() => {
                      setBankOnline(true);
                      setMomo(false);
                    }}
                    style={{
                      display: "inline-block",
                      width: "345px",
                      margin: "0 80px 20px 28px",
                    }}
                  />
                  <MaterialButton
                    title="Thanh toán qua Momo"
                    onClick={() => {
                      setMomo(true);
                      setBankOnline(false);
                    }}
                    style={{
                      width: "345px",
                      margin: "0 0 20px 20px",
                    }}
                  />
                </div>
              )
            }
          />

          <CheckoutStep
            stepNumber={"6"}
            title={"CHI TIẾT THANH TOÁN"}
            active={payBank}
            body={
              bankOnline ? (
                <div style={{ margin: "20px" }}>
                  <h2>THANH TOÁN QUA NGÂN HÀNG</h2>
                  <p>
                    Thanh toán bằng hình thức chuyển khoản với thông tin sau
                  </p>
                  <br />
                  <p>
                    Số tài khoản:
                    <p
                      style={{
                        fontWeight: 600,
                        display: "inline-block",
                        marginLeft: "20px",
                      }}
                    >
                      044 201 001 681
                    </p>
                  </p>
                  <p>
                    Tên chủ tài khoản:{" "}
                    <p
                      style={{
                        fontWeight: 600,
                        display: "inline-block",
                        marginLeft: "20px",
                      }}
                    >
                      NGUYEN VAN DAT
                    </p>
                  </p>
                  <p>
                    Ngân hàng:{" "}
                    <p
                      style={{
                        fontWeight: 600,
                        display: "inline-block",
                        marginLeft: "20px",
                      }}
                    >
                      Ngân hàng Agribank - chi nhánh Đà Nẵng
                    </p>
                  </p>
                  <p>
                    Nội dung chuyển khoản:{" "}
                    <p
                      style={{
                        fontWeight: 600,
                        display: "inline-block",
                        marginLeft: "20px",
                      }}
                    >
                      &#60;Địa chỉ email của bạn&#62; - &#60;Tên đầy đủ của
                      bạn&#62; - Thanh toán hóa đơn Cell Ellectronic
                    </p>
                  </p>
                  <MaterialButton
                    title="XÁC NHẬN ĐƠN HÀNG"
                    onClick={onConfirmOrder}
                    style={{
                      width: "200px",
                      margin: "20px 20px 20px 550px",
                      right: 0,
                    }}
                  />
                </div>
              ) : momo ? (
                <div style={{ margin: "20px" }}>
                  <h2>THANH TOÁN QUA MOMO</h2>
                  <p>
                    Bạn có thể thanh toán qua số điện thoại{" "}
                    <p style={{ fontWeight: 600 }}>0372 300 544</p> hoặc quét mã
                    QR bên dưới
                  </p>
                  <div>
                    <img
                      style={{
                        width: "200px",
                        height: "200px",
                        display: "block",
                        margin: "auto",
                      }}
                      src={momoQr}
                    />
                  </div>
                  <p>
                    Nội dung chuyển khoản:{" "}
                    <p
                      style={{
                        fontWeight: 600,
                        marginLeft: "50px",
                      }}
                    >
                      &#60;Địa chỉ email của bạn&#62; - &#60;Tên đầy đủ của
                      bạn&#62; - Thanh toán hóa đơn Cell Ellectronic
                    </p>
                  </p>
                  <MaterialButton
                    title="XÁC NHẬN ĐƠN HÀNG"
                    onClick={onConfirmOrder}
                    style={{
                      width: "200px",
                      margin: "20px 20px 20px 550px",
                    }}
                  />
                </div>
              ) : (
                ""
              )
            }
          />

          <div style={{ marginBottom: "100px" }}></div>
        </div>

        {/* Price Component */}
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        />
      </div>
    </Layout>
  );
};

export default CheckoutPage;
