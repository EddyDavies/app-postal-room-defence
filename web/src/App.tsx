import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from './utils/trpc';


function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '${import.meta.env.VITE_API_URL}',
        }),
      ],
    }),
  );
    
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
          
          <p> Test </p>
          <Sample />

      </QueryClientProvider>
    </trpc.Provider>
  );
}
  
function Sample() {
  const hello = trpc.hello.useQuery()
  // const fred = trpc.sayHello.useQuery({"text": "Fred"})
  // const user = trpc.getUser.useQuery("Test")
  // if (!hello.data) return <div>Loading...</div>;
  return (
    <div>
    {hello.isLoading ? "...Loading" : hello.data?.greeting} Why
  </div>
  );
}

export default App