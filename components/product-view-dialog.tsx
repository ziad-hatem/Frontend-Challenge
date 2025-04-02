"use client";

import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Star, StarIcon } from "lucide-react";

interface ProductViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}

export function ProductViewDialog({
  open,
  onOpenChange,
  product,
}: ProductViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4 md:grid-cols-2">
          <div className="flex items-center justify-center bg-muted/40 rounded-md p-2">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="max-h-[200px] object-contain"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">{product.title}</h3>
              <Badge variant="outline" className="mt-1">
                {product.category}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(product.rating?.rate || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
              <span className="ml-1 text-sm text-muted-foreground">
                ({product.rating?.count || 0} reviews)
              </span>
            </div>
            <div className="text-2xl font-bold">
              ${product.price.toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">
              {product.description}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
