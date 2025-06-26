import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseOutcomes from "./CourseOutComes";
import CoPOMapping from "./CopoMapping";

interface CourseDetailTabsProps {
  courseId: string;
}

const CourseDetailTabs = ({ courseId }: CourseDetailTabsProps) => {
  return (
    <div>
      <Tabs defaultValue="outcomes" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
          <TabsTrigger value="mapping">CO-PO Mapping</TabsTrigger>
          <TabsTrigger value="questions">Question Bank</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="attainment">Attainment</TabsTrigger>
        </TabsList>

        <TabsContent value="outcomes">
          <CourseOutcomes courseId={courseId} />
        </TabsContent>

        <TabsContent value="mapping">
          {/* <CoPOMapping courseId={courseId} canEdit={canEdit} /> */}
          <CoPOMapping courseId={courseId} />
        </TabsContent>

        <TabsContent value="questions">
          <div>hello</div>{" "}
        </TabsContent>

        <TabsContent value="assessments">
          <div>hello</div>{" "}
        </TabsContent>

        <TabsContent value="attainment">
          <div>hello</div>{" "}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDetailTabs;
