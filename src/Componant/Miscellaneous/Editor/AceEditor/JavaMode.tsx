import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { JavaModeHeading } from '../../../../utils/Constant'
import { typeScriptData } from '../../../../Data/Editor/Editor'
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

const JavaMode = () => {
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon title={JavaModeHeading} />
        <CardBody>
          <AceEditor
            className="aceEditor w-auto"
            mode="java"
            theme="monokai"
            value={typeScriptData}
            name="blah2"
            setOptions={{ useWorker: false }}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            editorProps={{ $blockScrolling: true }}
            highlightActiveLine={true}
          />
        </CardBody>
      </Card>
    </Col>
  )
}

export default JavaMode