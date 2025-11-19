import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("occasions").collect();
    },
});

export const getById = query({
    args: { id: v.id("occasions") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const create = mutation({
    args: {
        name: v.string(),
        description: v.optional(v.string()),
        image: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("occasions", args);
    },
});

export const update = mutation({
    args: {
        id: v.id("occasions"),
        name: v.optional(v.string()),
        description: v.optional(v.string()),
        image: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...fields } = args;
        await ctx.db.patch(id, fields);
    },
});

export const remove = mutation({
    args: { id: v.id("occasions") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
