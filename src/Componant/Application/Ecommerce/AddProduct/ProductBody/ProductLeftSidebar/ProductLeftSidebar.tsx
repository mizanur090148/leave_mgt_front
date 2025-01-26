import { Col, Nav, NavItem, NavLink } from "reactstrap";
import { H5, P, SVG } from "../../../../../../AbstractElements";
import { addProductNav } from "../../../../../../Data/Application/Ecommerce/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { setNavId } from "../../../../../../Store/Slices/AddProductSlice";
import { Href } from "../../../../../../utils/Constant";

const ProductLeftSidebar = () => {
  const { navId } = useSelector((state: any) => state.addProduct);
  const dispatch = useDispatch();
  return (
    <Col xxl="3" xl="4" className="box-col-4e sidebar-left-wrapper">
      <Nav pills className="sidebar-left-icons" tabs>
        {addProductNav.map((data: any, i: number) => (
          <NavItem key={i}>
            <NavLink
              active={navId === data.id ? true : false}
              onClick={() => dispatch(setNavId(data.id))}
              href={Href}
            >
              <div className="nav-rounded">
                <div className="product-icons">
                  <SVG className="stroke-icon" iconId={data.icon} />
                </div>
              </div>
              <div className="product-tab-content">
                <H5>{data.title}</H5>
                <P>{data.detail}</P>
              </div>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </Col>
  );
};

export default ProductLeftSidebar;
