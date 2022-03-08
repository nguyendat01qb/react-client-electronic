import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../../actions";
import { generatePublicUrl } from "../../../urlConfig";
import "./style.css";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(props.cartItem.qty);
  const [max, setMax] = useState(false);
  const product = useSelector((state) => state.product);
  useEffect(() => {
    const { _id } = props.cartItem;
    // console.log(_id);
    const payload = {
      params: {
        productId: _id,
      },
    };
    dispatch(getProductDetailsById(payload));
  }, []);

  const { _id, name, price, img } = props.cartItem;

  const onQuantityIncrement = () => {
    if (Object.keys(product.productDetails).length > 0) {
      if (qty === product.productDetails[0].quantity) {
        setMax(true);
        return;
      }
    }
    setQty(qty + 1);
    props.onQuantityInc(_id, qty + 1);
  };

  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
    setMax(false);
    props.onQuantityDec(_id, qty - 1);
  };

  return (
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img src={generatePublicUrl(img)} alt={""} />
        </div>
        <div className="cartItemDetails">
          <div>
            <p>{name}</p>
            <p>
              {price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ
            </p>
          </div>
          <div>Giao hàng trong 3 - 5 ngày</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "5px 0",
        }}
      >
        {/* quantity control */}
        <div className="quantityControl">
          <button
            onClick={onQuantityDecrement}
            style={qty <= 1 ? { opacity: 0.5, cursor: "auto" } : {}}
          >
            -
          </button>
          <input value={qty} readOnly />
          <button
            onClick={onQuantityIncrement}
            style={max ? { opacity: 0.5, cursor: "auto" } : {}}
          >
            +
          </button>
        </div>
        <div
          style={{
            margin: "5px 0 0 30px",
            width: "400px",
            color: "red",
            fontSize: "12px",
          }}
        >
          {max ? <p>Sản phẩm trong kho đã hết</p> : ""}
        </div>
        {/* <button className="cartActionBtn">save for later</button> */}
        <button
          className="cartActionBtn"
          onClick={() => props.onRemoveCartItem(_id)}
        >
          Hủy
        </button>
      </div>
    </div>
  );
};

export default CartItem;
