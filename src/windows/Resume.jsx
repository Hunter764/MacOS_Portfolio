import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js";
import { DownloadIcon } from "lucide-react";

import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const Resume = () => {
  const pdfPath = "/files/Abhyudaya.pdf"; // Ensure this is in public/files/

  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>

        <a
          href={pdfPath}
          download
          className="cursor-pointer"
          title="Download Resume"
        >
          <DownloadIcon className="icon" />
        </a>
      </div>

      <Document
        file={pdfPath}
        loading={<p>Loading resume…</p>}
        onLoadError={(err) => console.error("Error while loading PDF:", err)}
      >
        <Page
          pageNumber={1}
          renderTextLayer={true}
          renderAnnotationLayer={true}
        />
      </Document>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
