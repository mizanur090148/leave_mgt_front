import { Card, CardBody, Col, Table } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { FeaturedCourse } from '../../../../utils/Constant'
import FeaturedCoursesBody from './FeaturedCoursesBody'

const FeaturedCourses = () => {
  return (
    <Col xxl="5" xl="6" className="box-col-6 proorder-4-xl-1 proorder-md-7">
    <Card>
      <CommonCardHeader headClass="card-no-border pb-0" mainTitle={true} firstItem='Weekly' secondItem='Monthly' thirdItem='Yearly' title={FeaturedCourse} />
      <CardBody className="p-0 featured-table">
        <div className='dataTables_wrapper'>
          <div className="table-responsive theme-scrollbar">
            <Table className="table display dataTable no-footer" id="featured-table">
              <thead>
                <tr>
                  <th>{"Course Name"}</th>
                  <th>{"Start"}</th>
                  <th>{"Rate"}</th>
                  <th>{"Type"}</th>
                  <th>{"Save"}</th>
                </tr>
              </thead>
              <FeaturedCoursesBody />
            </Table>
          </div>
        </div>
      </CardBody>
    </Card>
  </Col>
  )
}

export default FeaturedCourses