
import React, { useRef, useState } from "react";
import { Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";

interface QuickAddAttachmentsProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

const QuickAddAttachments: React.FC<QuickAddAttachmentsProps> = ({ files, setFiles }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const filesDropdownButtonRef = useRef<HTMLButtonElement>(null);
  const [showFilesDropdown, setShowFilesDropdown] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setFiles([...files, ...Array.from(e.target.files)]);
      e.target.value = "";
    }
  };

  const handleRemoveFile = (idx: number) => {
    setFiles(files.filter((_, i) => i !== idx));
  };

  const hasFiles = files.length > 0;

  // Renders dropdown in portal
  const renderFilesDropdown = () => {
    if (!showFilesDropdown || files.length === 0) return null;
    return createPortal(
      <div
        className="absolute right-0 mt-2 z-[1001] bg-white border shadow-lg rounded min-w-[180px] overflow-hidden animate-fade-in"
        style={{
          top: filesDropdownButtonRef.current
            ? filesDropdownButtonRef.current.getBoundingClientRect().bottom + window.scrollY + 2
            : undefined,
          left: filesDropdownButtonRef.current
            ? filesDropdownButtonRef.current.getBoundingClientRect().left + window.scrollX - 120
            : undefined,
        }}
        onMouseLeave={() => setShowFilesDropdown(false)}
      >
        {files.map((file, idx) => (
          <div key={idx} className="flex items-center gap-2 px-3 py-2 text-xs hover:bg-accent transition-colors border-b last:border-b-0">
            <a
              href={URL.createObjectURL(file)}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate flex-1 text-blue-600 hover:underline"
              title={file.name}
              download={file.name}
              onClick={e => e.stopPropagation()}
            >
              {file.name}
            </a>
            <button
              onClick={() => handleRemoveFile(idx)}
              className="text-destructive hover:bg-destructive hover:text-white rounded p-0.5"
              aria-label="Remove file"
              type="button"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>,
      document.body
    );
  };

  return (
    <div className="flex items-center gap-2 relative">
      {/* Paperclip label and badge */}
      <button
        ref={filesDropdownButtonRef}
        type="button"
        className={`flex items-center justify-center border border-border rounded px-2 py-1 h-6 bg-white relative transition-colors
          ${hasFiles ? "bg-accent hover:bg-accent/70 text-blue-700" : "text-muted-foreground hover:text-blue-700 hover:bg-accent"}`}
        title={hasFiles ? (files.length === 1 ? files[0].name : `${files.length} files`) : "Attach files"}
        onClick={
          hasFiles
            ? (e) => {
                e.stopPropagation();
                setShowFilesDropdown((v) => !v);
              }
            : (e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }
        }
        aria-label="Attach file(s)"
        tabIndex={0}
        onMouseDown={e => e.preventDefault()}
        onDoubleClick={e => fileInputRef.current?.click()}
      >
        <Paperclip
          className="w-3 h-3"
          strokeWidth={hasFiles ? 2.5 : 2}
          fill={hasFiles ? "currentColor" : "none"}
          style={{
            color: hasFiles ? "#2563eb" : undefined, // tailwind blue-700
          }}
        />
        {hasFiles && (
          <span className="absolute -top-2 -right-2 bg-orange-600 text-white rounded-full text-[10px] px-1 leading-none z-10 border border-white">
            {files.length}
          </span>
        )}
      </button>
      {/* Hidden file input, always allow multi */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
        aria-label="Attach file(s)"
      />
      {/* Show file names as inline chips if only one file, or if showFilesDropdown not used */}
      {hasFiles && !showFilesDropdown && files.length === 1 && (
        <span
          className="inline-flex items-center gap-0.5 bg-muted px-2 py-0.5 rounded text-xs font-medium"
          title={files[0].name}
        >
          {files[0].name}
          <button onClick={() => handleRemoveFile(0)} className="ml-0.5 text-destructive" type="button" aria-label="Remove file">
            <X className="w-3 h-3" />
          </button>
        </span>
      )}
      {renderFilesDropdown()}
    </div>
  );
};

export default QuickAddAttachments;
