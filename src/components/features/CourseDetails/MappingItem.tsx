import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles } from "lucide-react";
import { ICoPoMapping } from "@/api/api/program-outcomes-api";

const strengthLabels = {
  1: "Low",
  2: "Medium",
  3: "High",
};

const strengthColors = {
  1: "bg-red-200 text-red-800",
  2: "bg-yellow-200 text-yellow-800",
  3: "bg-green-200 text-green-800",
};

const MappingItem = ({ data }: { data: ICoPoMapping[] }) => {
  return (
    <div className="space-y-4">
      {data.map((item, index) => {
        const [isChecked, setIsChecked] = useState(true);
        const [strength, setStrength] = useState(item.value || 2);
        const [justification, setJustification] = useState("");

        return (
          <div key={index} className="flex items-start gap-3 p-2 rounded border">
            <Checkbox checked={isChecked} onCheckedChange={() => setIsChecked(!isChecked)} />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{item.po_label}</span>
              </div>

              <p className="text-sm text-gray-600 mb-1">{item.program_outcome_description}</p>
              {isChecked && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-xs">Strength:</Label>
                    <Select value={strength.toString()} onValueChange={(value) => setStrength(parseInt(value))}>
                      <SelectTrigger className="w-24 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Low</SelectItem>
                        <SelectItem value="2">Medium</SelectItem>
                        <SelectItem value="3">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <Badge className={strengthColors[strength as 1 | 2 | 3]}>
                      {strengthLabels[strength as 1 | 2 | 3]}
                    </Badge>
                  </div>

                  <div>
                    <Label className="text-xs">Justification (optional):</Label>
                    <Textarea
                      value={justification}
                      onChange={(e) => setJustification(e.target.value)}
                      className="mt-1 text-sm"
                      rows={2}
                      placeholder="Explain why this CO maps to this PO..."
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MappingItem;
