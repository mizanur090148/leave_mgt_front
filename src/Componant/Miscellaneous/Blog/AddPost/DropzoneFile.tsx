import { Form } from 'reactstrap';
import Dropzone from 'react-dropzone-uploader';

const DropzoneFile = () => {
    const getUploadParams = () => { 
        return { url: "https://httpbin.org/post" };
      };
    
      return (
        <Form className="m-b-20">
          <Dropzone 
          getUploadParams={getUploadParams}
          maxFiles={1}
          multiple={true}
          canCancel={false}
          inputContent='Drop files here or click to upload.'
          styles={{
            dropzone: { width: '100%', height: 50 },
            dropzoneActive: { borderColor: 'green' },
          }} />
        </Form>
      );
}

export default DropzoneFile