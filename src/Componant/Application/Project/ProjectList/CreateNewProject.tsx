import { PlusCircle } from 'react-feather'
import { Link } from 'react-router-dom'
import { Col } from 'reactstrap'
import { CreateNewProjects } from '../../../../utils/Constant'

const CreateNewProject = () => {
  return (
    <Col md="6">
      <div className="text-end">
        <Link className="btn btn-primary text-white" to={`/project/create_new`} >
          <PlusCircle />
          {CreateNewProjects}
        </Link>
      </div>
    </Col>
  )
}

export default CreateNewProject