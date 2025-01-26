import { Container, Row } from 'reactstrap'
import Article from './Article/Article'
import Questions from './Questions/Questions'
import FAQFeaturesTutorial from './FAQFeaturesTutorial/FAQFeaturesTutorial'
import ArticleVideo from './ArticleVideo/ArticleVideo'

const FaqContainer = () => {
  return (
    <Container fluid>
      <div className="faq-wrap">
        <Row>
          <Article />
          <Questions />
          <FAQFeaturesTutorial />
          <ArticleVideo />
        </Row>
      </div>
    </Container>
  )
}

export default FaqContainer