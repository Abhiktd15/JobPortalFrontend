import React from "react";

const ResumeViewer = ({ resumeUrl }) => {
  if (!resumeUrl) return <p>No resume uploaded</p>;

  const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(resumeUrl)}&embedded=true`;

  return (
    <iframe
      src={viewerUrl}
      width="100%"
      height="600px"
      title="Resume Viewer"
      style={{ border: "none" }}
    />
  );
};

export default ResumeViewer;
