import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFiles = mutation({
  args: {
    name: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("files", {
      name: args.name,
    });
  },
});
export const getFiles = query({
  args: {},
  async handler(ctx) {
    return ctx.db.query('files').collect();
  },
});
