// "use client"

// import { MainLayout } from "@/components/layout/main-layout"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Slider } from "@/components/ui/slider"
// import { Switch } from "@/components/ui/switch"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useSiteSettings } from "@/components/site-provider"
// import { useTheme } from "next-themes"
// import { Palette, Type, Layout, Eye, Save, RotateCcw } from "lucide-react"
// import { useState } from "react"
// import { useToast } from "@/hooks/use-toast"

// export default function SiteCustomPage() {
//   const { settings, updateSettings } = useSiteSettings()
//   const { theme, setTheme } = useTheme()
//   const { toast } = useToast()

//   const [tempSettings, setTempSettings] = useState(settings)

//   const handleSave = () => {
//     updateSettings(tempSettings)
//     toast({
//       title: "Settings saved",
//       description: "Your customization preferences have been applied.",
//     })
//   }

//   const handleReset = () => {
//     const defaultSettings = {
//       fontSize: "16",
//       lineHeight: "1.5",
//       letterSpacing: "normal",
//       fontFamily: "Inter",
//       primaryColor: "#000000",
//       backgroundColor: "#ffffff",
//       textColor: "#000000",
//       theme: "system",
//       sidebarCollapsed: false,
//     }
//     setTempSettings(defaultSettings)
//     updateSettings(defaultSettings)
//     toast({
//       title: "Settings reset",
//       description: "All customization settings have been reset to defaults.",
//     })
//   }

//   const fontFamilies = [
//     { value: "Inter", label: "Inter (Default)" },
//     { value: "Georgia", label: "Georgia (Serif)" },
//     { value: "Arial", label: "Arial (Sans-serif)" },
//     { value: "Courier New", label: "Courier New (Monospace)" },
//     { value: "Times New Roman", label: "Times New Roman (Serif)" },
//     { value: "Helvetica", label: "Helvetica (Sans-serif)" },
//   ]

//   const letterSpacingOptions = [
//     { value: "tight", label: "Tight (-0.025em)" },
//     { value: "normal", label: "Normal (0em)" },
//     { value: "wide", label: "Wide (0.025em)" },
//     { value: "wider", label: "Wider (0.05em)" },
//   ]

//   const themeOptions = [
//     { value: "light", label: "Light" },
//     { value: "dark", label: "Dark" },
//     { value: "system", label: "System" },
//   ]

//   const backgroundPatterns = [
//     { value: "none", label: "None" },
//     { value: "dots", label: "Dots" },
//     { value: "grid", label: "Grid" },
//     { value: "diagonal", label: "Diagonal Lines" },
//     { value: "waves", label: "Waves" },
//     { value: "gradient", label: "Gradient" },
//   ]

//   return (
//     <MainLayout>
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-4">
//             <Palette className="h-8 w-8 text-primary" />
//             <h1 className="text-3xl font-bold">Site Customization</h1>
//           </div>
//           <p className="text-muted-foreground">
//             Personalize your Philosophy Tracker experience with custom themes, fonts, and layouts
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Settings Panel */}
//           <div className="lg:col-span-2">
//             <Tabs defaultValue="typography" className="space-y-6">
//               <TabsList className="grid w-full grid-cols-4">
//                 <TabsTrigger value="typography" className="flex items-center gap-2">
//                   <Type className="h-4 w-4" />
//                   Typography
//                 </TabsTrigger>
//                 <TabsTrigger value="colors" className="flex items-center gap-2">
//                   <Palette className="h-4 w-4" />
//                   Colors
//                 </TabsTrigger>
//                 <TabsTrigger value="layout" className="flex items-center gap-2">
//                   <Layout className="h-4 w-4" />
//                   Layout
//                 </TabsTrigger>
//                 <TabsTrigger value="visual" className="flex items-center gap-2">
//                   <Eye className="h-4 w-4" />
//                   Visual
//                 </TabsTrigger>
//               </TabsList>

