import useFileUploader from "@/hooks/use-fileuploader";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Progress } from "./ui/progress";

interface FileUploaderProps {
    onFileUrlsReceived: (fileUrls: string[]) => void;
    children?: React.ReactNode;
  }

  const FileUploader: React.FC<FileUploaderProps> =({
    onFileUrlsReceived,
    children,
  }) => {
    const uploadApiEndpoint = "/api/upload-images" as string

    const { getRootProps, getInputProps, uploading, uploadProgess } = useFileUploader({
        uploadApiEndpoint,
        onFileUrlsReceived,
    })

    return (
        <div className="flex items-center justify-start">
            <div>
                <div role="button" {...getRootProps()} className={cn(
                    `w-20 h-20 cursor-pointer rounded-[8px] bg-white`,
                    uploading && "!pointer-events-none cursor-not-allowed"
                )}>
                    <div className="relative flex flex-col items-center justify-center h-full">
                        <input {...getInputProps()}/>
                        <Plus className="h-6 w-6 !text-black"/>
                        {uploading && (
                            <div className="absolute px-1 inset-0 bg-white backdrop-blur-sm flex flex-col items-center justify-center">
                                <Progress  value={uploadProgess} className="w-full"/>
                                <span className="text-xs text-black">{uploadProgess}%</span> 
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {children && <div>{children}</div>}
        </div>
    )
  }

  export default FileUploader;