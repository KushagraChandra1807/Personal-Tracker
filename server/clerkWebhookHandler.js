import User from './models/User.js';

export const clerkWebhookHandler = async (req, res) => {
  try {
    const eventType = req.body.type;
    const userData = req.body.data;

    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name } = userData;
      const email = email_addresses?.[0]?.email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      let user = await User.findOne({ clerkId: id });
      if (!user) {
        user = await User.create({ clerkId: id, email, name });
        console.log("✅ User created via webhook:", user);
      }
    }

    res.status(200).send("Webhook received");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
