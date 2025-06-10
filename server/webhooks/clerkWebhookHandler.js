const User = require('../models/User');

const clerkWebhookHandler = async (req, res) => {
  const eventType = req.body.type;
  const data = req.body.data;

  console.log("✅ Clerk webhook received:", eventType);

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = data;

    const email = email_addresses[0]?.email_address || '';
    const name = `${first_name || ''} ${last_name || ''}`.trim();

    try {
      const existing = await User.findOne({ clerkId: id });
      if (!existing) {
        await User.create({ clerkId: id, email, name });
        console.log("✅ User saved to MongoDB.");
      } else {
        console.log("ℹ️ User already exists.");
      }
    } catch (err) {
      console.error("❌ Error saving user:", err);
    }
  }

  res.status(200).json({ success: true });
};

module.exports = { clerkWebhookHandler };
