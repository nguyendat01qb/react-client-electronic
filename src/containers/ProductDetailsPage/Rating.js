import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { updateProductReview } from "../../actions/product.action";
import { useDispatch } from "react-redux";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function Rating(props) {
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [idProduct, setIdProduct] = useState(props.productDetail._id);
  const [review, setReview] = useState("");
  const [rate, setRate] = useState(0);
  const dispatch = useDispatch();
  const handleClick = (value) => {
    console.log(value);
    setCurrentValue(value);
    setRate(value);
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const updateReview = () => {
    console.log([idProduct, review, rate]);
    const reviews = { _id: idProduct, review, rating: rate };
    dispatch(updateProductReview(reviews));
    setRate(0);
    setReview("");
    window.location.reload(true);
  };

  return (
    <div style={{ display: "block", margin: "50px 100px 100px 100px" }}>
      <h2>Đánh giá</h2>
      <div style={{ display: "flex", marginTop: "5px" }}>
        {stars.map((_, index) => {
          return (
            <FaStar
              style={{ marginRight: 10, cursor: "pointer" }}
              key={index}
              size={24}
              color={
                (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </div>
      <textarea
        placeholder="Phản hồi của bạn về sản phẩm này"
        style={{
          width: "60%",
          height: "150px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          margin: "10px 0",
          padding: "5px",
          display: "block",
        }}
        onChange={(e) => setReview(e.target.value)}
      />
      <button
        style={{
          background: "#2874f0",
          color: "#fff",
          borderRadius: "4px",
          margin: "5px",
          padding: "6px 10px",
        }}
        onClick={updateReview}
      >
        Submit
      </button>

      <div style={{ display: "block" }}>
        <table>
          <tr
            style={{
              textAlign: "center",
              borderBottom: "2px solid #000",
              margin: "20px 0",
            }}
          >
            <th style={{ width: "250px" }}>Khách hàng</th>
            <th>Nhận xét</th>
            <th>Đánh giá</th>
          </tr>
          {props.productDetail.reviews.map((review) => (
            <tr
              style={{
                textAlign: "center",
                margin: "20px 0",
                borderBottom: "1px solid #ccc",
              }}
            >
              <td style={{ width: "300px" }}>{review.user}</td>
              <td>{review.review}</td>
              <td
                style={{ display: "flex", width: "200px", marginLeft: "20px" }}
              >
                {stars.map((_, index) => {
                  return (
                    <FaStar
                      style={{ marginRight: 10, cursor: "pointer" }}
                      key={index}
                      size={24}
                      color={
                        review.rating > index ? colors.orange : colors.grey
                      }
                    />
                  );
                })}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Rating;
