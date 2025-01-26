import { Card, Col, Row } from 'reactstrap'
import { BrowseArticles, KnowledgeArticle } from '../../../../utils/Constant'
import { H4 } from '../../../../AbstractElements'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import CategoryDataCardBody from './CategoryDataCardBody'

const CategoryData = () => {
  return (
    <Col sm="12">
      <div className="header-faq">
        <H4 className="mb-0">{KnowledgeArticle}</H4>
      </div>
      <Row>
        <Col sm="12">
          <Card>
            <CardHeaderCommon title={BrowseArticles} headClass="card-no-border pb-0" />
            <CategoryDataCardBody />
          </Card>
        </Col>
      </Row>
    </Col>
  )
}

export default CategoryData