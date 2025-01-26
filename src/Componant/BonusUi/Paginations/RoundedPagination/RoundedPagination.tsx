import {
  Card,
  CardBody,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { Href, NextData, RoundedPaginations } from "../../../../utils/Constant";
import { roundedPaginationData } from "../../../../Data/BonusUi/Pagination/Pagination";

const RoundedPagination = () => {
  return (
    <Col md="6">
      <Card className="height-equal">
        <CardHeaderCommon
          title={RoundedPaginations}
          span={roundedPaginationData}
        />
        <CardBody>
          <Pagination
            className="pagination-dark pagin-border-dark"
            aria-label="Page navigation example"
          >
            <PaginationItem>
              <PaginationLink
                className="rounded-circle me-2"
                href={Href}
                first
              ></PaginationLink>
            </PaginationItem>
            {NextData.map((item: any, index: number) => (
              <PaginationItem key={index}>
                <PaginationLink className="rounded-circle me-2" href={Href}>
                  {item}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationLink
                className="rounded-circle me-2"
                href={Href}
                last
              ></PaginationLink>
            </PaginationItem>
          </Pagination>
        </CardBody>
      </Card>
    </Col>
  );
};

export default RoundedPagination;
