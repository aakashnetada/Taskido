/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as authAdapter from "../authAdapter.js";
import type * as gemini from "../gemini.js";
import type * as generateKeys from "../generateKeys.js";
import type * as http from "../http.js";
import type * as labels from "../labels.js";
import type * as projects from "../projects.js";
import type * as search from "../search.js";
import type * as subTodos from "../subTodos.js";
import type * as todos from "../todos.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  authAdapter: typeof authAdapter;
  gemini: typeof gemini;
  generateKeys: typeof generateKeys;
  http: typeof http;
  labels: typeof labels;
  projects: typeof projects;
  search: typeof search;
  subTodos: typeof subTodos;
  todos: typeof todos;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
