'use client'

import { useCallback, useState } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import { UploadCloud, File, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface UploadDropzoneProps {
    onFilesSelected?: (files: File[]) => void
}

export function UploadDropzone({ onFilesSelected }: UploadDropzoneProps) {
    const [files, setFiles] = useState<File[]>([])

    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
        if (acceptedFiles?.length) {
            setFiles((prev) => [...prev, ...acceptedFiles])
            onFilesSelected?.(acceptedFiles)
        }

        if (fileRejections?.length) {
            // Handle rejections (e.g. show toast)
            console.log('Rejected files:', fileRejections)
        }
    }, [onFilesSelected])

    const removeFile = (fileToRemove: File) => {
        setFiles((prev) => prev.filter((file) => file !== fileToRemove))
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'image/*': ['.png', '.jpg', '.jpeg', '.webp']
        },
        maxFiles: 5,
        maxSize: 10 * 1024 * 1024, // 10MB
    })

    return (
        <div className="w-full">
            <div
                {...getRootProps()}
                className={cn(
                    'border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors',
                    isDragActive
                        ? 'border-primary bg-primary/5'
                        : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
                )}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="p-4 bg-background rounded-full shadow-sm border">
                        <UploadCloud className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium">
                            Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                            PDF, PNG, JPG (max 10MB)
                        </p>
                    </div>
                    <Button variant="outline" size="sm" type="button">Select Files</Button>
                </div>
            </div>

            {files.length > 0 && (
                <div className="mt-6 space-y-3">
                    <h4 className="text-sm font-medium">Selected Files</h4>
                    <ul className="space-y-2">
                        {files.map((file, i) => (
                            <li key={`${file.name}-${i}`} className="flex items-center justify-between p-3 border rounded-md bg-background">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="p-2 bg-muted rounded">
                                        <File className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium truncate">{file.name}</p>
                                        <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-destructive"
                                    onClick={(e) => {
                                        e.stopPropagation() // Prevent dropzone click
                                        removeFile(file)
                                    }}
                                >
                                    <X className="w-4 h-4" />
                                    <span className="sr-only">Remove file</span>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
