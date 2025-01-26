import { filtersData } from "../../../../Data/Application/Ecommerce/ProductList";
import { useSelector } from "react-redux";
import { Card, CardBody, Col, Collapse, Input, Row } from "reactstrap";

const CollapseFilterData = () => {
  const { filterToggle } = useSelector((state: any) => state.product);

  return (
    <Collapse isOpen={filterToggle}>
      <Card className="shadow-none">
        <CardBody className="list-product-body">
          <Row className="row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2 g-3">
            {filtersData.map((item: any, index: number) => (
              <Col key={index}>
                <Input type="select">
                  <option>{item.name}</option>
                  {item.options.map((data: any, optionIndex: any) => (
                    <option key={optionIndex} value={optionIndex + 1}>
                      {data}
                    </option>
                  ))}
                </Input>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </Collapse>
  );
};

export default CollapseFilterData;
