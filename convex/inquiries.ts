import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        message: v.string(),
    },
    handler: async (ctx, args) => {
        const inquiryId = await ctx.db.insert("inquiries", {
            name: args.name,
            email: args.email,
            phone: args.phone,
            message: args.message,
            submittedAt: Date.now(),
        });

        // TODO: In a production setup, you would trigger a server action here
        // to send emails via Resend/SendGrid and WhatsApp via Twilio
        // For now, the data is stored in the database

        return inquiryId;
    },
});
