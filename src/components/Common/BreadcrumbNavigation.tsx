
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  path: string;
  current?: boolean;
}

export const BreadcrumbNavigation = () => {
  const location = useLocation();
  
  const getPageTitle = (pathname: string): string => {
    const pageMap: { [key: string]: string } = {
      '/': 'Dashboard',
      '/dashboard': 'Dashboard',
      '/courses': 'Courses',
      '/syllabus': 'Syllabus Upload',
      '/assessment': 'Assessment',
      '/attainment': 'CO Attainment',
      '/po-attainment': 'PO Attainment',
      '/mapping': 'CO-PO Mapping',
      '/reports': 'Reports',
      '/analytics': 'Analytics Hub',
      '/predictive-analytics': 'Predictive Analytics',
      '/statistical-analysis': 'Statistical Analysis',
      '/executive-analytics': 'Executive Dashboard',
      '/enhanced-accreditation': 'Accreditation Dashboard',
      '/ai-agents': 'AI Agents',
      '/questions': 'Question Generator',
      '/assignments': 'User Management',
      '/system-health': 'System Health',
      '/student-results': 'My Results'
    };
    
    return pageMap[pathname] || 'Page';
  };

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      breadcrumbs.push({
        label: getPageTitle(currentPath),
        path: currentPath,
        current: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (location.pathname === '/' || location.pathname === '/dashboard') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4 flex-shrink-0" />
          )}
          {breadcrumb.current ? (
            <span className="font-medium text-foreground">
              {breadcrumb.label}
            </span>
          ) : (
            <Link
              to={breadcrumb.path}
              className={cn(
                "hover:text-foreground transition-colors",
                index === 0 && "flex items-center gap-1"
              )}
            >
              {index === 0 && <Home className="h-4 w-4" />}
              {breadcrumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
