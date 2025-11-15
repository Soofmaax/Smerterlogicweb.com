import { defineType, defineField } from "sanity";

export const newsletterType = defineType({
  name: "newsletter",
  title: "Newsletter",
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
      name: "sendAt",
      title: "Scheduled send at",
      type: "datetime",
    }),
    defineField({
      name: "ready",
      title: "Ready (approved for sending)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }],
    }),
    defineField({
      name: "links",
      title: "Extra links",
      type: "array",
      of: [
        defineField({
          type: "object",
          name: "link",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "url", type: "url", title: "URL" },
          ],
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "object",
      fields: [
        { name: "text", type: "string", title: "Text" },
        { name: "url", type: "url", title: "URL" },
      ],
    }),
  ],
});