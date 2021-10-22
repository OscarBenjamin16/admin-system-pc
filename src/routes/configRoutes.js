/* eslint-disable import/no-anonymous-default-export */
import Home from "../pages/Home";
import Category from "../pages/Category";
import Mark from "../pages/Mark";
import Error404 from "../pages/Error404";
import Product from "../pages/Product";
import Provider from "../pages/Provider";
import Coupons from "../pages/Coupons";
import Users from "../pages/Users";
import Account from "../pages/Account";
import Employee from "../pages/Employee";
import Sales from "../pages/Sales";
import Reports from "../pages/Reports";
import SaleDetails from "../pages/SaleDetails";
import ProductDetails from "../pages/ProductDetails";

export default [
  {
    path: "/category",
    exact: true,
    page: Category,
  },
  {
    path: "/mark",
    exact: true,
    page: Mark,
  },
  {
    path: "/product",
    exact: true,
    page: Product,
  },
  {
    path: "/provider",
    exact: true,
    page: Provider,
  },
  {
    path: "/coupons",
    exact: true,
    page: Coupons,
  },
  {
    path: "/users",
    exact: true,
    page: Users,
  },
  {
    path: "/account",
    exact: true,
    page: Account,
  },
  {
    path:"/employee",
    exact:true,
    page:Employee
  },
  {
    path:'/sales',
    exact:true,
    page:Sales
  },
  {
    path:'/reports',
    exact:true,
    page:Reports,
  },
  {
    path: "/sale/:id",
    exact: true,
    page: SaleDetails,
  },
  {
    path: "/product/:id",
    exact: true,
    page: ProductDetails,
  },
  {
    path: "/",
    exact: true,
    page: Home,
  },
  {
    path: "*",
    page: Error404,
  },
];
