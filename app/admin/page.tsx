"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Calendar, MessageSquare, Mail } from "lucide-react";

export default function AdminDashboard() {
  const products = useQuery(api.products.get) || [];
  const occasions = useQuery(api.occasions.get) || [];
  const testimonials = useQuery(api.testimonials.get) || [];
  // const inquiries = useQuery(api.inquiries.get) || []; // Assuming inquiries API exists

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      description: "Active items in catalog",
    },
    {
      title: "Occasions",
      value: occasions.length,
      icon: Calendar,
      description: "Gift categories",
    },
    {
      title: "Testimonials",
      value: testimonials.length,
      icon: MessageSquare,
      description: "Customer reviews",
    },
    {
      title: "Inquiries",
      value: 0, // inquiries.length,
      icon: Mail,
      description: "Pending messages",
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-white font-playfair">
        Dashboard Overview
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-zinc-500 mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
