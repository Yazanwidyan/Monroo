import { useState, ChangeEvent } from "react";

type AcceptedFileTypes =
  | "image/jpeg"
  | "image/png"
  | "application/pdf"
  | "video/mp4";

type FileInputHookOptions = {
  maxFileSizeKB: number;
  maxFileCount: number;
};

export const useFileInput = (options: FileInputHookOptions) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState<number>(0);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const validFiles: File[] = [];

      if (files.length > options.maxFileCount) {
        setError(`You can only select up to ${options.maxFileCount} files.`);
      } else {
        for (let i = 0; i < files.length; i++) {
          const isValid = validateFile(files[i]);
          if (isValid) validFiles.push(files[i]);
        }
      }
      setSelectedFiles(validFiles);
    } else {
      setSelectedFiles([]);
    }

    setFileInputKey(fileInputKey + 1);
  };

  const acceptedFileTypes: AcceptedFileTypes[] = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "video/mp4",
  ];

  function validateFile(file: File): boolean {
    const maxFileSizeBytes = options.maxFileSizeKB * 1024;
    let isValid = false;

    if (file.size > maxFileSizeBytes) {
      setError(
        `File size exceeds the maximum allowed (${options.maxFileSizeKB} KB)`
      );
    } else if (!acceptedFileTypes.includes(file.type as AcceptedFileTypes)) {
      setError("Invalid file type. Please select valid files.");
    } else {
      isValid = true;
    }

    return isValid;
  }

  return [selectedFiles, fileInputKey, onFileChange, error] as const;
};
