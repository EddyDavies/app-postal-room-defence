import { initTRPC } from '@trpc/server';
import { z } from 'zod';

export const t = initTRPC.create();

const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query((req) => {
    req.input; // string
    return { id: req.input, name: 'Bilbo' };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { 
    CreateAWSLambdaContextOptions, awsLambdaRequestHandler 
} from '@trpc/server/adapters/aws-lambda';

export const handler = awsLambdaRequestHandler({
    router: appRouter
})


// // created for each request
// const createContext = ({
//     event,
//     context,
//   }: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({}) // no context
//   type Context =   .inferAsyncReturnType<typeof createContext>;
  
//   export const handler = awsLambdaRequestHandler({
//     router: appRouter,
//     createContext,
//   });
  