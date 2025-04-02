"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function ToastExample() {
  const { toast } = useToast();

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Toast Examples</h2>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => {
            toast({
              title: "Default Toast",
              description: "This is a default toast notification",
            });
          }}
        >
          Show Default Toast
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            toast({
              variant: "destructive",
              title: "Error Toast",
              description: "Something went wrong!",
            });
          }}
        >
          Show Error Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Toast with Action",
              description: "This toast has an action button",
              action: (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log("Action clicked")}
                >
                  Undo
                </Button>
              ),
            });
          }}
        >
          Toast with Action
        </Button>
      </div>
    </div>
  );
}
