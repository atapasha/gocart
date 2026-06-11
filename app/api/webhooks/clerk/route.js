import { Webhook } from "svix";
import { headers } from "next/headers";
import { inngest } from "@/inngest/client";

export async function POST(req) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error("Missing CLERK_WEBHOOK_SECRET");
  }

  const headerPayload = await headers();

  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", {
      status: 400,
    });
  }

  const payload = await req.text();

  const wh = new Webhook(SIGNING_SECRET);

  let evt;

  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Webhook verification failed", err);

    return new Response("Invalid signature", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    await inngest.send({
      name: "clerk/user.created",
      data: evt.data,
    });
  }

  if (eventType === "user.updated") {
    await inngest.send({
      name: "clerk/user.updated",
      data: evt.data,
    });
  }

  if (eventType === "user.deleted") {
    await inngest.send({
      name: "clerk/user.deleted",
      data: evt.data,
    });
  }

  return Response.json({
    success: true,
  });
}