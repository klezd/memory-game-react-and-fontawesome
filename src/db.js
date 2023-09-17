import Dexie from "dexie";

export const db = new Dexie("memory-game-ranking");

db.version(1).stores({
  result: "id, level, date, result", // Primary key and indexed props
});

db.open()
  .then(function (db) {
    // Database opened successfully
    console.log("DB is created and opened successful");
    console.log(db);
  })
  .catch(function (err) {
    // Error occurred
    console.error(err);
  });
