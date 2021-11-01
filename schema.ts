// Code copied (with some modifications) from the Keystone 6 "with-auth" example
// See.. https://github.com/keystonejs/keystone/tree/master/examples/with-auth

import { list } from "@keystone-next/keystone";
import {
  password,
  text,
  relationship,
  file,
  image,
  timestamp,
  select,
} from "@keystone-next/keystone/fields";
const path = require("path");
import { document } from "@keystone-next/fields-document";

import slugify from "./utils/slugify";
import random from "./utils/random";
import formatDescription from "./utils/formatShortDescription";

const today = new Date().toISOString();

export const lists = {
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
        isFilterable: true,
      }),
      password: password({ validation: { isRequired: true } }),
    },
    ui: {
      listView: {
        initialColumns: ["name"],
      },
    },
  }),

  NewsUpdate: list({
    fields: {
      title: text(),
      slug: text({
        defaultValue: "",
        ui: { createView: { fieldMode: "hidden" } },
      }),
      photo: relationship({
        ref: "NewsImage.post",
        ui: {
          displayMode: "cards",
          cardFields: ["image", "altText"],
          inlineCreate: { fields: ["image", "altText"] },
        },
      }),
      shortDescription: text({
        validation: { length: { min: 300, max: 400 } },
        ui: {
          displayMode: "textarea",
        },
      }),
      status: select({
        options: [
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" },
        ],
        defaultValue: "draft",
        ui: {
          displayMode: "segmented-control",
        },
      }),
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      publishDate: timestamp({ defaultValue: today }),
    },
    hooks: {
      resolveInput: ({ resolvedData }) => {
        const { title, shortDescription, photo } = resolvedData;
        if (title) resolvedData.slug = slugify(title) + "-" + random();
        if (shortDescription)
          resolvedData.shortDescription = formatDescription(shortDescription);

        if (photo) console.log(photo);

        return resolvedData;
      },
      validateInput: ({ resolvedData, addValidationError }) => {
        // const { status } = resolvedData;
        // if (status === "published") {
        //   const error = validNewsUpdate({ ...resolvedData });
        //   console.log(error);
        //   if (error) addValidationError(error[0]);
        // }
      },
    },
    ui: {
      listView: {
        initialColumns: ["title", "photo"],
      },
    },
  }),
  NewsImage: list({
    fields: {
      image: image(),
      altText: text(),
      post: relationship({ ref: "NewsUpdate.photo" }),
      src: text({
        defaultValue: "",
        ui: { createView: { fieldMode: "hidden" } },
      }),
    },
    ui: {
      listView: {
        initialColumns: ["image", "altText"],
      },
    },
  }),
  MediaResource: list({
    fields: {
      name: text(),
      file: file(),
    },
    ui: {
      listView: {
        initialColumns: ["name", "id"],
      },
    },
  }),
};
