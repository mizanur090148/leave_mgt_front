import { Container, Row } from 'reactstrap'
import KnowledgebaseHelp from './KnowledgebaseHelp/KnowledgebaseHelp'
import Article from '../Faq/Article/Article'
import FAQFeaturesTutorial from '../Faq/FAQFeaturesTutorial/FAQFeaturesTutorial'
import ArticleVideo from '../Faq/ArticleVideo/ArticleVideo'
import CategoryData from './CategoryData/CategoryData'

const KnowledgebaseContainer = () => {
  return (
    <Container fluid>
      <Row>
        <KnowledgebaseHelp />
        <Article />
        <CategoryData />
        <FAQFeaturesTutorial />
        <ArticleVideo /> 
      </Row>
    </Container>
  )
}

export default KnowledgebaseContainer