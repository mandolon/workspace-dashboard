
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface InformationSectionProps {
  title: string;
  fields: Array<{
    label: string;
    value: string;
    onChange?: (value: string) => void;
    type?: 'input' | 'textarea';
    readOnly?: boolean;
    placeholder?: string;
    span?: 'full' | 'half';
  }>;
}

const InformationSection = ({ title, fields }: InformationSectionProps) => {
  return (
    <div>
      <h3 className="text-xs font-medium text-foreground mb-2">{title}</h3>
      <div className="space-y-0.5">
        {fields.map((field, index) => {
          const isHalfSpan = field.span === 'half';
          const nextField = fields[index + 1];
          const isNextHalfSpan = nextField?.span === 'half';
          
          if (isHalfSpan && isNextHalfSpan) {
            // Render two half-span fields side by side
            const currentField = field;
            const nextFieldData = nextField;
            
            return (
              <div key={index} className="grid grid-cols-12 gap-2 text-xs py-1.5 hover:bg-accent/50 rounded border-b border-border/30">
                {/* First half field */}
                <div className="col-span-6 grid grid-cols-12 gap-2">
                  <div className="col-span-6 text-muted-foreground">{currentField.label}</div>
                  <div className="col-span-6">
                    {currentField.type === 'textarea' ? (
                      <Textarea
                        value={currentField.value}
                        onChange={(e) => currentField.onChange?.(e.target.value)}
                        className="min-h-[40px] text-xs resize-none"
                        placeholder={currentField.placeholder}
                      />
                    ) : (
                      <Input
                        value={currentField.value}
                        onChange={(e) => currentField.onChange?.(e.target.value)}
                        readOnly={currentField.readOnly}
                        placeholder={currentField.placeholder}
                        className={`h-6 text-xs ${currentField.readOnly ? 'bg-muted cursor-not-allowed' : ''}`}
                      />
                    )}
                  </div>
                </div>
                
                {/* Second half field */}
                <div className="col-span-6 grid grid-cols-12 gap-2">
                  <div className="col-span-6 text-muted-foreground">{nextFieldData.label}</div>
                  <div className="col-span-6">
                    {nextFieldData.type === 'textarea' ? (
                      <Textarea
                        value={nextFieldData.value}
                        onChange={(e) => nextFieldData.onChange?.(e.target.value)}
                        className="min-h-[40px] text-xs resize-none"
                        placeholder={nextFieldData.placeholder}
                      />
                    ) : (
                      <Input
                        value={nextFieldData.value}
                        onChange={(e) => nextFieldData.onChange?.(e.target.value)}
                        readOnly={nextFieldData.readOnly}
                        placeholder={nextFieldData.placeholder}
                        className={`h-6 text-xs ${nextFieldData.readOnly ? 'bg-muted cursor-not-allowed' : ''}`}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          } else if (isHalfSpan && !isNextHalfSpan) {
            // Skip this field as it was already rendered with the previous one
            return null;
          } else {
            // Render full-span field normally
            return (
              <div key={index} className="grid grid-cols-12 gap-2 text-xs py-1.5 hover:bg-accent/50 rounded border-b border-border/30">
                <div className="col-span-3 text-muted-foreground">{field.label}</div>
                <div className="col-span-9">
                  {field.type === 'textarea' ? (
                    <Textarea
                      value={field.value}
                      onChange={(e) => field.onChange?.(e.target.value)}
                      className="min-h-[40px] text-xs resize-none"
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <Input
                      value={field.value}
                      onChange={(e) => field.onChange?.(e.target.value)}
                      readOnly={field.readOnly}
                      placeholder={field.placeholder}
                      className={`h-6 text-xs ${field.readOnly ? 'bg-muted cursor-not-allowed' : ''}`}
                    />
                  )}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default InformationSection;
