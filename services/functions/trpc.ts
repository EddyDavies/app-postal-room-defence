import { z } from 'zod';
import { initTRPC } from '@trpc/server';


import { inferAsyncReturnType } from '@trpc/server';
import { CreateAWSLambdaContextOptions,
         awsLambdaRequestHandler, } from '@trpc/server/adapters/aws-lambda';
import { APIGatewayProxyEventV2 } from 'aws-lambda';


// created for each request
const createContext = ({event, context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({}) // no context
type Context = inferAsyncReturnType<typeof createContext>;


// export const t = initTRPC.context<Context>().create();
export const t = initTRPC.create();

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;


const appRouter = router({
    hello: publicProcedure
        .query(() => {
            return {
                greeting: 'hello world',
            };
        }),    
    getUser: publicProcedure
        .input(z.string()
        .optional())
        .query(({ input }) => {
            return { 
                id: input, name: 'Bilbo' 
            };
        }),
    sayHello: publicProcedure
        .input(z.object({
            text: z.string()})
        .optional())
        .query(({ input }) => {
            return {
                message: `You said ${input?.text ?? 'nothing'}`,
            };
        })
  });
  
  // export type definition of API
  export type AppRouter = typeof appRouter;



export const handler = awsLambdaRequestHandler({
router: appRouter,
createContext: createContext,
});
