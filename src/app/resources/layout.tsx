import Aside from "@/components/page/resource-page/Aside";
import React, { PropsWithChildren } from "react";

const ResourcesLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-[93vh] flex bg-emerald-50">
      <Aside />
      <main className="p-10 pt-20 lg:p-20 lg:w-5/6 h-full overflow-y-auto text-emerald-900">
        {children}
      </main>
    </div>
  );
};

export default ResourcesLayout;
