import type { NextApiRequest, NextApiResponse } from "next";
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
// type Data = {
//   note?: string;
//   method?: string;
//   message?: string;
// };

export default async function getAllTags(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open({
    filename: process.env.DB_PATH,
    driver: sqlite3.Database,
  });

  if (req.method === "POST") {
    const result = await db.run(
      "INSERT INTO tag (title) VALUES (?)",
      req.body.title
    );
  }

  if (req.method === "DELETE") {
    const result = await db.run("DELETE FROM tag WHERE ID = ?", req.body.title);
  }
  const tags = await db.all("SELECT * FROM tag");
  res.json(tags);
}
