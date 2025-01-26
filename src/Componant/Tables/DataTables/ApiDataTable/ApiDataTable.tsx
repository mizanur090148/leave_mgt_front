import { Container, Row } from 'reactstrap'
import AddRows from './AddRows/AddRows'
import ChildRows from './ChildRows/ChildRows'
import RowSelectionAndDeletion from './RowSelectionAndDeletion/RowSelectionAndDeletion'
import CustomFiltering from './CustomFiltering/CustomFiltering'

const ApiDataTableContainer = () => {
  return (
    <Container fluid>
      <Row>
        <AddRows />
        <ChildRows />
        <RowSelectionAndDeletion />
        <CustomFiltering />
      </Row>
    </Container>
  )
}

export default ApiDataTableContainer