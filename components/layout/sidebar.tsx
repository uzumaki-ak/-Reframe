"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSiteSettings } from "@/components/site-provider";
import { getCurrentUser, createUser } from "@/lib/database";
import {
  Brain,
  Home,
  MailPlus,
  Telescope,
  X,
  User,
  Calendar,
  LucideFolderHeart,
  Edit3,
  SearchCode,
  PackageOpen,
  MonitorCogIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { settings, toggleSidebar } = useSiteSettings();
  const pathname = usePathname();
  const [user, setUser] = useState(getCurrentUser());
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Update user when localStorage changes
    const handleStorageChange = () => {
      setUser(getCurrentUser());
    };

    window.addEventListener("storage", handleStorageChange);

    // Also check periodically in case user was created in same tab
    const interval = setInterval(() => {
      const currentUser = getCurrentUser();
      if (currentUser && !user) {
        setUser(currentUser);
      }
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [user]);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "My Thoughts", href: "/my-thoughts", icon: LucideFolderHeart },
    { name: "Explore Thoughts", href: "/explore-thoughts", icon: Telescope },
    { name: "Share Evolution", href: "/share-evolution", icon: MailPlus },
    { name: "Archive", href: "/archive", icon: PackageOpen },
    { name: "Search", href: "/search", icon: SearchCode },
    { name: "Customize", href: "/site-custom", icon: MonitorCogIcon },
  ];

  // Don't render sidebar when collapsed
  if (settings.sidebarCollapsed) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(dateString));
  };

  const handleEditName = () => {
    setNewName(user?.name || "");
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    if (!newName.trim()) {
      toast({
        title: "Error",
        description: "Name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    try {
      // Create a new user with the new name
      const updatedUser = await createUser(newName.trim());
      setUser(updatedUser);
      setIsEditingName(false);
      toast({
        title: "Success",
        description: "Your name has been updated!",
      });
    } catch (error) {
      console.error("Error updating name:", error);
      toast({
        title: "Error",
        description: "Failed to update name. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setNewName("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveName();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 bg-card border-r",
          "md:relative",
          className
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" className="flex items-center gap-2">
              {/* <Brain className="h-6 w-6 text-primary" /> */}
              <img src="/logo.jpg" alt="logo" height={20} width={20} />
              <span className="font-semibold"> Reframe</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => toggleSidebar()} // Close sidebar on mobile after click
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                      isActive && "bg-accent text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </ScrollArea>

          {/* User Profile Section */}
          {user && (
            <div className="p-4 border-t bg-muted/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  {isEditingName ? (
                    <div className="space-y-2">
                      <Input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Enter your name"
                        className="h-8 text-sm"
                        autoFocus
                        disabled={isUpdating}
                      />
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          onClick={handleSaveName}
                          disabled={isUpdating}
                          className="h-6 px-2 text-xs"
                        >
                          {isUpdating ? "..." : "Save"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                          disabled={isUpdating}
                          className="h-6 px-2 text-xs"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">
                          {user.name}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleEditName}
                          className="h-4 w-4 p-0 hover:bg-transparent"
                        >
                          <Edit3 className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Joined {formatDate(user.createdAt)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="p-4 border-t">
            <p className="text-xs text-muted-foreground">
              Track your philosophical evolution
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
