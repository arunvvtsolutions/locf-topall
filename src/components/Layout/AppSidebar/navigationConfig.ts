
import { 
  Home, 
  BookOpen, 
  Upload, 
  HelpCircle, 
  ClipboardCheck, 
  TrendingUp, 
  Target, 
  Network, 
  FileText,
  BarChart3,
  Bot,
  GitBranch,
  Lightbulb,
  FileEdit,
  FileSpreadsheet,
  Users,
  Activity,
  Shield,
  Brain,
  Calculator,
  LineChart,
  Award
} from "lucide-react";

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: any;
  show: boolean;
}

export interface NavigationGroup {
  group: string;
  items: NavigationItem[];
}

export const getNavigationItems = (shouldShowItem: (itemId: string) => boolean): NavigationGroup[] => {
  return [
    {
      group: "Main",
      items: [
        { id: 'dashboard', label: "Dashboard", path: "/", icon: Home, show: shouldShowItem('dashboard') },
        { id: 'courses', label: "Courses", path: "/courses", icon: BookOpen, show: shouldShowItem('courses') },
        { id: 'syllabus', label: "Syllabus Upload", path: "/syllabus", icon: Upload, show: shouldShowItem('syllabus') },
        { id: 'question-bank', label: "Question Bank", path: "/question-bank", icon: HelpCircle, show: shouldShowItem('question-bank') },
        { id: 'assessment', label: "Assessment", path: "/assessment", icon: ClipboardCheck, show: shouldShowItem('assessment') },
        { id: 'attainment', label: "Attainment", path: "/attainment", icon: TrendingUp, show: shouldShowItem('attainment') },
        { id: 'po-attainment', label: "PO Attainment", path: "/po-attainment", icon: Target, show: shouldShowItem('po-attainment') },
        { id: 'mapping', label: "Mapping", path: "/mapping", icon: Network, show: shouldShowItem('mapping') },
        { id: 'reports', label: "Reports", path: "/reports", icon: FileText, show: shouldShowItem('reports') },
      ]
    },
    {
      group: "Analytics",
      items: [
        { id: 'analytics', label: "Analytics Hub", path: "/analytics", icon: BarChart3, show: shouldShowItem('analytics') },
        { id: 'predictive-analytics', label: "Predictive Analytics", path: "/predictive-analytics", icon: Brain, show: shouldShowItem('predictive-analytics') },
        { id: 'statistical-analysis', label: "Statistical Analysis", path: "/statistical-analysis", icon: Calculator, show: shouldShowItem('statistical-analysis') },
        { id: 'executive-analytics', label: "Executive Dashboard", path: "/executive-analytics", icon: LineChart, show: shouldShowItem('executive-analytics') },
        { id: 'enhanced-accreditation', label: "Accreditation Dashboard", path: "/enhanced-accreditation", icon: Award, show: shouldShowItem('enhanced-accreditation') },
      ]
    },
    {
      group: "Advanced",
      items: [
        { id: 'ai-agents', label: "AI Agents", path: "/ai-agents", icon: Bot, show: shouldShowItem('ai-agents') },
        { id: 'workflows', label: "Workflows", path: "/workflows", icon: GitBranch, show: shouldShowItem('workflows') },
        { id: 'questions', label: "Question Generator", path: "/questions", icon: Lightbulb, show: shouldShowItem('questions') },
        { id: 'exam-builder', label: "Exam Builder", path: "/exam-builder", icon: FileEdit, show: shouldShowItem('exam-builder') },
        { id: 'assessments', label: "Assessments", path: "/assessments", icon: FileSpreadsheet, show: shouldShowItem('assessments') },
      ]
    }
  ];
};

export const getAdminNavigationItems = (shouldShowItem: (itemId: string) => boolean): NavigationGroup[] => {
  return [
    {
      group: "Administration",
      items: [
        { id: 'assignments', label: "User Management", path: "/assignments", icon: Users, show: shouldShowItem('assignments') },
        { id: 'system-health', label: "System Health", path: "/system-health", icon: Activity, show: shouldShowItem('system-health') },
      ]
    }
  ];
};

export const getStudentNavigationItems = (shouldShowItem: (itemId: string) => boolean): NavigationGroup[] => {
  return [
    {
      group: "Student",
      items: [
        { id: 'student-results', label: "My Results", path: "/student-results", icon: TrendingUp, show: shouldShowItem('student-results') },
      ]
    }
  ];
};

// Legacy support - keeping the old function signature for backward compatibility
export const getNavigationItems_Old = (userRole: string | undefined, userCourseAssignments: any[], userProgramAssignments: any[]) => {
  const baseItems = [
    {
      group: "Main",
      items: [
        { title: "Dashboard", url: "/", icon: Home },
        { title: "Courses", url: "/courses", icon: BookOpen },
        { title: "Syllabus Upload", url: "/syllabus", icon: Upload },
        { title: "Question Bank", url: "/question-bank", icon: HelpCircle },
        { title: "Assessment", url: "/assessment", icon: ClipboardCheck },
        { title: "Attainment", url: "/attainment", icon: TrendingUp },
        { title: "PO Attainment", url: "/po-attainment", icon: Target },
        { title: "Mapping", url: "/mapping", icon: Network },
        { title: "Reports", url: "/reports", icon: FileText },
      ]
    },
    {
      group: "Analytics",
      items: [
        { title: "Analytics Hub", url: "/analytics", icon: BarChart3 },
        { title: "Predictive Analytics", url: "/predictive-analytics", icon: Brain },
        { title: "Statistical Analysis", url: "/statistical-analysis", icon: Calculator },
        { title: "Executive Dashboard", url: "/executive-analytics", icon: LineChart },
        { title: "Accreditation Dashboard", url: "/enhanced-accreditation", icon: Award },
      ]
    },
    {
      group: "Advanced",
      items: [
        { title: "AI Agents", url: "/ai-agents", icon: Bot },
        { title: "Workflows", url: "/workflows", icon: GitBranch },
        { title: "Question Generator", url: "/questions", icon: Lightbulb },
        { title: "Exam Builder", url: "/exam-builder", icon: FileEdit },
        { title: "Assessments", url: "/assessments", icon: FileSpreadsheet },
      ]
    }
  ];

  // Add admin-specific items
  if (userRole === 'admin' || userRole === 'super_admin' || userRole === 'hod') {
    baseItems.push({
      group: "Administration",
      items: [
        { title: "User Management", url: "/assignments", icon: Users },
        { title: "System Health", url: "/system-health", icon: Activity },
      ]
    });
  }

  // Add super admin items
  if (userRole === 'super_admin') {
    baseItems.push({
      group: "Super Admin",
      items: [
        { title: "Super Admin", url: "/super-admin", icon: Shield },
      ]
    });
  }

  return baseItems;
};
