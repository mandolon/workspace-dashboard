
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface PDFUploadFieldProps {
  onUpload: (file: File) => void;
}

const PDFUploadField: React.FC<PDFUploadFieldProps> = ({ onUpload }) => {
  const [selected, setSelected] = useState<File | null>(null);

  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        className="mb-2"
        onChange={e => {
          if (e.target.files && e.target.files.length > 0) {
            setSelected(e.target.files[0]);
            onUpload(e.target.files[0]);
          }
        }}
      />
      {selected && (
        <div className="text-xs text-muted-foreground truncate">
          {selected.name}
        </div>
      )}
    </div>
  );
};

export default PDFUploadField;
