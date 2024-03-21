import { httpRouter } from "convex/server";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();
http.route({
  path: "/clerk",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const payloadString = await request.text();
    const headerPayload = request.headers;

    try {
      const result = await ctx.runAction(internal.clerk.fulfill, {
        payload: payloadString,
        headers: {
          "svix-id": headerPayload.get("svix-id")!,
          "svix-timestamp": headerPayload.get("svix-timestamp")!,
          "svix-signature": headerPayload.get("svix-signature")!,
        },
      });

      console.log("Webhook Result:", result);

      // Ensure result exists and has necessary data
      if (result && result.data) {
        console.log("Result type:", result.type);
        console.log("Result data:", result.data);

        switch (result.type) {
          case "user.created":
            await ctx.runMutation(internal.users.createUser, {
              tokenIdentifier: `https://loving-bullfrog-56.clerk.accounts.dev|${result.data.id}`,
              name: `${result.data.first_name ?? ""} ${
                result.data.last_name ?? ""
              }`,
              image: result.data.image_url,
            });
            break;
          case "user.updated":
            await ctx.runMutation(internal.users.updateUser, {
              tokenIdentifier: `https://loving-bullfrog-56.clerk.accounts.dev|${result.data.id}`,
              name: `${result.data.first_name ?? ""} ${
                result.data.last_name ?? ""
              }`,
              image: result.data.image_url,
            });
            break;
          case "organizationMembership.created":
            await ctx.runMutation(internal.users.addOrgIdToUser, {
              tokenIdentifier: `https://loving-bullfrog-56.clerk.accounts.dev|${result.data.public_user_data.user_id}`,
              orgId: result.data.organization.id,
              role: result.data.role === "org:admin" ? "admin" : "member",
            });
            break;
          case "organizationMembership.updated":
            console.log(result.data.role);
            await ctx.runMutation(internal.users.updateRoleInOrgForUser, {
              tokenIdentifier: `https://loving-bullfrog-56.clerk.accounts.dev|${result.data.public_user_data.user_id}`,
              orgId: result.data.organization.id,
              role: result.data.role === "org:admin" ? "admin" : "member",
            });
            break;
        }
      } else {
        console.log("Invalid result:", result);
      }

      return new Response(null, {
        status: 200,
      });
    } catch (err) {
      console.error("Webhook Error:", err);
      return new Response("Webhook Error", {
        status: 400,
      });
    }
  }),
});

export default http;
