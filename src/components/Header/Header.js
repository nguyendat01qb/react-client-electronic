import React, { useEffect, useState } from "react";
import "./style.css";
import goldenStar from "../../images/logo/golden-star.png";
import { IoIosArrowDown, IoIosCart } from "react-icons/io";
import SearchIcon from "@material-ui/icons/Search";
import { DropdownMenu } from "../MaterialUI";
import { useDispatch, useSelector } from "react-redux";
import { login, signout, getCartItems, signup as _signup } from "../../actions";
import { getProducts as listProducts } from "../../actions";
import validateInfo from "./validateInfo";
import { Input, List, ListItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import avatar from "../../images/logo/87096758_269626647356248_6940852014318354432_n.jpg";

/**
 * @author
 * @function Header
 **/

const Header = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [submitLogin, setSubmitLogin] = useState(false);
  const [validateLogin, setValidateLogin] = useState(false);
  const [submitSignup, setSubmitSignup] = useState(false);
  const [text, setText] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  const cart = useSelector((state) => state.cart);

  const [values, setValues] = useState({
    username: "",
    fullname: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(values);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(values);
    setErrors(validateInfo(values));
    setSubmitSignup(true);
    console.log(submitSignup);
    console.log(errors);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitSignup) {
      console.log(values);
      dispatch(_signup(values));
      setSignup(false);
      setValues({
        username: "",
        fullname: "",
        phone: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });
    }
  }, [errors]);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrors(validateInfo(values, validateLogin));
    setSubmitLogin(true);
  };

  useEffect(() => {
    try {
      if (Object.keys(errors).length === 0 && submitLogin) {
        const { username, password } = values;
        dispatch(login({ username, password }));
        setValues({
          username: "",
          password: "",
        });
      }
    } catch (err) {
      console.log(err);
      setErrorLogin(true);
    }
  }, [errors]);

  const logout = () => {
    dispatch(signout());
  };

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false);
    }
  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <div className="account">
            <a href="/react-client-electronic/" className="fullName">
              {auth.user.fullname}
            </a>
            <img src={avatar} alt="Avatar" width="50" height="50" />
          </div>
        }
        menus={[
          {
            label: "Th??ng tin c?? nh??n",
            href: "/react-client-electronic/",
            icon: null,
          },
          {
            label: "????n h??ng",
            href: "/react-client-electronic/orders",
            icon: null,
          },
          {
            label: "????ng xu???t",
            href: "/react-client-electronic/",
            icon: null,
            onClick: logout,
          },
        ]}
      />
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a
            className="loginButton"
            onClick={() => {
              setSignup(false);
              setLoginModal(true);
            }}
            style={{ textDecoration: "none", borderRadius: 4 }}
          >
            ????ng nh???p
          </a>
        }
        menus={[
          { label: "Th??ng tin c?? nh??n", href: "", icon: null },
          {
            label: "????n h??ng",
            href: `/react-client-electronic/orders`,
            icon: null,
            onClick: () => {
              !auth.authenticate && setLoginModal(true);
            },
          },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>Th??nh vi??n m???i?</span>
            <a
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
              style={{ color: "#2874f0" }}
            >
              ????ng k??
            </a>
          </div>
        }
      />
    );
  };
  return (
    <div className="header">
      <div
        style={loginModal ? { display: "flex" } : { display: "none" }}
        className="modalFixedBg"
      >
        <div style={{ position: "relative" }}>
          <div className="modalClose" onClick={() => setLoginModal(false)}>
            X
          </div>
          <div className="modalContainer">
            <div className="authContainer">
              <div className="row">
                <div className="leftspace">
                  <h2
                    style={{ fontSize: 20, fontWeight: 500, marginBottom: 10 }}
                  >
                    ????ng nh???p
                  </h2>
                  <p>????ng nh???p ????? ti???n h??nh ?????t h??ng</p>
                </div>
                <form
                  onSubmit={(e) => {
                    setValidateLogin(true);
                    handleLogin(e);
                  }}
                  className="rightspace"
                  style={{ marginRight: 20 }}
                >
                  <div className="loginInputContainer">
                    <div>
                      <label>T??n ????ng nh???p</label>
                      <Input
                        type="text"
                        style={{ width: "100%" }}
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.username && (
                      <p className="error-message">{errors.username}</p>
                    )}
                    <div>
                      <label>M???t kh???u</label>
                      <Input
                        type="password"
                        style={{ width: "100%" }}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.password && (
                      <p className="error-message">{errors.password}</p>
                    )}

                    <button
                      className="materialButton"
                      style={{
                        textColor: "#ffffff",
                        backgroundColor: "#fb641b",
                        margin: "40px 0 20px 0",
                      }}
                    >
                      ????ng nh???p
                    </button>
                    {errorLogin && (
                      <p className="error-message">
                        T??n ????ng nh???p ho???c m???t kh???u ch??a ????ng
                      </p>
                    )}
                    <p style={{ textAlign: "center" }}>
                      B???n ch??a c?? t??i kho???n?
                    </p>

                    <a
                      className="materialButton"
                      style={{
                        color: "#2874f0",
                        backgroundColor: "#ffffff",
                        margin: "20px 0",
                        textAlign: "center",
                      }}
                      onClick={() => {
                        setSignup(true);
                        setLoginModal(false);
                      }}
                    >
                      ????ng k??
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={signup ? { display: "flex" } : { display: "none" }}
        className="modalFixedBg"
      >
        <div style={{ position: "relative" }}>
          <div className="modalClose" onClick={() => setSignup(false)}>
            X
          </div>
          <div className="modalContainer">
            <div className="authContainer">
              <div className="row">
                <div className="leftspace">
                  <h2
                    style={{ fontSize: 20, fontWeight: 500, marginBottom: 10 }}
                  >
                    ????ng k??
                  </h2>
                  <p>
                    ????ng k?? t??i kho???n s???m s??? c?? th??? nh???n ???????c nhi???u ??u ????i t???
                    ch??ng t??i
                  </p>
                </div>
                <form
                  onSubmit={(e) => {
                    handleSignup(e);
                  }}
                  className="rightspace"
                >
                  <div className="signupInputContainer">
                    <div>
                      <label>T??n ????ng nh???p</label>
                      <Input
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.username && (
                      <p className="error-message">{errors.username}</p>
                    )}
                    <div>
                      <label>T??n ?????y ?????</label>
                      <Input
                        type="text"
                        name="fullname"
                        value={values.fullname}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.fullname && (
                      <p className="error-message">{errors.fullname}</p>
                    )}
                    <div>
                      <label>?????a ch??? email</label>
                      <Input
                        type="text"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.email && (
                      <p className="error-message">{errors.email}</p>
                    )}
                    <div>
                      <label>S??? ??i???n tho???i</label>
                      <Input
                        type="text"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.phone && (
                      <p className="error-message">{errors.phone}</p>
                    )}
                    <div>
                      <label>M???t kh???u</label>
                      <Input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.password && (
                      <p className="error-message">{errors.password}</p>
                    )}
                    <div>
                      <label>Nh???p l???i m???t kh???u</label>
                      <Input
                        type="password"
                        name="passwordConfirm"
                        value={values.passwordConfirm}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.passwordConfirm && (
                      <p className="error-message">{errors.passwordConfirm}</p>
                    )}
                    <button
                      className="materialButton"
                      style={{
                        textColor: "#ffffff",
                        backgroundColor: "#fb641b",
                        margin: "40px 0 20px 0",
                      }}
                      // type="submit"
                    >
                      ????ng k??
                    </button>
                    <p style={{ textAlign: "center" }}>B???n ???? c?? t??i kho???n?</p>
                    <a
                      className="materialButton"
                      onClick={() => {
                        setSignup(false);
                        setLoginModal(true);
                      }}
                      style={{
                        color: "#2874f0",
                        backgroundColor: "#ffffff",
                        margin: "20px",
                        textAlign: "center",
                      }}
                    >
                      ????ng nh???p
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sub-header">
        {/* Logo */}
        <div className="logo">
          <a href="/react-client-electronic" style={{ marginTop: "-10px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: 10,
              }}
            >
              <span className="explore">Cell</span>
              <img
                src={goldenStar}
                className="goldenStar"
                style={{ marginTop: 4 }}
                alt=""
              />
            </div>
            <span className="plus">Electronics</span>
          </a>
        </div>
        {/* logo ends here */}

        {/* search component */}
        <div
          style={{
            padding: "0 10px",
          }}
        >
          <div className="searchInputContainer">
            <Input
              className="searchInput"
              placeholder={"T??m ki???m s???n ph???m, th????ng hi???u ..."}
              onChange={(e) => setText(e.target.value)}
              onBlur={(e) => setText((e.target.value = ""))}
            />
            <div className="searchIconContainer">
              <SearchIcon
                style={{
                  height: 36,
                  marginLeft: 20,
                  cursor: "pointer",
                }}
              />
            </div>

            {text && (
              <List>
                {product.products
                  .filter((prduct) =>
                    prduct.name.toLowerCase().includes(text.toLowerCase())
                  )
                  .map((product) => (
                    <ListItem>
                      <Link
                        key={product._id}
                        to={`/react-client-electronic/${product.slug}/${product._id}/p`}
                      >
                        {product.name}
                      </Link>
                    </ListItem>
                  ))}
              </List>
            )}
          </div>
        </div>
        {/* search component ends here*/}

        {/* right side menu */}
        <div className="rightMenu">
          {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
          <DropdownMenu
            menu={
              <a className="more">
                <span>Xem th??m</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: "Th??ng b??o", href: "", icon: null },
              { label: "Khuy???n m??i tr??n Cell", href: "", icon: null },
              {
                label: "Li??n h??? qua email",
                href: "mailto:nvdatdev@gmail.com",
                icon: null,
              },
            ]}
          />
          <div>
            <a href={"/react-client-electronic/cart"} className="cart">
              <div style={{ fontSize: "20px", position: "relative" }}>
                <span style={{ margin: "0 10px" }}>
                  {Object.keys(cart.cartItems).length ? (
                    <span
                      style={{
                        position: "absolute",
                        background: "red",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50px",
                        fontSize: "12px",
                        border: "1px solid #fff",
                        textAlign: "center",
                        alignSelf: "center",
                        top: "23px",
                        right: "-8px",
                      }}
                    >
                      {Object.keys(cart.cartItems).length}
                    </span>
                  ) : (
                    ""
                  )}
                  <IoIosCart />
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
