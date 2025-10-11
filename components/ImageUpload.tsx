"use client";
import React, { useRef } from "react";
import { IKImage, IKContext, IKUpload } from "imagekitio-react";
import config from "@/lib/config";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";

const authenticator = async () => {
  try {
    const response = await fetch(config.env.apiEndpoint + "/api/auth/imagekit");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();
    const { signature, token, expire } = data;
    return { token, expire, signature };
  } catch (error: any) {
    throw new Error("Authentication request failed: " + error.message);
  }
};

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = React.useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.error(error);
    toast({
      title: "Image uploaded failed",
      description: `Your image could not be uploaded. Please try again.`,
    });
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: "Image uploaded successful",
      description: `${res?.filePath} uploaded successfully`,
    });
  };

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        className="hidden"
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
      />

      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            //@ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />

        <p className="text-base text-light-100">Upload a File</p>

        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </IKContext>
  );
};

export default ImageUpload;
