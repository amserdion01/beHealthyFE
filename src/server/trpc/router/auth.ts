import { prisma } from "./../../db/client";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import axios from "axios";
import { type RecipeType } from "../../../types/recipe";
import { Storage } from "@google-cloud/storage";
const storage = new Storage({
  keyFilename: "/etc/secrets/gcp_keyfile.json",
});
const bucket = storage.bucket("behealthy");
const API_URL = "https://www.be-healthy-uvt.live/v1/recipe";
export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
  getFavoriteRecipes: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        favorites: true,
      },
    });
    return user?.favorites;
  }),
  getSavedRecipes: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        saved: true,
      },
    });
    return user?.saved;
  }),
  deleteRecipe: protectedProcedure
    .input(
      z.object({
        recipeID: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const res = await axios.delete<RecipeType>(
        `${API_URL}/${input.recipeID}`
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
        const { data } = await axios.get<RecipeType>(`${API_URL}/${id}`);

        recipes.push(data);
      }
      console.log(recipes);

      return recipes;
    }),
  isFavOrBookmarked: protectedProcedure
    .input(
      z.object({
        recipeID: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          favorites: true,
          saved: true,
        },
      });
      if (user) {
        const bookmarked = user?.saved.includes(input.recipeID);
        const favorited = user?.favorites.includes(input.recipeID);
        return {
          bookmarked,
          favorited,
        };
      }
      return {
        bookmarked: false,
        favorited: false,
      };
    }),
  getFavorites: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        favorites: true,
      },
    });
    const favorites: RecipeType[] = [];
    if (user) {
      for (const id of user.favorites) {
        console.log(id);
        
        const { data } = await axios.get<RecipeType>(`${API_URL}/${id}`);
        console.log(data)
        favorites.push(data);
      }
    }
    return favorites
    
  }),
  updateFavorite: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        favorite: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          favorites: true,
        },
      });
      if (!user) {
        return { msg: `No user with id: ${ctx.session.user.id} found` };
      }
      if (!input.favorite) {
        const updated = await prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            favorites: {
              push: input.id,
            },
          },
        });
        return updated;
      }

      const filteredFavs = user.favorites.filter((id) => id != input.id);
      const updated = await prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          favorites: filteredFavs,
        },
      });
      return updated;
    }),
  updatBookmarked: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        bookmark: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          saved: true,
        },
      });
      if (!user) {
        return { msg: `No user with id: ${ctx.session.user.id} found` };
      }
      if (!input.bookmark) {
        const updated = await prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            saved: {
              push: input.id,
            },
          },
        });
        return updated;
      }

      const filteredBookmarks = user.saved.filter((id) => id != input.id);
      const updated = await prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          saved: filteredBookmarks,
        },
      });
      return updated;
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
        VideoURL: z.string(),
        Image: z.object({
          blob: z.string(),
          name: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const base64EncodedImage = input.Image.blob.replace(
        /^data:\w+\/\w+;base64,/,
        ""
      );
      
      const imageBuffer = Buffer.from(base64EncodedImage, "base64");
      await bucket
        .file(`${input.CookbookID}_${input.Image.name}`)
        .save(imageBuffer);
      const ImageURL = await bucket
        .file(`${input.CookbookID}_${input.Image.name}`)
        .publicUrl();
      const res = await axios.post<RecipeType>(`${API_URL}`, {
        Author: ctx.session.user.name,
        AuthorID: ctx.session.user.id,
        ImageURL,
        ...input,
      });
      console.log("🚀 ~ file: auth.ts:270 ~ .mutation ~ res", res);

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
