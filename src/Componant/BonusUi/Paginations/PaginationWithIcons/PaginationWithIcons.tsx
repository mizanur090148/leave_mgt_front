import {
  Card,
  CardBody,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { Href, NextData, PaginationWithIcon } from "../../../../utils/Constant";
import { iconPaginationData } from "../../../../Data/BonusUi/Pagination/Pagination";

const PaginationWithIcons = () => {
  return (
    <Col md="6">
      <Card className="height-equal">
        <CardHeaderCommon
          title={PaginationWithIcon}
          span={iconPaginationData}
        />
        <CardBody>
          <Pagination
            className="pagination-secondary pagin-border-secondary mb-3"
            aria-label="Page navigation example"
          >
            <PaginationItem>
              <PaginationLink href={Href} first></PaginationLink>
            </PaginationItem>
            {NextData.map((item: any, index: number) => (
              <PaginationItem key={index}>
                <PaginationLink href={Href}>{item}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationLink href={Href} last></PaginationLink>
            </PaginationItem>
          </Pagination>
        </CardBody>
      </Card>
    </Col>
  );
};

export default PaginationWithIcons;
