import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadDropzone } from "@/components/upload-dropzone"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-50">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">QuoteAlign</h1>
          <p className="text-slate-500 mt-2">Drop your logistics quotes, get a comparison table in seconds.</p>
        </div>

        <Card className="border-dashed border-2 bg-white/50">
          <CardHeader>
            <CardTitle>Upload Quotes</CardTitle>
            <CardDescription>Select PDF or Image files from your local drive.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <UploadDropzone />
          </CardContent>
        </Card>
      </div>
    </main >
  );
}