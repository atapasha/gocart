import { inngest } from "./client";
import prisma from "@/lib/prisma";

// Create
export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-create",
    triggers: [{ event: "clerk/user.created" }],
  },
  async ({ event }) => {
    const { data } = event;

    await prisma.user.create({
      data: {
        id: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        image: data.image_url,
      },
    });
  }
);

// Update
export const syncUserUpdation = inngest.createFunction(
  {
    id: "sync-user-update",
    triggers: [{ event: "clerk/user.updated" }],
  },
  async ({ event }) => {
    const { data } = event;

    await prisma.user.update({
      where: { id: data.id },
      data: {
        email: data.email_addresses[0].email_address,
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        image: data.image_url,
      },
    });
  }
);

// // Inngest Function to delete coupon on expiry
// export const deleteCouponOnExpiry = inngest.createFunction(
//     {id: 'delete-coupon-on-expiry'},
//     {event: 'app/coupon.expired'},
//     async ({ event, step }) => {
//         const { data } = event
//         const expiryDate = new Date(data.expiryDate)
        
//         await step.sleepUntil('wait-for-coupon-expiry', expiryDate)

//         await step.run('delete-coupon-from-db', async () => {
//             await prisma.coupon.delete({
//                 where: { code: data.code }
//             })
//         })
//     }
// )
