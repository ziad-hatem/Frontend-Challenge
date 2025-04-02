"use client"

import { useState } from "react"
import { useProductStore } from "@/store/product-store"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface ProductDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product
}

export function ProductDeleteDialog({ open, onOpenChange, product }: ProductDeleteDialogProps) {
  const { deleteProduct } = useProductStore()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    setIsDeleting(true)
    try {
      await deleteProduct(product.id)
      toast({
        title: "Product deleted",
        description: "The product has been deleted successfully.",
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error deleting the product.",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 py-4">
          <div className="w-16 h-16 rounded-md overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="font-medium">{product.title}</h3>
            <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

