import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loading from "../components/global/Loading";
import AddSale from "../pages/AddSale";
import Error404 from "../pages/Error404"
const Mark = lazy(() => import("../pages/Mark"));
const Category = lazy(() => import("../pages/Category"));
const Product = lazy(() => import("../pages/Product"));
const Provider = lazy(() => import("../pages/Provider"));
const Coupons = lazy(() => import("../pages/Coupons"));
const Users = lazy(() => import("../pages/Users"));
const Account = lazy(() => import("../pages/Account"));
const Employee = lazy(() => import("../pages/Employee"));
const Sales = lazy(() => import("../pages/Sales"));
const Reports = lazy(() => import("../pages/Reports"));
const SaleDetails = lazy(() => import("../pages/SaleDetails"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Home = lazy(() => import("../pages/Home"));

const routes = ({ showModal, setShowModal }) => {
  return (
    <Router>
      <Switch>
        <Suspense fallback={<Loading />}>
          <Route path="/" exact>
            <Home showModal={showModal} setShowModal={setShowModal} />
          </Route>
          <Route path="/mark" exact>
            <Mark showModal={showModal} setShowModal={setShowModal} />
          </Route>
          <Route path="/category" exact>
            <Category showModal={showModal} setShowModal={setShowModal} />
          </Route>
          <Route path="/product" exact>
            <Product showModal={showModal} setShowModal={setShowModal} />
          </Route>
          <Route path="/provider" exact>
            <Provider showModal={showModal} setShowModal={setShowModal} />
          </Route>
          <Route path="/coupons" exact>
            <Coupons showModal={showModal} setShowModal={setShowModal} />
          </Route>
          <Route path="/users" exact>
            <Users showModal={showModal} setShowModal={setShowModal} />
          </Route>
          <Route path="/account" exact>
            <Account showModal={showModal} setShowModal={setShowModal} />
          </Route>
          <Route path="/employee" exact>
            <Employee showModal={showModal} setShowModal={setShowModal} />
          </Route>
          <Route path="/sales" exact>
            <Sales showModal={showModal} setShowModal={setShowModal} />
          </Route>
          <Route path="/reports" exact>
            <Reports showModal={showModal} setShowModal={setShowModal} />
          </Route>
          <Route path="/new-sale" exact>
            <AddSale showModal={showModal} setShowModal={setShowModal} />
          </Route>
          <Route path="/sale/:id" exact>
            <SaleDetails showModal={showModal} setShowModal={setShowModal} />
          </Route>
          <Route path="/product/:id" exact>
            <ProductDetails showModal={showModal} setShowModal={setShowModal} />
          </Route>
        </Suspense>
        <Route path="*" component={Error404} />
      </Switch>
    </Router>
  );
};

export default routes;
