// "use client";

// import { useState, useEffect } from "react";
// import { DashboardHeader } from "@/components/dashboard/dashboard-header";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { SidebarInset } from "@/components/ui/sidebar";
// import { Plus, Edit, Trash2, X, Check } from "lucide-react";

// interface Script {
//   id: string;
//   objection: string;
//   rebuttals: string[];
//   preferred: string;
//   createdAt: string;
// }

// export default function AdminScripts() {
//   const [scripts, setScripts] = useState<Script[]>([]);
//   const [isAdding, setIsAdding] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [formData, setFormData] = useState({
//     objection: "",
//     rebuttals: [""],
//     preferred: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const breadcrumbs = [{ label: "Admin", href: "/admin" }, { label: "Scripts" }];

//   useEffect(() => {
//     fetchScripts();
//   }, []);

//   const fetchScripts = async () => {
//     try {
//       const response = await fetch("/api/admin/scripts");
//       if (response.ok) {
//         const data = await response.json();
//         setScripts(data);
//       }
//     } catch (error) {
//       console.error("Error fetching scripts:", error);
//     }
//   };

//   const handleAddRebuttal = () => {
//     setFormData((prev) => ({
//       ...prev,
//       rebuttals: [...prev.rebuttals, ""],
//     }));
//   };

//   const handleRemoveRebuttal = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       rebuttals: prev.rebuttals.filter((_, i) => i !== index),
//       preferred: prev.rebuttals[index] === prev.preferred ? "" : prev.preferred,
//     }));
//   };

