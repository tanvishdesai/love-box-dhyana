"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Loader2, RefreshCw, Trash2 } from "lucide-react";

export default function MigrationPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

    const dataStatus = useQuery(api.migrate.checkDataStatus);
    const runMigration = useMutation(api.migrate.runMigration);
    const clearData = useMutation(api.migrate.clearAllData);

    const handleMigration = async () => {
        if (!confirm("This will replace all existing data with sample data. Continue?")) {
            return;
        }

        setIsLoading(true);
        setMessage(null);

        try {
            const result = await runMigration();
            setMessage({
                type: "success",
                text: `✅ Migration successful! Added ${result.stats.products} products, ${result.stats.occasions} occasions, and ${result.stats.testimonials} testimonials.`,
            });
        } catch (error) {
            setMessage({
                type: "error",
                text: `❌ Migration failed: ${error instanceof Error ? error.message : "Unknown error"}`,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = async () => {
        if (!confirm("This will delete ALL data from the database. This cannot be undone. Continue?")) {
            return;
        }

        setIsLoading(true);
        setMessage(null);

        try {
            const result = await clearData();
            setMessage({
                type: "success",
                text: `✅ Data cleared! Removed ${result.cleared.products} products, ${result.cleared.occasions} occasions, and ${result.cleared.testimonials} testimonials.`,
            });
        } catch (error) {
            setMessage({
                type: "error",
                text: `❌ Clear failed: ${error instanceof Error ? error.message : "Unknown error"}`,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            <div className="container mx-auto py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                            Database Migration
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Manage and populate your Convex database with sample data
                        </p>
                    </div>

                    {/* Status Message */}
                    {message && (
                        <Card className="mb-8 border-l-4" style={{
                            borderLeftColor: message.type === "success" ? "#10b981" : message.type === "error" ? "#ef4444" : "#3b82f6",
                        }}>
                            <CardContent className="pt-6 flex items-start gap-3">
                                {message.type === "success" && <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />}
                                {message.type === "error" && <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />}
                                {message.type === "info" && <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />}
                                <p className="text-sm">{message.text}</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Current Data Status */}
                    {dataStatus && (
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <RefreshCw className="w-5 h-5" />
                                    Current Database Status
                                </CardTitle>
                                <CardDescription>
                                    See what data is currently in your database
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                                            {dataStatus.products.count}
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                            Products
                                        </div>
                                    </div>
                                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                                            {dataStatus.occasions.count}
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                            Occasions
                                        </div>
                                    </div>
                                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                                            {dataStatus.testimonials.count}
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                            Testimonials
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Migration Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Run Migration Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Run Migration</CardTitle>
                                <CardDescription>
                                    Populate database with sample data
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                    <p className="mb-2">This will:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Clear existing data</li>
                                        <li>Add 6 occasion categories</li>
                                        <li>Add 10 premium products</li>
                                        <li>Add 5 customer testimonials</li>
                                    </ul>
                                </div>
                                <Button
                                    onClick={handleMigration}
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Running...
                                        </>
                                    ) : (
                                        <>
                                            <RefreshCw className="w-4 h-4 mr-2" />
                                            Run Migration
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Clear Data Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Clear Database</CardTitle>
                                <CardDescription>
                                    Remove all data (caution!)
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-3 rounded">
                                    <p className="font-semibold mb-1">⚠️ Warning</p>
                                    <p>This action cannot be undone. All products, occasions, and testimonials will be permanently deleted.</p>
                                </div>
                                <Button
                                    onClick={handleClear}
                                    disabled={isLoading}
                                    variant="destructive"
                                    className="w-full"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Clearing...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Clear All Data
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                        <CardHeader>
                            <CardTitle className="text-blue-900 dark:text-blue-100">
                                ℹ️ About This Tool
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                            <p>
                                This migration tool helps you quickly populate your Convex database with realistic sample data for testing and development.
                            </p>
                            <p>
                                After running the migration, you can customize and add your own products, occasions, and testimonials through the admin panel.
                            </p>
                            <p>
                                For more information, check the <code className="bg-white/50 dark:bg-black/30 px-2 py-1 rounded">MIGRATION_GUIDE.md</code> file in the project root.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

