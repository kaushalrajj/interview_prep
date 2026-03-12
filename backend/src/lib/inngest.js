import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({
  id: "ivy",
});

const SyncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      await connectDB();

      const { id, email_addresses, first_name, last_name, image_url } =
        event.data;

      console.log("SyncUser triggered");
      console.log("Event data:", event.data);

      const newUser = {
        clerkId: id,
        email: email_addresses?.[0]?.email_address || "",
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        profileImage: image_url,
      };

      // Prevent duplicate users
      await User.findOneAndUpdate(
        { clerkId: newUser.clerkId },
        newUser,
        { upsert: true, new: true }
      );

      await upsertStreamUser({
        id: newUser.clerkId.toString(),
        name: newUser.name,
        image: newUser.profileImage,
      });
    } catch (error) {
      console.error("Error syncing user:", error);
      throw error;
    }
  }
);

const deleteUserFromDb = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try {
      await connectDB();

      const { id } = event.data;

      await User.deleteOne({ clerkId: id });

      await deleteStreamUser(id.toString());
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
);

export const functions = [SyncUser, deleteUserFromDb];