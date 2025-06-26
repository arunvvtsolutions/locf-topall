import { ICoPoMapping } from "@/api/api/program-outcomes-api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React, { useState, useMemo } from "react";

export const CoPOMappingMatrix = ({ data }: { data: ICoPoMapping[] }) => {
  const canEdit = true;

  console.log(data);

  const courseOutcomes = useMemo(() => {
    const map = new Map();
    data.forEach((item) => {
      if (!map.has(item.co_label)) {
        map.set(item.co_label, {
          id: item.co_label,
          code: item.co_label,
          description: item.course_outcome_content,
        });
      }
    });
    return Array.from(map.values());
  }, [data]);

  console.log(courseOutcomes);

  const programOutcomes = useMemo(() => {
    const map = new Map();
    data.forEach((item) => {
      if (!map.has(item.po_label)) {
        map.set(item.po_label, {
          id: item.po_label,
          code: item.po_label,
          description: item.program_outcome_description,
        });
      }
    });
    return Array.from(map.values());
  }, [data]);

  console.log(programOutcomes);

  const getMappingStrength = (coId: string, poId: string): number => {
    const match = data.find((item) => item.co_label === coId && item.po_label === poId);
    return match ? match.value : 0;
  };

  const handleStrengthChange = (coId: string, poId: string, value: string) => {
    // This part is for UI only. Real update should trigger backend sync.
    console.log(`Strength updated for ${coId}-${poId}: ${value}`);
  };

  const pos = programOutcomes.filter((po) => po.code.startsWith("PO"));
  const psos = programOutcomes.filter((po) => po.code.startsWith("PSO"));
  const orderedOutcomes = [...pos, ...psos];

  return (
    <Card>
      <CardHeader>
        <CardTitle>CO-PO/PSO Mapping Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Outcomes</TableHead>
              {orderedOutcomes.map((po) => (
                <TableHead key={po.id} className="text-center">
                  {po.code}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseOutcomes.map((co) => (
              <TableRow key={co.id}>
                <TableCell>
                  <div className="space-y-1">
                    <Badge variant="outline">{co.code}</Badge>
                    <div className="text-sm text-gray-600">{co.description}</div>
                  </div>
                </TableCell>
                {orderedOutcomes.map((po) => {
                  const strength = getMappingStrength(co.id, po.id);
                  return (
                    <TableCell key={po.id} className="text-center">
                      {canEdit ? (
                        <Select
                          value={strength.toString()}
                          onValueChange={(value) => handleStrengthChange(co.id, po.id, value)}
                        >
                          <SelectTrigger className="w-16 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">-</SelectItem>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="flex justify-center">
                          {strength > 0 ? <Badge>{strength}</Badge> : <span className="text-gray-400">-</span>}
                        </div>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
