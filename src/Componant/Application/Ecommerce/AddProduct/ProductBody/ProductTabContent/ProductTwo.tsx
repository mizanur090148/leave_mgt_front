import { Link } from "react-router-dom";
import { H5, P, SVG } from "../../../../../../AbstractElements";
import { Href } from "../../../../../../utils/Constant";
import ProductGallery from "./ProductGallery";
import { useState } from "react";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { useDispatch } from "react-redux";
import { setFormValue } from "../../../../../../Store/Slices/AddProductSlice";

const ProductTwo = () => {
  const [files, setFiles] = useState<ExtFile[]>([]);
  const dispatch = useDispatch();
  const updateFiles = (incomingFiles: ExtFile[]) => {
    setFiles(incomingFiles);
    dispatch(
      setFormValue({ name: "fileName", value: incomingFiles[0].file?.name })
    );
  };
  const removeFile = (id: string | number | undefined) => {
    setFiles(files.filter((x: ExtFile) => x.id !== id));
  };
  return (
    <div className="sidebar-body">
      <div className="product-upload">
        <P>Product Image </P>
        <Dropzone
          onChange={(files) => updateFiles(files)}
          value={files}
          maxFiles={1}
          header={false}
          footer={false}
          minHeight="80px"
          name="fileName"
        >
          {files.map((file: ExtFile) => (
            <FileMosaic
              key={file.id}
              {...file}
              onDelete={removeFile}
              info={true}
            />
          ))}
          {files.length === 0 && (
            <div className="dz-message needsclick">
              <SVG iconId="file-upload" />
              <H5>
                Drag your image here, or
                <Link className="txt-primary" to={Href}>
                  browser
                </Link>
              </H5>
              <span className="note needsclick">SVG,PNG,JPG or GIF</span>
            </div>
          )}
        </Dropzone>
      </div>
      <ProductGallery />
    </div>
  );
};

export default ProductTwo;
