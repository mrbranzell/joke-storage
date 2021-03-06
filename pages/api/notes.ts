import type { NextApiRequest, NextApiResponse } from "next";
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
// type Data = {
//   note?: string;
//   method?: string;
//   message?: string;
// };

export default async function getAllNotes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open({
    filename: process.env.DB_PATH,
    driver: sqlite3.Database,
  });
  if (req.method === "GET") {
    const notes = await db.all("SELECT * FROM note");
    res.json(notes);
  }
  if (req.method === "POST") {
    const result = await db.run(
      "INSERT INTO note (title, content) VALUES (?, ?)",
      [req.body.title, req.body.content]
    );
    res.status(200).json(result);
  } else {
    res.status(400).json({ message: "Only GET requests are allowed" });
    return;
  }
}
