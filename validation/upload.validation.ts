import { z } from "zod";


const fileSchema = z.custom<File>((val) => {
    return val instanceof File
}, "Invalid file type. Expected a File"
)

export const uploadSchema = z.object({
    files: z.array(fileSchema).nonempty("Please upload at least one file")
})