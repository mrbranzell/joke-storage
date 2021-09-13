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
    const note = await db.prepare("INSERT INTO note SET title= ?, content= ?");
    const result = await note.run(req.body.title, req.body.content);
    result.finalize();
  } else {
    res.status(400).json({ message: "Only GET requests are allowed" });
    return;
  }
}
