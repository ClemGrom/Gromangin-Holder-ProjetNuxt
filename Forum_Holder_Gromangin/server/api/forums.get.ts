import db from "~/server/sql";
export default defineEventHandler(async (event) => {
  const [rows] = await db.execute("SELECT * FROM forum");
  return {
    forums: rows,
  };
});
