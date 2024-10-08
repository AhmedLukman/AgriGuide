"use client";

// Refactor later
import {
  convertFileToBase64,
  convertHtmlToMarkdown,
  convertMarkdownToHtml,
} from "@/lib/utils";
import { Button, Image } from "@nextui-org/react";
import { Disease, Pest } from "@prisma/client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize
);

import "react-quill/dist/quill.snow.css";
import { deleteImage, uploadImages } from "@/lib/actions";
import { ResourceType } from "@/lib/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ResourceContent = ({
  isAdmin,
  type,
  editFn,
  deleteResource,
  resource,
}: {
  isAdmin: boolean;
  type: ResourceType;
  editFn: ({ id, content }: { id: string; content: string }) => Promise<void>;
  deleteResource: (id: string) => Promise<void>;
  resource: Pest | Disease;
}) => {
  const { name, text, id, images } = resource;
  const [content, setContent] = useState(convertMarkdownToHtml(text));
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [isDeletingImage, setIsDeletingImage] = useState(false);

  const imageLength = images.length;

  const handleEdit = async () => {
    setIsEditing((prev) => !prev);
  };

  const handleApply = async () => {
    try {
      setIsLoading(true);
      const markdownContent = convertHtmlToMarkdown(content);
      await editFn({ id, content: markdownContent });
      toast.success(`${type} edited successfully`);
    } catch (e) {
      toast.error(`Failed to edit ${type.toLowerCase()}`);
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteResource(id);
      toast.success(`${type} deleted successfully`);
    } catch (e) {
      toast.error(
        `Failed to delete ${type.toLowerCase()}: ${
          e instanceof Error ? e.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select an image to upload");
      return;
    }

    if(files.length + imageLength > 6) {
      toast.error("You can only upload a maximum of 6 images per resource.");
      return;
    }

    try {
      setIsLoading(true);

      const fileData = await Promise.all(
        files.map(async (file) => {
          const base64 = await convertFileToBase64(file);
          return {
            name: file.name,
            type: file.type,
            base64: base64,
          };
        })
      );

      await uploadImages({
        files: fileData,
        type,
        id,
      });

      toast.success("Images uploaded successfully");
      setIsAddingImage(false);
      setFiles([]);
    } catch (e) {
      toast.error(
        `Failed to upload images: ${
          e instanceof Error ? e.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = async (imageUrl: string) => {
    try {
      setIsDeletingImage(true);
      await deleteImage({
        id,
        imageUrl,
        type,
      });
      toast.success("Image deleted successfully");
    } catch (e) {
      toast.error(
        `Failed to delete image: ${
          e instanceof Error ? e.message : "Unknown error"
        }`
      );
    } finally {
      setIsDeletingImage(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-3xl font-bold">{name}</h1>
        {isAdmin && (
          <div className="space-x-4">
            <Button
              variant="bordered"
              color={!isEditing ? "danger" : "primary"}
              onPress={handleEdit}
            >
              {isEditing ? "Stop Editing" : "Edit"}
            </Button>
            {!isEditing && (
              <Button
                color="danger"
                isLoading={isLoading}
                onPress={handleDelete}
              >
                Delete
              </Button>
            )}
            {isEditing && (
              <Button
                className="text-white"
                isLoading={isLoading}
                onPress={handleApply}
                color="success"
              >
                Apply
              </Button>
            )}
          </div>
        )}
      </div>
      {isEditing ? (
        <ReactQuill value={content} onChange={setContent} theme="snow" />
      ) : (
        <div
          className="edit-cont"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-5">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <Image src={image} alt="" className="h-72 w-80" />
            {isAdmin && (
              <Button
                isIconOnly
                color="danger"
                variant="flat"
                className="absolute z-50 top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDeleteImage(image)}
                isLoading={isDeletingImage}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            )}
          </div>
        ))}
      </div>
      {isAdmin && (
        <div className="mt-14">
          {isAddingImage && (
            <FilePond
              required
              files={files}
              onupdatefiles={(items) => {
                setFiles(items.map((item) => item.file));
              }}
              acceptedFileTypes={["image/*"]}
              labelFileTypeNotAllowed="Invalid file type. Please upload an image"
              allowMultiple={true}
              labelFileProcessingError="An error occurred during processing"
              labelIdle="Drag & Drop or Browse your desired image"
            />
          )}
          <div className="flex justify-center gap-4">
            <Button
              className="text-white"
              color={isAddingImage ? "danger" : "primary"}
              onPress={
                !isAddingImage
                  ? () => {
                      if (imageLength + files.length === 6)
                        return toast.error(
                          "You can only upload a maximum of 6 images per resource."
                        );
                      setIsAddingImage((prev) => !prev);
                    }
                  : () => {
                      setFiles([]);
                      setIsAddingImage(false);
                    }
              }
            >
              {isAddingImage ? "Cancel" : "Add Images"}
            </Button>
            {isAddingImage && (
              <Button
                isLoading={isLoading}
                color="success"
                className="text-white"
                onPress={handleUpload}
              >
                Upload
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceContent;
