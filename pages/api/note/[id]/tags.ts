import type { NextApiRequest, NextApiResponse } from "next";
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

export default async function getAllNotes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open({
    filename: process.env.DB_PATH,
    driver: sqlite3.Database,
  });
  if (req.method === "GET") {
    const notes = await db.all("SELECT * FROM Notetag where noteid = ?", [
      req.query.id,
    ]);

    res.json(notes);
  } else {
    res.status(400).json({ message: "We don't handle that request" });
  }
}
