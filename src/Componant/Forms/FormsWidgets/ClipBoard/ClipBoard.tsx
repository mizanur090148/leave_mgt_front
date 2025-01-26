import { Container, Row } from 'reactstrap'
import ClipboardOnTextInput from './ClipboardOnTextInput/ClipboardOnTextInput'
import ClipboardOnTextarea from './ClipboardOnTextarea/ClipboardOnTextarea'
import ClipboardOnParagraph from './ClipboardOnParagraph/ClipboardOnParagraph'
import CopyPortionFromParagraph from './CopyPortionFromParagraph/CopyPortionFromParagraph'

const ClipBoardContainer = () => {
  return (
    <Container fluid>
      <Row>
        <ClipboardOnTextInput />
        <ClipboardOnTextarea />
        <ClipboardOnParagraph />
        <CopyPortionFromParagraph />
      </Row>
    </Container>
  )
}

export default ClipBoardContainer