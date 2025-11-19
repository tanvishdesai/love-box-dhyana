"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface ProductFormProps {
  initialData?: {
    _id: Id<"products">;
    name: string;
    description: string;
    price: number;
    images: string[];
    occasionId?: Id<"occasions">;
    isFeatured: boolean;
  };
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const occasions = useQuery(api.occasions.get) || [];
  const createProduct = useMutation(api.products.create);
  const updateProduct = useMutation(api.products.update);

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price.toString() || "",
    images: initialData?.images.join(", ") || "",
    occasionId: initialData?.occasionId || "none",
    isFeatured: initialData?.isFeatured || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const imagesArray = formData.images.split(",").map((s) => s.trim());
    const priceNumber = parseFloat(formData.price);

    if (initialData) {
      await updateProduct({
        id: initialData._id,
        name: formData.name,
        description: formData.description,
        price: priceNumber,
        images: imagesArray,
        occasionId:
          formData.occasionId === "none"
            ? undefined
            : (formData.occasionId as Id<"occasions">),
        isFeatured: formData.isFeatured,
      });
    } else {
      await createProduct({
        name: formData.name,
        description: formData.description,
        price: priceNumber,
        images: imagesArray,
        occasionId:
          formData.occasionId === "none"
            ? undefined
            : (formData.occasionId as Id<"occasions">),
        isFeatured: formData.isFeatured,
      });
    }

    router.push("/admin/products");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="images">Images (comma separated URLs)</Label>
          <Textarea
            id="images"
            value={formData.images}
            onChange={(e) =>
              setFormData({ ...formData, images: e.target.value })
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="occasion">Occasion</Label>
          <Select
            value={formData.occasionId}
            onValueChange={(value) =>
              setFormData({ ...formData, occasionId: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an occasion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {occasions.map((occasion) => (
                <SelectItem key={occasion._id} value={occasion._id}>
                  {occasion.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isFeatured"
            checked={formData.isFeatured}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isFeatured: checked as boolean })
            }
          />
          <Label htmlFor="isFeatured">Featured Product</Label>
        </div>
      </div>

      <Button type="submit">{initialData ? "Update" : "Create"} Product</Button>
    </form>
  );
}
