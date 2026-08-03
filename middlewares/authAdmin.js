import { clerkClient } from "@clerk/nextjs/server";

const authAdmin = async (userId) => {
  try {
    console.log("userId:", userId);

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    console.log(client);
    console.log("user email:", user.emailAddresses[0].emailAddress);
    console.log("admin env:", process.env.ADMIN_EMAIL);

    return process.env.ADMIN_EMAIL.split(",").includes(
      user.emailAddresses[0].emailAddress,
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default authAdmin;
