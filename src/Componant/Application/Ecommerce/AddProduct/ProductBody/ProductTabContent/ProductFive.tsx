import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { productFiveNavData } from "../../../../../../Data/Application/Ecommerce/AddProduct";
import TabOne from "./TabOne";
import TabTwo from "./TabTwo";
import TabThree from "./TabThree";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTabId } from "../../../../../../Store/Slices/AddProductSlice";
import { useSelector } from "react-redux";

const ProductFive = () => {
  const { tabId } = useSelector((state: any) => state.addProduct);
  const dispatch = useDispatch();
  return (
    <div className="sidebar-body advance-options">
      <Nav className="border-tab mb-0" tabs>
        {productFiveNavData.map((data: any, i: number) => (
          <NavItem key={i}>
            <NavLink
              active={tabId === i + 1 ? true : false}
              onClick={() => dispatch(setTabId(i + 1))}
            >
              {data}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={tabId}>
        <TabPane tabId={1}>
          <TabOne />
        </TabPane>
        <TabPane tabId={2}>
          <TabTwo />
        </TabPane>
        <TabPane tabId={3}>
          <TabThree />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default ProductFive;
