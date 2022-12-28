import { z } from "zod";
import { Session } from "next-auth";
import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure.input(z.instanceof(Session)).query(({ input }) => {
    return {
      greeting: `Hello ${input?.text ?? "world"}. {{}}`,
    };
  }),
});
