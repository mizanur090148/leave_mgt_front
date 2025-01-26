import RichTextEditor from "react-rte";

const MyEditor = ({ certificateNote, setCertificateNote }) => {
  const handleChange = (value) => {
    setCertificateNote(value);
  };

  return (
    <div>
      <RichTextEditor value={certificateNote} onChange={handleChange} />
    </div>
  );
};

export default MyEditor;
