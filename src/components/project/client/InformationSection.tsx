
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
  }>;
}

const InformationSection = ({ title, fields }: InformationSectionProps) => {
  return (
    <div>
      <h3 className="text-xs font-medium text-foreground mb-2">{title}</h3>
      <div className="space-y-0.5">
        {fields.map((field, index) => (
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
                  className={`h-6 text-xs ${field.readOnly ? 'bg-muted cursor-not-allowed' : ''}`}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InformationSection;
