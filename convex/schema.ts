import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    inquiries: defineTable({
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        message: v.string(),
        submittedAt: v.number(),
    }),
    occasions: defineTable({
        name: v.string(),
        description: v.optional(v.string()),
        image: v.optional(v.string()),
    }),
    products: defineTable({
        name: v.string(),
        description: v.string(),
        price: v.number(),
        images: v.array(v.string()),
        categoryId: v.optional(v.string()),
        occasionId: v.optional(v.id("occasions")),
        isFeatured: v.boolean(),
    }),
    testimonials: defineTable({
        name: v.string(),
        role: v.string(),
        quote: v.string(),
        image: v.optional(v.string()),
        rating: v.number(),
    }),
});
