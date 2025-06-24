
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// Removed: import { ProgramDetails } from './ProgramDetails';
// Removed: import { AcademicStructure } from './AcademicStructure';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ProgramList } from './ProgramList';
export interface Program {
  id: string;
  name: string;
  code: string;
  duration_years: number;
  programType: string;
  description?: string;
  organization_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Additional properties that exist in database
  status?: string;
  total_semesters?: number;
  accreditation_details?: any;
}
interface ProgramManagementTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  programs: Program[];
  selectedProgram: Program | null;
  onProgramSelect: (program: Program) => void;
  onProgramUpdate: () => void;
  onCreateProgram: () => void;
}

export const ProgramManagementTabs = ({
  activeTab,
  setActiveTab,
  programs,
  selectedProgram,
  onProgramSelect,
  onProgramUpdate,
  onCreateProgram,
}: ProgramManagementTabsProps) => {
  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex items-center space-x-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {/* 
            Academic Structure/TabsTrigger is hidden, as AcademicStructure/ProgramDetails code does not exist 
            and will cause import errors if used or rendered.
          */}
        </TabsList>
        <TabsContent value="overview">
         <ProgramList
            programs={programs}
            onProgramSelect={onProgramSelect}
            onProgramUpdate={onProgramUpdate}
          />
        </TabsContent>
        {/* Removed missing tab and components */}
      </Tabs>
    </div>
  );
};
