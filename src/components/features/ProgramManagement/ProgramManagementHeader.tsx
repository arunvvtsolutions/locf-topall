import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProgramManagementHeaderProps {
  /**
   * Callback when the Create Program button is clicked
   */
  onCreateProgram: () => void;

  /**
   * Optional title to display
   */
  title?: string;

  /**
   * Optional description to display
   */
  description?: string;

  /**
   * Optional flag to show/hide the create button
   */
  showCreateButton?: boolean;
}

export const ProgramManagementHeader = ({
  onCreateProgram,
  title = "Program Management",
  description = "Manage academic programs and their structure",
  showCreateButton = true,
}: ProgramManagementHeaderProps) => {
  return (
    <div className="flex justify-end items-center">
      {/* <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && <p className="text-gray-600 mt-1">{description}</p>}
      </div> */}
      {showCreateButton && (
        <Button onClick={onCreateProgram}>
          <Plus className="h-4 w-4 mr-2" />
          Create Program
        </Button>
      )}
    </div>
  );
};
