import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import TodoSideBar from './TodoSideBar'
import TodoHeader from './TodoHeader'
import TodoList from './TodoList'

const TodoContainer = () => {
  return (
    <Container fluid className="email-wrap bookmark-wrap todo-wrap">
      <Row>
        <Col xxl="3" xl="4" className="box-col-30">
          <TodoSideBar />
        </Col>
        <Col xxl="9" xl="8" className="box-col-12">
          <Card>
            <TodoHeader/>
            <CardBody>
              <div className="todo">
                <div className="todo-list-wrapper theme-scrollbar">
                  <div className="todo-list-container">
                    <TodoList />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default TodoContainer