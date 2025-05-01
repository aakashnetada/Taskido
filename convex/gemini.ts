import { v } from "convex/values";
import { api } from "./_generated/api";
import { action } from "./_generated/server";
import { Id } from "./_generated/dataModel";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = new GoogleGenerativeAI(process.env.GEMINI_AI_KEY);
const gemini = apiKey.getGenerativeModel({ model: "gemini-1.5-flash",generationConfig: { responseMimeType: "application/json" } });

export const getEmbeddingsWithAI = async (searchText: string) => {
  if (!apiKey) {
    throw new Error("Gemini AI Key is not defined");
  }

  const model = apiKey.getGenerativeModel({ model: "text-embedding-004" });
  const text = searchText;
  const result = await model.embedContent(text);

  const vector = result.embedding.values;
  console.log(`Embedding of ${searchText}: , ${vector.length} dimensions`);
  return vector;
};

export const suggestMissingItemsWithAi = action({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const todos = await ctx.runQuery(api.todos.getTodosByProjectId, {
      projectId,
    });
    const project = await ctx.runQuery(api.projects.getProjectByProjectId, {
      projectId,
    });
    const projectName = project?.name || "";

    let prompt = `
    I'm a project manager and I need help identifying missing to-do items.
    I have a list of existing tasks: ${JSON.stringify(todos)}, containing objects with 'taskName' and 'description' properties.
    Can you help me identify 3 additional to-do items for the project that is not yet included in this list?
    I also have a good understanding of the project scope, which is ${projectName}.
    Please provide the missing item as a task name and description.
    Ensure there are no duplicates between the existing list and the new suggestion.
    Return the result as a JSON array of objects with the following structure:
    [{ "taskName": "string", "description": "string" }, ...]
    }`;

    const result = await gemini.generateContent(prompt);
    const res = result.response.text();
    const cleanedResponse = res.replace(/^'/, '').replace(/['\n]/g, '');
    
    // Parse the response, ensuring we get an array
    let tasks;
    try {
      const parsedResponse = JSON.parse(cleanedResponse);
      
      // Check if the response is an array or has a property containing the array
      if (Array.isArray(parsedResponse)) {
        tasks = parsedResponse;
      } else if (parsedResponse.subTasks && Array.isArray(parsedResponse.subTasks)) {
        tasks = parsedResponse.subTasks;
      } else {
        // If we can't find an array, log the issue and return early
        console.error("Unexpected response format:", parsedResponse);
        return;
      }
    } catch (error) {
      console.error("Error parsing JSON response:", error);
      return;
    }

    console.log("Tasks to create:", tasks);

    for (const task of tasks) {
      const { taskName, description } = task;

      if (taskName && description) {
        const embedding = await getEmbeddingsWithAI(taskName);
        const AI_LABEL_ID = "k17amkrp6rc8ss2jy0erf4hbxn72vfma";

        await ctx.runMutation(api.todos.createATodo, {
          taskName,
          description,
          priority: 1,
          dueDate: new Date().getTime(),
          projectId,
          labelId: AI_LABEL_ID as Id<"labels">,
          embedding,
        });
      }
    }
  },
});

export const suggestMissingSubItemsWithAi = action({
  args: {
    projectId: v.id("projects"),
    parentId: v.id("todos"),
    taskName: v.string(),
    description: v.string(),
  },
  handler: async (ctx, { projectId, parentId, taskName, description }) => {

    const subTodos = await ctx.runQuery(api.subTodos.getSubTodosByParentId, {
      parentId,
    });
    const project = await ctx.runQuery(api.projects.getProjectByProjectId, {
      projectId,
    });
    const projectName = project?.name || "";

    let prompt = `
    I'm a project manager and I need help identifying missing sub tasks for a Parent Todo, Also here is the Parent Todo Task Name: ${JSON.stringify(taskName)} and Description: ${JSON.stringify(description)}.
    I have a list of existing sub tasks: ${JSON.stringify(subTodos)}, containing objects with 'taskName' and 'description' properties.
    Can you help me identify 3 additional to-do items for the project that is not yet included in this list?
    I also have a good understanding of the project scope, which is ${projectName}.
    Please provide the missing sub task as a task name and description.
    Ensure there are no duplicates between the existing list and the new suggestion.
    Return the result as a JSON array of objects with the following structure:
    [{ "taskName": "string", "description": "string" }, ...]`;

    const result = await gemini.generateContent(prompt);
    const res = result.response.text();
    const cleanedResponse = res.replace(/^'/, '').replace(/['\n]/g, '');
    
    // Parse the response, ensuring we get an array
    let tasks;
    try {
      const parsedResponse = JSON.parse(cleanedResponse);
      
      // Check if the response is an array or has a property containing the array
      if (Array.isArray(parsedResponse)) {
        tasks = parsedResponse;
      } else if (parsedResponse.subTasks && Array.isArray(parsedResponse.subTasks)) {
        tasks = parsedResponse.subTasks;
      } else {
        // If we can't find an array, log the issue and return early
        console.error("Unexpected response format:", parsedResponse);
        return;
      }
    } catch (error) {
      console.error("Error parsing JSON response:", error);
      return;
    }

    console.log("Tasks to create:", tasks);

    for (const task of tasks) {
      const { taskName, description } = task;

      if (taskName && description) {
        const embedding = await getEmbeddingsWithAI(taskName);
        const AI_LABEL_ID = "k17amkrp6rc8ss2jy0erf4hbxn72vfma";

        await ctx.runMutation(api.subTodos.createASubTodo, {
          taskName,
          description,
          priority: 1,
          dueDate: new Date().getTime(),
          projectId,
          parentId,
          labelId: AI_LABEL_ID as Id<"labels">,
          embedding,
        });
      }
    }
  },
});