import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions";
import Layout from "../../components/Layout";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { AiFillThunderbolt } from "react-icons/ai";
import { MaterialButton } from "../../components/MaterialUI";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";
import { addToCart } from "../../actions";
import Rating from "./Rating";

/**
 * @author
 * @function ProductDetailsPage
 **/

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const [index, setIndex] = useState("0");
  useEffect(() => {
    const { productId } = props.match.params;
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsById(payload));
  }, []);

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }
  const handleTab = (index) => {
    setIndex(index);
  };

  return (
    <Layout>
      <div className="productDescriptionContainer">
        <div className="flexRow">
          <div className="verticalImageStack">
            {product.productDetails[0].productPictures.map((thumb, index) => (
              <div key={index} className="thumbnail">
                <img
                  src={generatePublicUrl(thumb.img)}
                  alt={thumb.img}
                  onClick={() => handleTab(index)}
                />
              </div>
            ))}
          </div>
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <img
                key={index}
                src={generatePublicUrl(
                  product.productDetails[0].productPictures[index].img
                )}
                alt={`${product.productDetails[0].productPictures[0].img}`}
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            {/* action buttons */}
            <div
              className="flexRow"
              style={{
                marginTop: 50,
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <MaterialButton
                title="THÊM VÀO GIỎ HÀNG"
                bgColor="#ff9f00"
                textColor="#ffffff"
                lineHeight="normal"
                style={
                  product.productDetails[0].quantity > 0
                    ? {
                        marginRight: "5px",
                        position: "relative",
                      }
                    : {
                        marginRight: "5px",
                        position: "relative",
                        opacity: 0.5,
                      }
                }
                icon={<IoMdCart style={{ position: "absolute" }} />}
                onClick={() => {
                  const { _id, name, price } = product.productDetails[0];
                  const img = product.productDetails[0].productPictures[0].img;
                  if (product.productDetails[0].quantity > 0) {
                    dispatch(addToCart({ _id, name, price, img }));
                    props.history.push("/react-client-electronic/cart");
                  }
                  return;
                }}
              />
              <MaterialButton
                title="MUA NGAY"
                bgColor="#fb641b"
                textColor="#ffffff"
                lineHeight="normal"
                style={
                  product.productDetails[0].quantity > 0
                    ? {
                        marginLeft: "5px",
                        position: "relative",
                      }
                    : {
                        marginLeft: "5px",
                        position: "relative",
                        opacity: 0.5,
                        curcor: "auto",
                      }
                }
                onClick={() => {
                  const { _id, name, price } = product.productDetails[0];
                  const img = product.productDetails[0].productPictures[0].img;
                  if (product.productDetails[0].quantity > 0) {
                    dispatch(addToCart({ _id, name, price, img }));
                    props.history.push(`/react-client-electronic/checkout`);
                  }
                  return;
                }}
                icon={<AiFillThunderbolt style={{ position: "absolute" }} />}
              />
            </div>
          </div>
        </div>
        <div style={{ marginLeft: 25 }}>
          <div className="breed">
            <ul>
              <li>
                <a href="/react-client-electronic">Home</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="/react-client-electronic">
                  {product.productDetails[1]}
                </a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="/react-client-electronic">
                  {product.productDetails[0].name}
                </a>
              </li>
            </ul>
          </div>
          {/* product description */}
          <div className="productDetails">
            <p className="productTitle">{product.productDetails[0].name}</p>
            <div>
              <span className="ratingCount">
                4.3 <IoIosStar />
              </span>
              <span className="ratingNumbersReviews">
                72,234 Xếp hạng & 8,140 Nhận xát
              </span>
            </div>
            <div className="flexRow priceContainer">
              <span className="priceOld">
                {product.productDetails[0].priceOld
                  .toFixed(0)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                đ
              </span>
              <span className="price">
                {product.productDetails[0].price
                  .toFixed(0)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                đ
              </span>
              <span className="discount" style={{ margin: "0 10px" }}>
                Ưu đãi{" "}
                {(
                  100 -
                  (product.productDetails[0].price /
                    product.productDetails[0].priceOld) *
                    100
                ).toFixed(2)}{" "}
                %
              </span>
            </div>
            <div>
              <p>
                {product.productDetails[0].quantity > 0
                  ? `Còn lại trong kho: ${product.productDetails[0].quantity}`
                  : "Hết hàng"}
              </p>
              <p style={{ display: "flex" }}>
                <span
                  style={{
                    width: "150px",
                    fontSize: "12px",
                    color: "#878787",
                    fontWeight: "600",
                  }}
                >
                  Chi tiết
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#212121",
                    maxWidth: "600px",
                    overflowY: "scroll",
                    height: "380px",
                    marginTop: "10px",
                    marginLeft: "-15px",
                  }}
                >
                  {product.productDetails[0].description}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Rating productDetail={product.productDetails[0]} />
    </Layout>
  );
};

export default ProductDetailsPage;
