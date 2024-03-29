import db from "~/server/sql";
import url from "url";

export default defineEventHandler(async (event) => {
  const myUrl = url.parse(event.path, true);
  const query = myUrl.query;
  const [fields] = await db.execute("SELECT * from sujet where forum_id=?", [
    query.forum_id,
  ]);
  return {
    sujets: fields,
  };
});
