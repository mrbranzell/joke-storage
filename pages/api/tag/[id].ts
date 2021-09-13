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
  if (req.method === "POST") {
    const result = await db.run(
      "INSERT INTO Notetag (noteid, tagid) VALUES (?, ?)",
      [req.body.noteid, req.query.id]
    );
  }
  if (req.method === "DELETE") {
    const result = await db.run(
      "DELETE FROM Notetag WHERE ID = ?",
      req.query.id
    );
    res.status(200).json({ message: `Deleted tag with id ${req.query.id}` });
  } else {
    res.status(400).json({ message: "We don't handle that request" });
  }
}
