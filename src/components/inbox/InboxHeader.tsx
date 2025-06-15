
import React from "react";
import { Inbox, FileText, Send, Archive, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InboxHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  unreadCount: number;
}

const tabs = [
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "drafts", label: "Drafts", icon: FileText },
  { id: "sent", label: "Sent", icon: Send },
  { id: "archive", label: "Archive", icon: Archive },
  { id: "trash", label: "Trash", icon: Trash2 },
];

const InboxHeader = ({
  activeTab,
  onTabChange,
  currentPage,
  totalPages,
  onPageChange,
  unreadCount,
}: InboxHeaderProps) => {
  const mainTitle = tabs.find((tab) => tab.id === activeTab)?.label || "Inbox";

  return (
    <div className="border-b border-border bg-background">
      <div className="px-6 pt-6 pb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight leading-tight">
          {mainTitle}
          {activeTab === "inbox" && unreadCount > 0 && (
            <span className="ml-2 text-xs text-muted-foreground font-normal align-middle">
              ({unreadCount} unread)
            </span>
          )}
        </h1>
      </div>
      {/* Tabs row: paging now on same line as tabs */}
      <div className="flex items-center px-6 pb-2 border-b border-border">
        <div className="flex items-center space-x-3 flex-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 text-sm pb-2 border-b-2 transition-colors
                  ${selected
                    ? "border-primary text-foreground font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                style={{ outline: "none" }}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
        {/* Pagination controls - now inline with tabs */}
        <div className="flex items-center gap-1 ml-5">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-1"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="w-3 h-3" />
          </Button>
          <span className="text-xs text-muted-foreground px-2 select-none">
            {currentPage} of {totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-1"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InboxHeader;
