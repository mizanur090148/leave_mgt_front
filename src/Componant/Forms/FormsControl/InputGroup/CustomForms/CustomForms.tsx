import { Card, CardBody, Col, InputGroup, InputGroupText } from "reactstrap";
import CardHeaderCommon from "../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { CustomForm, CustomFormSubmit, FavoriteChocolatesTitle, FavoriteColorsTitle, FavoriteThemeTitle, OptionsFormGroup, PixelstrapThemeTitle } from "../../../../../utils/Constant";
import { chocolateData, colorData, customFormData, favoriteThemeData, pixelData } from "../../../../../Data/Forms/FormsControl/InputGroup/InputGroup";
import { Btn } from "../../../../../AbstractElements";
import CustomFormSelect from "./CustomFormSelect";

const CustomForms = () => {
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon title={CustomForm} span={customFormData} />
        <CardBody className="common-flex main-custom-form">
          <InputGroup>
            <InputGroupText>{OptionsFormGroup}</InputGroupText>
            <CustomFormSelect inputId="inputGroupSelect01" title={PixelstrapThemeTitle} options={pixelData} />
          </InputGroup>
          <InputGroup>
            <CustomFormSelect inputId="inputGroupSelect02" title={FavoriteColorsTitle} options={colorData} />
            <InputGroupText>{OptionsFormGroup}</InputGroupText>
          </InputGroup>
          <InputGroup>
            <Btn color="secondary" outline>
              <i className="icofont icofont-credit-card"></i>
            </Btn>
            <CustomFormSelect inputId="inputGroupSelect03" title={FavoriteChocolatesTitle} options={chocolateData} />
          </InputGroup>
          <InputGroup>
            <CustomFormSelect inputId="inputGroupSelect04" title={FavoriteThemeTitle} options={favoriteThemeData}/>
            <Btn color="secondary" outline> {CustomFormSubmit}</Btn>
          </InputGroup>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CustomForms;
