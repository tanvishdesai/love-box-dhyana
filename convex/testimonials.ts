import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("testimonials").collect();
    },
});

export const create = mutation({
    args: {
        name: v.string(),
        role: v.string(),
        quote: v.string(),
        image: v.optional(v.string()),
        rating: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("testimonials", args);
    },
});

export const update = mutation({
    args: {
        id: v.id("testimonials"),
        name: v.optional(v.string()),
        role: v.optional(v.string()),
        quote: v.optional(v.string()),
        image: v.optional(v.string()),
        rating: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const { id, ...fields } = args;
        await ctx.db.patch(id, fields);
    },
});

export const remove = mutation({
    args: { id: v.id("testimonials") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
