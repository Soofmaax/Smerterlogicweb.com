import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.SANITY_PROJECT_ID || "afuqy886";
const dataset = process.env.SANITY_DATASET || "production";

export default defineConfig({
  name: "smarterlogicweb-studio",
  title: "SmarterLogicWeb Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [deskTool(), visionTool(), codeInput()],
  schema: {
    types: schemaTypes,
  },
});