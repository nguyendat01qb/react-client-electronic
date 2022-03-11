import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductListPage from "./containers/ProductListPage";
import { useEffect } from "react";
import ReactNotification from "react-notifications-component";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, updateCart } from "./actions";
import ProductDetailsPage from "./containers/ProductDetailsPage";
import CartPage from "./containers/CartPage";
import CheckoutPage from "./containers/CheckoutPage";
import OrderPage from "./containers/OrderPage";
import OrderDetailsPage from "./containers/OrderDetailsPage";
import HomePageContainer from "./containers/HomePage";
import Invoice from "./containers/OrderDetailsPage/invoice";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(updateCart());
  }, [auth.authenticate]);

  return (
    <div className="App">
      <ReactNotification />
      <Router>
        <Switch>
          <Route
            path="/react-client-electronic/"
            exact
            component={HomePageContainer}
          />
          {/* <Route path="/react-client-electronic/" exact component={HomePage} /> */}
          <Route path="/react-client-electronic/cart" component={CartPage} />
          <Route
            path="/react-client-electronic/checkout"
            component={CheckoutPage}
          />
          <Route
            path="/react-client-electronic/account/orders"
            component={OrderPage}
          />
          <Route
            path="/react-client-electronic/order_details/:orderId"
            component={OrderDetailsPage}
          />
          <Route
            path="/react-client-electronic/invoice/:orderId"
            component={Invoice}
          />

          <Route
            path="/react-client-electronic/:productSlug/:productId/p"
            component={ProductDetailsPage}
          />
          <Route
            path="/react-client-electronic/:slug"
            component={ProductListPage}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
