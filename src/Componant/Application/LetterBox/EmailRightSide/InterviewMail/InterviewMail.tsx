import { useSelector } from "react-redux";
import { Card } from "reactstrap";
import InterviewMailHeader from "./InterviewMailHeader";
import InterviewMailBody from "./InterviewMailBody";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const InterviewMail = () => {
  const { interviewEmail } = useSelector((state: any) => state.letterBox);
  const componentRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Card
      className={`email-body email-read ${interviewEmail ? "show" : "hide"}`}
    >
      <InterviewMailHeader />
      <InterviewMailBody ref={componentRef} handlePrint={handlePrint} />
    </Card>
  );
};

export default InterviewMail;
