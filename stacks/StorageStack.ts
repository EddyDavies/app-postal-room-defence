import {
    // Api,
    // ReactStaticSite,
    StackContext,
    Table,
    Bucket,
  } from "@serverless-stack/resources";
  
  export function StorageStack({ stack }: StackContext) {
    // Create the table
    const table = new Table(stack, "Counter", {
      fields: {
        counter: "string",
      },
      primaryIndex: { partitionKey: "counter" },
    });
    const bucket = new Bucket(stack, "Uploads");

    return {
      table,
      bucket
    }
  }