//               {/* Typography Tab */}
//               <TabsContent value="typography" className="space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Text & Typography</CardTitle>
//                     <CardDescription>Customize font size, family, spacing, and readability options</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     {/* Font Size */}
//                     <div className="space-y-3">
//                       <Label>Font Size: {tempSettings.fontSize}px</Label>
//                       <Slider
//                         value={[Number.parseInt(tempSettings.fontSize)]}
//                         onValueChange={(value) => setTempSettings({ ...tempSettings, fontSize: value[0].toString() })}
//                         min={12}
//                         max={24}
//                         step={1}
//                         className="w-full"
//                       />
//                       <div className="flex justify-between text-xs text-muted-foreground">
//                         <span>12px</span>
//                         <span>18px (Default)</span>
//                         <span>24px</span>
//                       </div>
//                     </div>

//                     {/* Font Family */}
//                     <div className="space-y-3">
//                       <Label>Font Family</Label>
//                       <Select
//                         value={tempSettings.fontFamily}
//                         onValueChange={(value) => setTempSettings({ ...tempSettings, fontFamily: value })}
//                       >
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {fontFamilies.map((font) => (
//                             <SelectItem key={font.value} value={font.value}>
//                               {font.label}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     {/* Line Height */}
//                     <div className="space-y-3">
//                       <Label>Line Height: {tempSettings.lineHeight}</Label>
//                       <Slider
//                         value={[Number.parseFloat(tempSettings.lineHeight)]}
//                         onValueChange={(value) => setTempSettings({ ...tempSettings, lineHeight: value[0].toString() })}
//                         min={1.2}
//                         max={2.0}
//                         step={0.1}
//                         className="w-full"
//                       />
//                       <div className="flex justify-between text-xs text-muted-foreground">
//                         <span>Tight (1.2)</span>
//                         <span>Normal (1.5)</span>
//                         <span>Loose (2.0)</span>
//                       </div>
//                     </div>

//                     {/* Letter Spacing */}
//                     <div className="space-y-3">
//                       <Label>Letter Spacing</Label>
//                       <Select
//                         value={tempSettings.letterSpacing}
//                         onValueChange={(value) => setTempSettings({ ...tempSettings, letterSpacing: value })}
//                       >
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {letterSpacingOptions.map((option) => (
//                             <SelectItem key={option.value} value={option.value}>
//                               {option.label}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Colors Tab */}
//               <TabsContent value="colors" className="space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Color & Theme</CardTitle>
//                     <CardDescription>Customize colors, themes, and visual appearance</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     {/* Theme */}
//                     <div className="space-y-3">
//                       <Label>Theme</Label>
//                       <Select value={theme} onValueChange={setTheme}>
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {themeOptions.map((option) => (
//                             <SelectItem key={option.value} value={option.value}>
//                               {option.label}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     {/* Primary Color */}
//                     <div className="space-y-3">
//                       <Label>Primary Color</Label>
//                       <div className="flex items-center gap-3">
//                         <Input
//                           type="color"
//                           value={tempSettings.primaryColor}
//                           onChange={(e) => setTempSettings({ ...tempSettings, primaryColor: e.target.value })}
//                           className="w-16 h-10 p-1 border rounded"
//                         />
//                         <Input
//                           type="text"
//                           value={tempSettings.primaryColor}
//                           onChange={(e) => setTempSettings({ ...tempSettings, primaryColor: e.target.value })}
//                           placeholder="#000000"
//                           className="flex-1"
//                         />
//                       </div>
//                     </div>

//                     {/* Background Color */}
//                     <div className="space-y-3">
//                       <Label>Background Color</Label>
//                       <div className="flex items-center gap-3">
//                         <Input
//                           type="color"
//                           value={tempSettings.backgroundColor}
//                           onChange={(e) => setTempSettings({ ...tempSettings, backgroundColor: e.target.value })}
//                           className="w-16 h-10 p-1 border rounded"
//                         />
//                         <Input
//                           type="text"
//                           value={tempSettings.backgroundColor}
//                           onChange={(e) => setTempSettings({ ...tempSettings, backgroundColor: e.target.value })}
//                           placeholder="#ffffff"
//                           className="flex-1"
//                         />
//                       </div>
//                     </div>

//                     {/* Text Color */}
//                     <div className="space-y-3">
//                       <Label>Text Color</Label>
//                       <div className="flex items-center gap-3">
//                         <Input
//                           type="color"
//                           value={tempSettings.textColor}
//                           onChange={(e) => setTempSettings({ ...tempSettings, textColor: e.target.value })}
//                           className="w-16 h-10 p-1 border rounded"
//                         />
//                         <Input
//                           type="text"
//                           value={tempSettings.textColor}
//                           onChange={(e) => setTempSettings({ ...tempSettings, textColor: e.target.value })}
//                           placeholder="#000000"
//                           className="flex-1"
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Layout Tab */}
//               <TabsContent value="layout" className="space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Layout & Navigation</CardTitle>
//                     <CardDescription>Customize layout density, spacing, and navigation preferences</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     {/* Sidebar */}
//                     <div className="flex items-center justify-between">
//                       <div className="space-y-1">
//                         <Label>Sidebar Visibility</Label>
//                         <p className="text-sm text-muted-foreground">Show or hide the sidebar by default</p>
//                       </div>
//                       <Switch
//                         checked={!tempSettings.sidebarCollapsed}
//                         onCheckedChange={(checked) => setTempSettings({ ...tempSettings, sidebarCollapsed: !checked })}
//                       />
//                     </div>

//                     {/* Layout Density */}
//                     <div className="space-y-3">
//                       <Label>Layout Density</Label>
//                       <Select defaultValue="comfortable">
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="compact">Compact</SelectItem>
//                           <SelectItem value="comfortable">Comfortable</SelectItem>
//                           <SelectItem value="spacious">Spacious</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     {/* Card Style */}
//                     <div className="space-y-3">
//                       <Label>Post Card Style</Label>
//                       <Select defaultValue="card">
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="card">Card (Default)</SelectItem>
//                           <SelectItem value="borderless">Borderless</SelectItem>
//                           <SelectItem value="minimal">Minimal</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Visual Tab */}
//               <TabsContent value="visual" className="space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Visual Effects</CardTitle>
//                     <CardDescription>Customize visual effects, animations, and accessibility options</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     {/* Background Pattern */}
//                     <div className="space-y-3">
//                       <Label>Background Pattern</Label>
//                       <Select defaultValue="none">
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {backgroundPatterns.map((pattern) => (
//                             <SelectItem key={pattern.value} value={pattern.value}>
//                               {pattern.label}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     {/* Rounded Corners */}
//                     <div className="flex items-center justify-between">
//                       <div className="space-y-1">
//                         <Label>Rounded Corners</Label>
//                         <p className="text-sm text-muted-foreground">Use rounded corners for cards and buttons</p>
//                       </div>
//                       <Switch defaultChecked />
//                     </div>

//                     {/* Animations */}
//                     <div className="flex items-center justify-between">
//                       <div className="space-y-1">
//                         <Label>Page Transitions</Label>
//                         <p className="text-sm text-muted-foreground">Enable smooth page transition animations</p>
//                       </div>
//                       <Switch defaultChecked />
//                     </div>

//                     {/* High Contrast */}
//                     <div className="flex items-center justify-between">
//                       <div className="space-y-1">
//                         <Label>High Contrast Mode</Label>
//                         <p className="text-sm text-muted-foreground">Increase contrast for better accessibility</p>
//                       </div>
//                       <Switch />
//                     </div>

//                     {/* Focus Mode */}
//                     <div className="flex items-center justify-between">
//                       <div className="space-y-1">
//                         <Label>Focus Mode</Label>
//                         <p className="text-sm text-muted-foreground">Hide distractions when reading or writing</p>
//                       </div>
//                       <Switch />
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </div>

//           {/* Preview Panel */}
//           <div className="lg:col-span-1">
//             <Card className="sticky top-4">
//               <CardHeader>
//                 <CardTitle>Preview</CardTitle>
//                 <CardDescription>See how your changes will look</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div
//                   className="p-4 border rounded-lg space-y-3"
//                   style={{
//                     fontSize: `${tempSettings.fontSize}px`,
//                     lineHeight: tempSettings.lineHeight,
//                     letterSpacing:
//                       tempSettings.letterSpacing === "normal"
//                         ? "0"
//                         : tempSettings.letterSpacing === "tight"
//                           ? "-0.025em"
//                           : tempSettings.letterSpacing === "wide"
//                             ? "0.025em"
//                             : "0.05em",
//                     fontFamily: tempSettings.fontFamily,
//                     backgroundColor: tempSettings.backgroundColor,
//                     color: tempSettings.textColor,
//                   }}
//                 >
//                   <h4 className="font-semibold" style={{ color: tempSettings.primaryColor }}>
//                     Sample Evolution
//                   </h4>
//                   <p className="text-sm">
//                     This is how your text will appear with the current settings. You can see the font size, family,
//                     spacing, and colors in action.
//                   </p>
//                   <div className="flex gap-2">
//                     <button
//                       className="px-3 py-1 text-xs rounded"
//                       style={{
//                         backgroundColor: tempSettings.primaryColor,
//                         color: tempSettings.backgroundColor,
//                       }}
//                     >
//                       Primary Button
//                     </button>
//                     <button className="px-3 py-1 text-xs border rounded">Secondary</button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Action Buttons */}
//             <div className="mt-6 space-y-3">
//               <Button onClick={handleSave} className="w-full">
//                 <Save className="h-4 w-4 mr-2" />
//                 Save Changes
//               </Button>
//               <Button onClick={handleReset} variant="outline" className="w-full">
//                 <RotateCcw className="h-4 w-4 mr-2" />
//                 Reset to Defaults
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   )
// }

"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSiteSettings } from "@/components/site-provider";
import { useTheme } from "next-themes";
import {
  Palette,
  Type,
  Layout,
  Eye,
  Save,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SiteCustomPage() {
  const { settings, updateSettings } = useSiteSettings();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { toast } = useToast();

  const [tempSettings, setTempSettings] = useState(settings);

  const handleSave = () => {
    updateSettings(tempSettings);
    toast({
      title: "Settings saved",
      description: "Your customization preferences have been applied.",
    });
  };

  const handleReset = () => {
    const defaultSettings = {
      fontSize: "16",
      lineHeight: "1.5",
      letterSpacing: "normal",
      fontFamily: "Inter",
      primaryColor: "#000000",
      backgroundColor: "#ffffff",
      textColor: "#000000",
      theme: "system",
      sidebarCollapsed: false,
    };
    setTempSettings(defaultSettings);
    updateSettings(defaultSettings);
    toast({
      title: "Settings reset",
      description: "All customization settings have been reset to defaults.",
    });
  };

  const fontFamilies = [
    { value: "Inter", label: "Inter (Default)" },
    { value: "Georgia", label: "Georgia (Serif)" },
    { value: "Arial", label: "Arial (Sans-serif)" },
    { value: "Courier New", label: "Courier New (Monospace)" },
    { value: "Times New Roman", label: "Times New Roman (Serif)" },
    { value: "Helvetica", label: "Helvetica (Sans-serif)" },
  ];

  const letterSpacingOptions = [
    { value: "tight", label: "Tight (-0.025em)" },
    { value: "normal", label: "Normal (0em)" },
    { value: "wide", label: "Wide (0.025em)" },
    { value: "wider", label: "Wider (0.05em)" },
  ];

  const themeOptions = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
  ];

  const backgroundPatterns = [
    { value: "none", label: "None" },
    { value: "dots", label: "Dots" },
    { value: "grid", label: "Grid" },
    { value: "diagonal", label: "Diagonal Lines" },
    { value: "waves", label: "Waves" },
    { value: "gradient", label: "Gradient" },
  ];

  // Check if custom colors might conflict with dark mode
  const hasCustomColors =
    tempSettings.backgroundColor !== "#ffffff" ||
    tempSettings.textColor !== "#000000";
  const isDarkMode = resolvedTheme === "dark";
  const colorConflictWarning = hasCustomColors && isDarkMode;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Site Customization</h1>
          </div>
          <p className="text-muted-foreground">
            Personalize your Philosophy Tracker experience with custom themes,
            fonts, and layouts
          </p>
        </div>

        {/* Color Conflict Warning */}
        {colorConflictWarning && (
          <div className="mb-6">
            <div className="flex items-center gap-2 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Custom colors in dark mode
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                  Your custom background and text colors may not work well in
                  dark mode. Consider resetting colors or switching to light
                  mode.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Settings Panel */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="typography" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger
                  value="typography"
                  className="flex items-center gap-2"
                >
                  <Type className="h-4 w-4" />
                  Typography
                </TabsTrigger>
                <TabsTrigger value="colors" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Colors
                </TabsTrigger>
                <TabsTrigger value="layout" className="flex items-center gap-2">
                  <Layout className="h-4 w-4" />
                  Layout
                </TabsTrigger>
                <TabsTrigger value="visual" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Visual
                </TabsTrigger>
              </TabsList>

              {/* Typography Tab */}
              <TabsContent value="typography" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Text & Typography</CardTitle>
                    <CardDescription>
                      Customize font size, family, spacing, and readability
                      options
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Font Size */}
                    <div className="space-y-3">
                      <Label>Font Size: {tempSettings.fontSize}px</Label>
                      <Slider
                        value={[Number.parseInt(tempSettings.fontSize)]}
                        onValueChange={(value) =>
                          setTempSettings({
                            ...tempSettings,
                            fontSize: value[0].toString(),
                          })
                        }
                        min={12}
                        max={24}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>12px</span>
                        <span>18px (Default)</span>
                        <span>24px</span>
                      </div>
                    </div>

                    {/* Font Family */}
                    <div className="space-y-3">
                      <Label>Font Family</Label>
                      <Select
                        value={tempSettings.fontFamily}
                        onValueChange={(value) =>
                          setTempSettings({
                            ...tempSettings,
                            fontFamily: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fontFamilies.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Line Height */}
                    <div className="space-y-3">
                      <Label>Line Height: {tempSettings.lineHeight}</Label>
                      <Slider
                        value={[Number.parseFloat(tempSettings.lineHeight)]}
                        onValueChange={(value) =>
                          setTempSettings({
                            ...tempSettings,
                            lineHeight: value[0].toString(),
                          })
                        }
                        min={1.2}
                        max={2.0}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Tight (1.2)</span>
                        <span>Normal (1.5)</span>
                        <span>Loose (2.0)</span>
                      </div>
                    </div>

                    {/* Letter Spacing */}
                    <div className="space-y-3">
                      <Label>Letter Spacing</Label>
                      <Select
                        value={tempSettings.letterSpacing}
                        onValueChange={(value) =>
                          setTempSettings({
                            ...tempSettings,
                            letterSpacing: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {letterSpacingOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Colors Tab */}
              <TabsContent value="colors" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Color & Theme</CardTitle>
                    <CardDescription>
                      Customize colors, themes, and visual appearance. Note:
                      Custom colors work best in light mode.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Theme */}
                    <div className="space-y-3">
                      <Label>Theme</Label>
                      <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {themeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Primary Color */}
                    <div className="space-y-3">
                      <Label>Primary Color</Label>
                      <div className="flex items-center gap-3">
                        <Input
                          type="color"
                          value={tempSettings.primaryColor}
                          onChange={(e) =>
                            setTempSettings({
                              ...tempSettings,
                              primaryColor: e.target.value,
                            })
                          }
                          className="w-16 h-10 p-1 border rounded"
                        />
                        <Input
                          type="text"
                          value={tempSettings.primaryColor}
                          onChange={(e) =>
                            setTempSettings({
                              ...tempSettings,
                              primaryColor: e.target.value,
                            })
                          }
                          placeholder="#000000"
                          className="flex-1"
                        />
                      </div>
                    </div>

                    {/* Background Color */}
                    <div className="space-y-3">
                      <Label>Background Color (Light Mode Only)</Label>
                      <div className="flex items-center gap-3">
                        <Input
                          type="color"
                          value={tempSettings.backgroundColor}
                          onChange={(e) =>
                            setTempSettings({
                              ...tempSettings,
                              backgroundColor: e.target.value,
                            })
                          }
                          className="w-16 h-10 p-1 border rounded"
                        />
                        <Input
                          type="text"
                          value={tempSettings.backgroundColor}
                          onChange={(e) =>
                            setTempSettings({
                              ...tempSettings,
                              backgroundColor: e.target.value,
                            })
                          }
                          placeholder="#ffffff"
                          className="flex-1"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Custom background colors are only applied in light mode
                        to prevent visibility issues.
                      </p>
                    </div>

                    {/* Text Color */}
                    <div className="space-y-3">
                      <Label>Text Color (Light Mode Only)</Label>
                      <div className="flex items-center gap-3">
                        <Input
                          type="color"
                          value={tempSettings.textColor}
                          onChange={(e) =>
                            setTempSettings({
                              ...tempSettings,
                              textColor: e.target.value,
                            })
                          }
                          className="w-16 h-10 p-1 border rounded"
                        />
                        <Input
                          type="text"
                          value={tempSettings.textColor}
                          onChange={(e) =>
                            setTempSettings({
                              ...tempSettings,
                              textColor: e.target.value,
                            })
                          }
                          placeholder="#000000"
                          className="flex-1"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Custom text colors are only applied in light mode to
                        ensure readability.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Layout Tab */}
              <TabsContent value="layout" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Layout & Navigation</CardTitle>
                    <CardDescription>
                      Customize layout density, spacing, and navigation
                      preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Sidebar */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Sidebar Visibility</Label>
                        <p className="text-sm text-muted-foreground">
                          Show or hide the sidebar by default
                        </p>
                      </div>
                      <Switch
                        checked={!tempSettings.sidebarCollapsed}
                        onCheckedChange={(checked) =>
                          setTempSettings({
                            ...tempSettings,
                            sidebarCollapsed: !checked,
                          })
                        }
                      />
                    </div>

                    {/* Layout Density */}
                    <div className="space-y-3">
                      <Label>Layout Density</Label>
                      <Select defaultValue="comfortable">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compact">Compact</SelectItem>
                          <SelectItem value="comfortable">
                            Comfortable
                          </SelectItem>
                          <SelectItem value="spacious">Spacious</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Card Style */}
                    <div className="space-y-3">
                      <Label>Post Card Style</Label>
                      <Select defaultValue="card">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="card">Card (Default)</SelectItem>
                          <SelectItem value="borderless">Borderless</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Visual Tab */}
              <TabsContent value="visual" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Visual Effects</CardTitle>
                    <CardDescription>
                      Customize visual effects, animations, and accessibility
                      options
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Background Pattern */}
                    <div className="space-y-3">
                      <Label>Background Pattern</Label>
                      <Select defaultValue="none">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {backgroundPatterns.map((pattern) => (
                            <SelectItem
                              key={pattern.value}
                              value={pattern.value}
                            >
                              {pattern.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Rounded Corners */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Rounded Corners</Label>
                        <p className="text-sm text-muted-foreground">
                          Use rounded corners for cards and buttons
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    {/* Animations */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Page Transitions</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable smooth page transition animations
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    {/* High Contrast */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>High Contrast Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Increase contrast for better accessibility
                        </p>
                      </div>
                      <Switch />
                    </div>

                    {/* Focus Mode */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Focus Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Hide distractions when reading or writing
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  See how your changes will look
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="p-4 border rounded-lg space-y-3 bg-background text-foreground"
                  style={{
                    fontSize: `${tempSettings.fontSize}px`,
                    lineHeight: tempSettings.lineHeight,
                    letterSpacing:
                      tempSettings.letterSpacing === "normal"
                        ? "0"
                        : tempSettings.letterSpacing === "tight"
                        ? "-0.025em"
                        : tempSettings.letterSpacing === "wide"
                        ? "0.025em"
                        : "0.05em",
                    fontFamily: tempSettings.fontFamily,
                    // Only apply custom colors in light mode
                    backgroundColor:
                      resolvedTheme === "light" &&
                      tempSettings.backgroundColor !== "#ffffff"
                        ? tempSettings.backgroundColor
                        : undefined,
                    color:
                      resolvedTheme === "light" &&
                      tempSettings.textColor !== "#000000"
                        ? tempSettings.textColor
                        : undefined,
                  }}
                >
                  <h4
                    className="font-semibold"
                    style={{ color: tempSettings.primaryColor }}
                  >
                    Sample Evolution
                  </h4>
                  <p className="text-sm">
                    This is how your text will appear with the current settings.
                    You can see the font size, family, spacing, and colors in
                    action.
                  </p>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 text-xs rounded text-white"
                      style={{
                        backgroundColor: tempSettings.primaryColor,
                      }}
                    >
                      Primary Button
                    </button>
                    <button className="px-3 py-1 text-xs border rounded">
                      Secondary
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <Button onClick={handleSave} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
