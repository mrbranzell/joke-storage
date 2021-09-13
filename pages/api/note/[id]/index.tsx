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
    const notes = await db.all("SELECT * FROM note where id = ?", [
      req.query.id,
    ]);

    res.json(notes);
  }
  if (req.method === "PUT") {
    const note = await db.prepare(
      "UPDATE note SET title= ?, content= ? where id = ?"
    );
    const result = await note.run(
      req.body.title,
      req.body.content,
      req.query.id
    );
    res.status(200).json({ message: "Note changed" });
  }
  if (req.method === "DELETE") {
    const result = await db.run("DELETE FROM note WHERE ID = ?", req.query.id);
    res.status(200).json({ message: `Deleted tag with id ${req.query.id}` });
  } else {
    res.status(400).json({ message: "We don't handle that request" });
  }
}
