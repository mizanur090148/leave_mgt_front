export interface CustomCellInterFaces {
  position: string;
  color: string;
}

export interface HtmlColumnsInterface {
  name: string;
  position: string;
  salary: string;
  office: string;
  cv: JSX.Element;
  email: string;
  color: string;
  badge: string;
  id: number;
}

export interface AjaxSourcedColumnsInterface {
  name: string;
  position: string;
  office: string;
  date: string;
  extends: string;
  salary: string;
}

export interface ServerSideProcessingColumnsInterface {
  //[x: string]: Primitive;
  details: {
    applicantName: string;
  };
  certificateNo: string;
  type: string;
  issueDate: string;
  status: string;
  salary: string;
}
