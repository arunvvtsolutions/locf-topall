import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, Plus, ArrowLeft, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  useCreateProgramOutcomeMutation,
  useGetCoursesByProgramIdQuery,
  useGetProgramOutComesByIdQuery,
} from "@/api/api/program-outcomes-api";

const ProgramOutComes = () => {
  const { programId } = useParams<{ programId: string }>();
  const {
    data: outcomes = [],
    isLoading,
    error,
    refetch,
  } = useGetProgramOutComesByIdQuery(programId!, {
    skip: !programId, // 🚀 Key Fix
  });
  const {
    data: courses = [],
    isLoading: isCoursesLoading,
    error: courseError,
  } = useGetCoursesByProgramIdQuery(programId!, {
    skip: !programId,
  });
  const [createProgramOutcome, { isLoading: isCreating }] = useCreateProgramOutcomeMutation();

  const navigate = useNavigate();
  const [isOutcomeDialogOpen, setIsOutcomeDialogOpen] = useState(false);
  const [outcomeFormData, setOutcomeFormData] = useState({ code: "", description: "" });

  // const courses = [
  //   { code: "CS101", name: "Introduction to Programming", credits: 4, instructor: "John Doe" },
  //   { code: "CS201", name: "Data Structures", credits: 4, instructor: "Jane Smith" },
  // ];

  const handleOutcomeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!programId) return;

    try {
      const res = await createProgramOutcome({
        program_id: Number(programId),
        code: outcomeFormData.code,
        description: outcomeFormData.description,
      }).unwrap();
      console.log(res);
      refetch();
      // Reset form and close modal
      setOutcomeFormData({ code: "", description: "" });
      setIsOutcomeDialogOpen(false);
    } catch (err) {
      console.error("Failed to create outcome:", err);
      // Optionally: show a toast or alert
    }
  };
  console.log(outcomes);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/program-management")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Programs
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Computer Science B.Tech</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">2024-2028</Badge>
              </div>
              <p className="text-gray-600 mt-2">
                This program focuses on the fundamentals of computer systems, software, and programming.
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="outcomes" className="space-y-6">
          <TabsList>
            <TabsTrigger value="outcomes">Program Outcomes</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="outcomes">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Program Outcomes
                    </CardTitle>
                    <CardDescription>Define the learning outcomes for this program</CardDescription>
                  </div>
                  <Dialog open={isOutcomeDialogOpen} onOpenChange={setIsOutcomeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Outcome
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <form onSubmit={handleOutcomeSubmit}>
                        <DialogHeader>
                          <DialogTitle>Create Program Outcome</DialogTitle>
                          <DialogDescription>Add a new learning outcome for this program.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="code">Outcome Code</Label>
                            <Input
                              id="code"
                              value={outcomeFormData.code}
                              onChange={(e) => setOutcomeFormData({ ...outcomeFormData, code: e.target.value })}
                              required
                              placeholder="e.g., PO1"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              value={outcomeFormData.description}
                              onChange={(e) => setOutcomeFormData({ ...outcomeFormData, description: e.target.value })}
                              required
                              placeholder="Describe the outcome..."
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setIsOutcomeDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">Create Outcome</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {outcomes.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {outcomes.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.code}</TableCell>
                          <TableCell>{item.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Program Outcomes</h3>
                    <p className="text-gray-600 mb-4">Start by adding the first outcome.</p>
                    <Button onClick={() => setIsOutcomeDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Outcome
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Courses
                    </CardTitle>
                    <CardDescription>Courses offered under this program</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Manage Courses
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {courses.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((course, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{course.code}</TableCell>
                          <TableCell>{course.name}</TableCell>
                          <TableCell>{course.credits}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => navigate(`/courses/${course.id}`)}>
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Courses</h3>
                    <p className="text-gray-600 mb-4">Start by adding courses to this program.</p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Course
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProgramOutComes;
