import { StackContext, StaticSite, use } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";
import { StorageStack } from "./StorageStack";

export function WebStack({ stack, app }: StackContext) {
    const { bucket } = use(StorageStack);
    const { api } = use(ApiStack);

    const site = new StaticSite(stack, "react", {

        path: "./web",
        buildOutput: "dist",
        buildCommand: "yarn build",
        environment: {
        // Pass in the API endpoint to our app
        VITE_API_URL: api.url,
        // VITE_APP_API_URL: api.customDomainUrl || api.url,
        VITE_APP_REGION: app.region,
        VITE_APP_BUCKET: bucket.bucketName,
        // VITE_APP_USER_POOL_ID: auth.userPoolId,
        // VITE_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId,
        // VITE_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
        }, 
    });
    
    // Show the url in the output
    stack.addOutputs({
        SiteUrl: site.url,
    });

    return {site}
}