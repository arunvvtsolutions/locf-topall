import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, RotateCcw, FileText } from "lucide-react";
import { format } from "date-fns";

interface SyllabusCardProps {
  fileName: string;
  uploadedDate: string; // ISO format date
  status: "processed" | "pending" | "fail" | "completed"; // Ensure this matches exactly with your data
  courseOutcomeCount: number;
  onReprocess: () => void;
  onReview: () => void;
}

export function SyllabusCard({
  fileName,
  uploadedDate,
  status,
  courseOutcomeCount,
  onReprocess,
  onReview,
}: SyllabusCardProps) {
  // Determine the status and set appropriate badge and message
  const statusMessage =
    status === "processed"
      ? "AI Processing Complete"
      : status === "pending"
      ? "Processing Pending"
      : status === "fail" // Corrected from "failed" to "fail" here
      ? "Processing Failed"
      : "Completed";

  const statusColor =
    status === "processed"
      ? "text-green-600 bg-green-100 border-green-300"
      : status === "pending"
      ? "text-yellow-600 bg-yellow-100 border-yellow-300"
      : status === "fail" // Corrected from "failed" to "fail"
      ? "text-red-600 bg-red-100 border-red-300"
      : "text-blue-600 bg-blue-100 border-blue-300"; // Completed

  return (
    <div className="border rounded-xl p-4 flex justify-between items-start shadow-sm mt-10">
      <div className="space-y-1">
        <div className="flex items-center gap-2 font-medium text-lg">
          <FileText className="w-4 h-4 text-gray-500" />
          <span>
            {fileName} ({format(new Date(uploadedDate), "M/d/yyyy")})
          </span>
        </div>

        {/* Always show status message based on status */}
        <div className="flex items-center gap-1 text-sm mt-1">
          <CheckCircle className={`w-4 h-4 ${statusColor}`} />
          <span>{statusMessage}</span>
        </div>

        <p className="text-muted-foreground text-sm">Found {courseOutcomeCount} course outcome(s)</p>

        {/* Buttons only visible for failed status */}
        {status === "fail" && (
          <div className="flex gap-2 mt-2">
            {/* <Button variant="outline" size="sm" onClick={onReprocess}>
              <RotateCcw className="w-4 h-4 mr-1" />
              Reprocess
            </Button> */}
            <Button size="sm" onClick={onReview}>
              Review Extracted Data
            </Button>
          </div>
        )}
      </div>

      {/* Badge showing status */}
      <Badge variant="secondary" className={`ml-auto ${statusColor}`}>
        <CheckCircle className="w-3 h-3 mr-1" />
        {status === "processed"
          ? "Processed"
          : status === "pending"
          ? "Pending"
          : status === "fail"
          ? "Failed"
          : "Completed"}
      </Badge>
    </div>
  );
}
