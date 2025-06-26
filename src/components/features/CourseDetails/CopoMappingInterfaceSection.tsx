import React from "react";
import MappingItem from "./MappingItem";
import { ICoPoMapping } from "@/api/api/program-outcomes-api";

const CopoMappingInterfaceSection = ({ data }: { data: ICoPoMapping[] }) => {

  return (
    <div className="border rounded-lg p-4">
      {/* <div className="mb-3">
        <h4 className="font-semibold">co.code</h4>
        <p className="text-sm text-gray-600">co.description</p>
      </div> */}

      <div className="space-y-3">
        <MappingItem data={data} />
      </div>
    </div>
  );
};

export default CopoMappingInterfaceSection;
