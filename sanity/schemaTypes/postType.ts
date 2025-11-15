import { defineType, defineField } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "locale",
      title: "Locale",
      type: "string",
      initialValue: "fr",
      options: {
        list: [
          { title: "Français", value: "fr" },
          { title: "English", value: "en" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
    }),
    defineField({
      name: "publishAt",
      title: "Publish at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "published",
      title: "Published (force immediate)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "draft",
      title: "Draft (hide from publication)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "altLocales",
      title: "Alternate locale slugs",
      type: "object",
      fields: [
        { name: "fr", type: "string", title: "FR slug" },
        { name: "en", type: "string", title: "EN slug" },
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" }, // headings, paragraphs, lists, quotes...
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        },
        { type: "code" },
      ],
    }),
  ],
});