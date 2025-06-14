
import React, { useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";

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
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    onPinDrop({ x, y });
  }

  // For UI mock: show "+/-/100%" but not real zoom
  return (
    <div className="relative w-[560px] h-[760px] bg-[#17181b] rounded-xl shadow-xl flex flex-col items-center justify-center border border-neutral-800">
      {/* Page controls above PDF */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-[#222326] py-1 px-3 rounded-full shadow-lg border border-neutral-800">
        <button
          disabled={pageNumber <= 1}
          onClick={() => onPageChange(pageNumber - 1)}
          className="p-1 rounded-full text-muted-foreground hover:text-white transition disabled:opacity-60"
        >
          <ChevronLeft />
        </button>
        <span className="mx-1 text-sm text-white">{pageNumber} / {totalPages}</span>
        <button
          disabled={pageNumber >= totalPages}
          onClick={() => onPageChange(pageNumber + 1)}
          className="p-1 rounded-full text-muted-foreground hover:text-white transition disabled:opacity-60"
        >
          <ChevronRight />
        </button>
        <div className="mx-2 w-px h-4 bg-neutral-700" />
        <button className="p-1 text-muted-foreground rounded-full hover:text-white transition" tabIndex={-1}><Minus className="w-4 h-4" /></button>
        <span className="text-xs px-2 font-bold text-white">100%</span>
        <button className="p-1 text-muted-foreground rounded-full hover:text-white transition" tabIndex={-1}><Plus className="w-4 h-4" /></button>
      </div>
      {/* PDF */}
      <div
        ref={viewerRef}
        className="relative cursor-crosshair rounded overflow-hidden mt-8"
        style={{ width: 520, height: 680, background: "#fff" }}
        onClick={handleDropPin}
      >
        {fileUrl && (
          <Document
            file={fileUrl}
            onLoadSuccess={({ numPages }) => setTotalPages(numPages)}
            loading={<div className="flex items-center justify-center w-full h-full text-muted-foreground">Loading PDF…</div>}
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
      <div className="text-xs text-muted-foreground mt-3">
        Click anywhere on the PDF to drop a pin.
      </div>
    </div>
  );
};

export default PDFViewer;
