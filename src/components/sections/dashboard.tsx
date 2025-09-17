
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { analyzeFinancialReport } from "@/ai/flows/analyze-financial-report";


export function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    // Also reset the input field value
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a financial report to upload.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const dataUri = reader.result as string;

            const analysisResult = await analyzeFinancialReport({
                financialReportDataUri: dataUri,
                metrics: ["revenue growth", "profitability", "burn rate", "runway"],
                forecastHorizon: "1 year",
            });
            
            localStorage.setItem('analysisResults', JSON.stringify(analysisResult));

            toast({
                title: "Analysis Complete",
                description: "Redirecting to your results...",
            });

            router.push('/dashboard/results');
        };
        reader.onerror = (error) => {
             console.error("Error reading file:", error);
             toast({
                title: "File Read Error",
                description: "Could not read the selected file.",
                variant: "destructive",
            });
        }
      } catch (error: any) {
        console.error("Analysis failed:", error);
        toast({
          title: "Analysis Failed",
          description: error.message || "An unexpected error occurred during analysis.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <section className="container py-12 sm:py-16">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Financial Analysis Dashboard
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Upload your financial report to get instant insights, risk assessments, and future predictions.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Upload Report</CardTitle>
            <CardDescription>
              Select a financial report file to begin the analysis. Any document type is accepted.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-full">
                 <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">Upload any financial document (MAX. 10MB)</p>
                    </div>
                    <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            </div>
             {file && (
              <div className="flex items-center justify-between p-2 pl-4 text-sm rounded-md bg-muted">
                <div className="flex-1 overflow-hidden">
                    <span className="truncate block">{file.name}</span>
                    <span className="text-muted-foreground text-xs">{(file.size / 1024).toFixed(2)} KB</span>
                </div>
                <Button variant="ghost" size="icon" onClick={handleRemoveFile} className="h-8 w-8 flex-shrink-0">
                    <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <Button onClick={handleUpload} disabled={isPending || !file} className="w-full">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Report"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
