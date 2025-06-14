
import React, { useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PDFPin {
  id: string;
  page: number;
  x: number;
  y: number;
  number: number;
  comment: string;
}

interface PDFViewerProps {
  fileUrl: string | null;
  pins: PDFPin[];
  pageNumber: number;
  onPinDrop: (pos: { x: number; y: number }) => void;
  onPageChange: (page: number) => void;
  totalPages: number;
  setTotalPages: (n: number) => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  fileUrl,
  pins,
  pageNumber,
  onPinDrop,
  onPageChange,
  totalPages,
  setTotalPages
}) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  function handleDropPin(e: React.MouseEvent) {
    const rect = viewerRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Normalized (0-1) coordinates in PDF page
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    onPinDrop({ x, y });
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="mb-2 flex items-center gap-2">
        <button
          disabled={pageNumber <= 1}
          onClick={() => onPageChange(pageNumber - 1)}
          className="px-2 py-1 text-sm border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {pageNumber} / {totalPages}
        </span>
        <button
          disabled={pageNumber >= totalPages}
          onClick={() => onPageChange(pageNumber + 1)}
          className="px-2 py-1 text-sm border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div
        ref={viewerRef}
        className="relative mx-auto"
        style={{ width: 520, height: 680, background: "#FDFDFD" }}
        onClick={handleDropPin}
      >
        {fileUrl && (
          <Document
            file={fileUrl}
            onLoadSuccess={({ numPages }) => setTotalPages(numPages)}
          >
            <Page pageNumber={pageNumber} width={520} height={680} />
          </Document>
        )}

        {/* Pins overlay */}
        {pins
          .filter(pin => pin.page === pageNumber)
          .map(pin => (
            <div
              key={pin.id}
              className="absolute z-10"
              style={{
                left: `${pin.x * 100}%`,
                top: `${pin.y * 100}%`,
                transform: "translate(-50%,-80%)",
                pointerEvents: "none",
              }}
            >
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold shadow border-2 border-white text-xs">
                {pin.number}
              </div>
            </div>
          ))}
      </div>
      <div className="text-xs text-muted-foreground mt-2">
        Click anywhere on the PDF to drop a pin.
      </div>
    </div>
  );
};

export default PDFViewer;
