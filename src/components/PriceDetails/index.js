import React from "react";
import Card from "../../components/UI/Card";

/**
 * @author
 * @function PriceDetails
 **/

const PriceDetails = (props) => {
  const p1 = 50000;
  const p2 = 25000;
  const price = props.totalPrice;

  const transportFee = () => {
    if (price > 10000000) return p1;
    if (price > 5000000) return p2;
    return 0;
  };

  const totalAmount = () => {
    if (price && transportFee()) return price + price * 0.0002 + transportFee();
    if (price && !transportFee()) return price + price * 0.0002;
    return 0;
  };
  return (
    <Card headerLeft={"Đơn giá chi tiết"} style={{ maxWidth: "380px" }}>
      <div
        style={{
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Giá ({props.totalItem} mặt hàng)</div>
          <div>
            {props.totalPrice
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
            vnđ
          </div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Phí vận chuyển</div>
          <div>
            {transportFee()
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
            vnđ
          </div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Thuế VAT</div>
          <div>
            {(props.totalPrice * 0.0002)
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
            vnđ
          </div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Tổng thanh toán</div>
          <div>
            {totalAmount()
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
            vnđ
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PriceDetails;