//   const handleRebuttalChange = (index: number, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       rebuttals: prev.rebuttals.map((r, i) => (i === index ? value : r)),
//       preferred: prev.rebuttals[index] === prev.preferred ? value : prev.preferred,
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!formData.objection.trim() || !formData.preferred) {
//       alert("Please fill in all required fields");
//       return;
//     }

//     const validRebuttals = formData.rebuttals.filter((r) => r.trim());
//     if (validRebuttals.length === 0) {
//       alert("Please add at least one rebuttal");
//       return;
//     }

//     setLoading(true);
//     try {
//       const url = editingId ? `/api/admin/scripts/${editingId}` : "/api/admin/scripts";

//       const method = editingId ? "PUT" : "POST";

//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           objection: formData.objection.trim(),
//           rebuttals: validRebuttals,
//           preferred: formData.preferred,
//         }),
//       });

//       if (response.ok) {
//         await fetchScripts();
//         resetForm();
//       } else {
//         const error = await response.json();
//         alert(error.error || "Failed to save script");
//       }
//     } catch (error) {
//       console.error("Error saving script:", error);
//       alert("Failed to save script");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (script: Script) => {
//     setEditingId(script.id);
//     setFormData({
//       objection: script.objection,
//       rebuttals: script.rebuttals,
//       preferred: script.preferred,
//     });
//     setIsAdding(true);
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this script?")) return;

//     try {
//       const response = await fetch(`/api/admin/scripts/${id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         await fetchScripts();
//       } else {
//         alert("Failed to delete script");
//       }
//     } catch (error) {
//       console.error("Error deleting script:", error);
//       alert("Failed to delete script");
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       objection: "",
//       rebuttals: [""],
//       preferred: "",
//     });
//     setIsAdding(false);
//     setEditingId(null);
//   };

//   return (
//     <SidebarInset>
//       <DashboardHeader title="Script Management" breadcrumbs={breadcrumbs} />

//       <div className="flex flex-1 flex-col gap-4 pt-0">
//         <div className="min-h-[100vh] flex-1 p-4 rounded-xl bg-muted/50 md:min-h-min">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Script Form */}
//             <Card className="border-0 bg-white">
//               <CardHeader>
//                 <CardTitle className="flex items-center justify-between">
//                   {editingId ? "Edit Script" : "Add New Script"}
//                   {!isAdding && (
//                     <Button onClick={() => setIsAdding(true)} size="sm">
//                       <Plus className="h-4 w-4 mr-2" />
//                       Add Script
//                     </Button>
//                   )}
//                 </CardTitle>
//                 <CardDescription>Create objection scenarios with multiple rebuttal options</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 {isAdding ? (
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="objection">Objection *</Label>
//                       <Input
//                         id="objection"
//                         value={formData.objection}
//                         onChange={(e) => setFormData((prev) => ({ ...prev, objection: e.target.value }))}
//                         placeholder="e.g., I'm not interested in your service"
//                         className="mt-1"
//                       />
//                     </div>

//                     <div>
//                       <Label>Rebuttals *</Label>
//                       <div className="space-y-2 mt-1">
//                         {formData.rebuttals.map((rebuttal, index) => (
//                           <div key={index} className="flex gap-2">
//                             <Input
//                               value={rebuttal}
//                               onChange={(e) => handleRebuttalChange(index, e.target.value)}
//                               placeholder={`Rebuttal ${index + 1}`}
//                               className="flex-1"
//                             />
//                             <Button
//                               type="button"
//                               variant="outline"
//                               size="sm"
//                               onClick={() => handleRemoveRebuttal(index)}
//                               disabled={formData.rebuttals.length === 1}
//                             >
//                               <X className="h-4 w-4" />
//                             </Button>
//                           </div>
//                         ))}
//                         <Button type="button" variant="outline" size="sm" onClick={handleAddRebuttal}>
//                           <Plus className="h-4 w-4 mr-2" />
//                           Add Rebuttal
//                         </Button>
//                       </div>
//                     </div>

//                     <div>
//                       <Label htmlFor="preferred">Preferred Rebuttal *</Label>
//                       <select
//                         id="preferred"
//                         value={formData.preferred}
//                         onChange={(e) => setFormData((prev) => ({ ...prev, preferred: e.target.value }))}
//                         className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//                       >
//                         <option value="">Select preferred rebuttal</option>
//                         {formData.rebuttals
//                           .filter((r) => r.trim())
//                           .map((rebuttal, index) => (
//                             <option key={index} value={rebuttal}>
//                               {rebuttal}
//                             </option>
//                           ))}
//                       </select>
//                     </div>

//                     <div className="flex gap-2 pt-4">
//                       <Button onClick={handleSubmit} disabled={loading} className="flex-1">
//                         {loading ? "Saving..." : editingId ? "Update Script" : "Create Script"}
//                       </Button>
//                       <Button variant="outline" onClick={resetForm} disabled={loading}>
//                         Cancel
//                       </Button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-center py-8 text-gray-500">
//                     <Plus className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//                     <p>Click &quot;Add Script&quot; to create a new objection scenario</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Scripts List */}
//             <Card className="border-0 bg-white">
//               <CardHeader>
//                 <CardTitle>Existing Scripts</CardTitle>
//                 <CardDescription>Manage your objection scenarios and rebuttals</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {scripts.length === 0 ? (
//                     <div className="text-center py-8 text-gray-500">
//                       <p>No scripts created yet</p>
//                     </div>
//                   ) : (
//                     scripts.map((script) => (
//                       <div key={script.id} className="border rounded-lg p-4 space-y-3">
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             <h4 className="font-medium text-gray-900 mb-2">{script.objection}</h4>
//                             <div className="space-y-1">
//                               {script.rebuttals.map((rebuttal, index) => (
//                                 <div
//                                   key={index}
//                                   className={`text-sm p-2 rounded ${
//                                     rebuttal === script.preferred
//                                       ? "bg-green-50 text-green-700 border border-green-200"
//                                       : "bg-gray-50 text-gray-600"
//                                   }`}
//                                 >
//                                   {rebuttal}
//                                   {rebuttal === script.preferred && <Check className="h-3 w-3 inline ml-2" />}
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                           <div className="flex gap-1 ml-4">
//                             <Button variant="outline" size="sm" onClick={() => handleEdit(script)}>
//                               <Edit className="h-4 w-4" />
//                             </Button>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() => handleDelete(script.id)}
//                               className="text-red-600 hover:text-red-700"
//                             >
//                               <Trash2 className="h-4 w-4" />
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </SidebarInset>
//   );
// }

export default function AdminScripts() {
  return <div>AdminScripts</div>;
}
