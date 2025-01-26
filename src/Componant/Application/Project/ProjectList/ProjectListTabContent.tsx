import { Card, CardBody, Row, TabContent, TabPane } from "reactstrap";
import { useSelector } from "react-redux";
import ProjectCommon from "./Common/ProjectCommon";

const ProjectListTabContent = () => {
  const { activeTab, createdFormData } = useSelector(
    (state: any) => state.project
  );
  return (
    <Card>
      <CardBody>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              {createdFormData.map((item: any, i: number) => (
                <ProjectCommon item={item} key={i} />
              ))}
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              {createdFormData.map((item: any, i: number) =>
                item.badge === "Doing" ? (
                  <ProjectCommon item={item} key={i} />
                ) : (
                  " "
                )
              )}
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              {createdFormData.map((item: any, i: number) =>
                item.badge === "Done" ? (
                  <ProjectCommon item={item} key={i} />
                ) : (
                  " "
                )
              )}
            </Row>
          </TabPane>
        </TabContent>
      </CardBody>
    </Card>
  );
};

export default ProjectListTabContent;
