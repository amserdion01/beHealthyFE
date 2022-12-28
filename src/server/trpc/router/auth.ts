import { prisma } from "./../../db/client";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import axios from "axios";
import { type RecipeType } from "../../../types/recipe";
import { Storage } from "@google-cloud/storage";
const storage = new Storage({
  keyFilename: "/Users/personal/webtech/beHealthy/beHealthyFE/gcp_keyfile.json",
});
const bucket = storage.bucket("behealthy");

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
  deleteRecipe: protectedProcedure
    .input(
      z.object({
        recipeID: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const res = await axios.delete<RecipeType>(
        `http://0.0.0.0:8080/v1/recipe/${input.recipeID}`
      );
      if (res.status == 200) {
        await prisma.recipe.delete({ where: { id: input.recipeID } });
        await bucket
          .file(
            res.data.ImageURL.replace(
              "https://storage.googleapis.com/behealthy/",
              ""
            )
          )
          .delete();
      }
    }),
  getCookbookRecipes: protectedProcedure
    .input(
      z.object({
        CookbookID: z.string(),
      })
    )
    .query(async ({ input }) => {
      const recipeIDs = await prisma.recipe.findMany({
        where: {
          cookbookId: input.CookbookID,
        },
      });

      const recipes: RecipeType[] = [];

      for (const { id } of recipeIDs) {
        const { data } = await axios.get<RecipeType>(
          `http://0.0.0.0:8080/v1/recipe/${id}`
        );

        recipes.push(data);
      }
      console.log(recipes);

      return recipes;
    }),
  getCookbooks: protectedProcedure.query(async () => {
    const cookbooks = await prisma.cookbook.findMany({
      select: {
        id: true,
        recipes: true,
        user: false,
        userId: false,
        name: true,
      },
    });

    return cookbooks;
  }),
  //   {
  //     "Name": "Supa crem de legume",
  //     "Author": "test",
  //     "AuthorID": "testing123",
  //     "Ingredients": "apa,morcovi,cartofi,cartofi dulci,ceapa,patrunjel,telina,sare,piper,smantana de gatit",
  //     "Details": "mai incolo",
  //     "Portions": 10,
  //     "Preparation": 20,
  //     "Cooking": 40,
  //     "Tools": "oala"
  // }
  addRecipe: protectedProcedure
    .input(
      z.object({
        Name: z.string(),
        // Author: z.string(),
        // AuthorID: z.string(),
        Ingredients: z.string(),
        Details: z.string(),
        Portions: z.number(),
        Preparation: z.number(),
        Cooking: z.number(),
        Tools: z.string(),
        CookbookID: z.string(),
        Image: z.object({
          blob: z.string(),
          name: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await bucket
        .file(`${input.CookbookID}_${input.Image.name}`)
        .save(Buffer.from(input.Image.blob, "base64").toString());
      const ImageURL = await bucket
        .file(`${input.CookbookID}_${input.Image.name}`)
        .publicUrl();
      const res = await axios.post<RecipeType>(
        "http://0.0.0.0:8080/v1/recipe",
        {
          Author: ctx.session.user.name,
          AuthorID: ctx.session.user.id,
          ImageURL,
          ...input,
        }
      );
      const realRecipe = res.data;
      const recipe = await prisma.recipe.create({
        data: {
          id: realRecipe.ID,
          cookbook: {
            connect: {
              id: input.CookbookID,
            },
          },
        },
      });
      return recipe;
    }),
  addCookbook: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.id) {
        const cookbook = await prisma.cookbook.create({
          data: {
            name: input.name,
            user: {
              connect: { id: ctx.session.user.id },
            },
          },
          select: {
            id: true,
            user: false,
            userId: false,
            name: true,
            recipes: true,
          },
        });
        return cookbook;
      }

      return `userid: ${ctx.session.user.id}`;
    }),
});
