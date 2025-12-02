import { getDb } from "./db.js";

const main = () => {
  const db = getDb();

  // Set up real-time listener on notifications collection
  const unsubscribe = db.collection("notifications").onSnapshot(
    (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New notification:", change.doc.id, change.doc.data());
        } else if (change.type === "modified") {
          console.log(
            "Modified notification:",
            change.doc.id,
            change.doc.data()
          );
        } else if (change.type === "removed") {
          console.log("Removed notification:", change.doc.id);
        }
      });
    },
    (error) => {
      console.error("Error listening to notifications:", error);
    }
  );

  // Keep the process running
  process.on("SIGINT", () => {
    unsubscribe();
    process.exit(0);
  });
};

main();
