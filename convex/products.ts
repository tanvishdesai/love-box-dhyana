import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("products").collect();
    },
});

export const getById = query({
    args: { id: v.id("products") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const getByOccasion = query({
    args: { occasionId: v.id("occasions") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("products")
            .filter((q) => q.eq(q.field("occasionId"), args.occasionId))
            .collect();
    },
});

export const getFeatured = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("products")
            .filter((q) => q.eq(q.field("isFeatured"), true))
            .collect();
    },
});

export const create = mutation({
    args: {
        name: v.string(),
        description: v.string(),
        price: v.number(),
        images: v.array(v.string()),
        categoryId: v.optional(v.string()),
        occasionId: v.optional(v.id("occasions")),
        isFeatured: v.boolean(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("products", args);
    },
});

export const update = mutation({
    args: {
        id: v.id("products"),
        name: v.optional(v.string()),
        description: v.optional(v.string()),
        price: v.optional(v.number()),
        images: v.optional(v.array(v.string())),
        categoryId: v.optional(v.string()),
        occasionId: v.optional(v.id("occasions")),
        isFeatured: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const { id, ...fields } = args;
        await ctx.db.patch(id, fields);
    },
});

export const remove = mutation({
    args: { id: v.id("products") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
