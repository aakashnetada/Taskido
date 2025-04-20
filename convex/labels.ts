import { query, mutation, action } from "./_generated/server";
import { v } from "convex/values";
import { handleUserId } from "./auth";
import { api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

export const getLabels = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserId(ctx);
    if (userId) {
      const userLabels = await ctx.db
        .query("labels")
        .filter((q) => q.eq(q.field("userId"), userId))
        .collect();

      const systemLabels = await ctx.db.query("labels").collect();

      return [...systemLabels, ...userLabels];
    }
    return [];
  },
});

export const getLabelByLabelId = query({
  args: {
    labelId: v.id("labels"),
  },
  handler: async (ctx, { labelId }) => {
    const userId = await handleUserId(ctx);
    if (userId) {
      const project = await ctx.db
        .query("labels")
        .filter((q) => q.eq(q.field("_id"), labelId))
        .collect();

      return project?.[0] || null;
    }
    return null;
  },
});

export const deleteLabel = mutation({
  args: {
    labelId: v.id("labels"),
  },
  handler: async (ctx, { labelId }) => {
    try {
      const userId = await handleUserId(ctx);
      if (userId) {
        const taskId = await ctx.db.delete(labelId);
        //query todos and map through them and delete

        return taskId;
      }

      return null;
    } catch (err) {
      console.log("Error occurred during deleteLabel mutation", err);

      return null;
    }
  },
});

export const deleteLabelAndItsTasks = action({
  args: {
    labelId: v.id("labels"),
  },
  handler: async (ctx, { labelId }) => {
    try {
      const allTasks = await ctx.runQuery(api.todos.getTodosByLabelId, {
        labelId,
      });

      const promises = Promise.allSettled(
        allTasks.map(async (task: Doc<"todos">) =>
          ctx.runMutation(api.todos.deleteATodo, {
            taskId: task._id,
          })
        )
      );
      const statuses = await promises;

      await ctx.runMutation(api.labels.deleteLabel, {
        labelId,
      });
    } catch (err) {
      console.error("Error deleting tasks and labels", err);
    }
  },
});

export const createALabel = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, { name }) => {
    try {
      const userId = await handleUserId(ctx);
      if (userId) {
        const newTaskId = await ctx.db.insert("labels", {
          userId,
          name,
          type: "user",
        });
        return newTaskId;
      }

      return null;
    } catch (err) {
      console.log("Error occurred during createALabel mutation", err);

      return null;
    }
  },
});