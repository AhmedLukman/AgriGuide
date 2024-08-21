import ResourceMobileNav from "@/components/page/resource-page/ResourceMobileNav";
import { ResourceType } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { Image } from "@nextui-org/react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import React from "react";
import ResourceContent from "@/components/page/resource-page/ResourceContent";
import { auth } from "@/auth";
import { Role } from "@prisma/client";
import { deleteDisease, editDisease } from "@/lib/actions";

const DiseasePage = async ({ params }: { params: { slug: string } }) => {
  const disease = await prisma.disease.findUnique({
    where: {
      slug: params.slug,
    },
  });
  if (!disease) notFound();
  const { name, text, image, id } = disease;
  const session = await auth();
  const user = session?.user;
  const isAdmin = user?.role === Role.ADMIN;
  
  return (
    <>
      <ResourceMobileNav type={ResourceType.DISEASES} name={name} />
      <ResourceContent
        deleteResource={deleteDisease}
        type="Disease"
        editFn={editDisease}
        name={name}
        text={text}
        id={id}
        isAdmin={isAdmin}
      />
      {image && (
        <div className="flex flex-col md:flex-row mt-10 items-center justify-center gap-5">
          <Image src={image} alt="" className="h-72 w-80" />
        </div>
      )}
    </>
  );
};

export default DiseasePage;
