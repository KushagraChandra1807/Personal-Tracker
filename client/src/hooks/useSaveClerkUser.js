import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import axios from "axios";

const useSaveClerkUser = () => {
  const { user } = useUser();
  const hasSyncedRef = useRef(false); // prevents double POST due to Strict Mode

  useEffect(() => {
    const saveUser = async () => {
      if (!user || hasSyncedRef.current) return;

      try {
        hasSyncedRef.current = true; // ✅ mark as synced
        const response = await axios.post("http://localhost:5000/api/users/clerk-user", {
          clerkId: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        });

        console.log("✅ User synced with DB:", response.data?.user || {});
      } catch (err) {
        console.error("❌ Error saving user to DB:", err);
      }
    };

    saveUser();
  }, [user]);
};

export default useSaveClerkUser;
