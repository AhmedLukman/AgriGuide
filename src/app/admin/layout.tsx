import { auth } from "@/auth";
import AdminNav from "@/components/page/admin-page/AdminNav";
import Aside from "@/components/ui/Aside";
import { Role } from "@prisma/client";
import { notFound } from "next/navigation";
import React, { PropsWithChildren } from "react";

const layout = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  if (session?.user.role !== Role.ADMIN) notFound();
  return (
    <div className="h-[93vh] flex bg-emerald-50">
      <Aside>
        <AdminNav />
      </Aside>
      <main className="p-10 pt-20 lg:p-20 lg:w-5/6 h-full w-full overflow-y-auto text-emerald-900">
        {children}
      </main>
    </div>
  );
};

export default layout;
