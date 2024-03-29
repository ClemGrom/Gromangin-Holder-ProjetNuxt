import db from "~/server/sql";
import url from "url";

export default defineEventHandler(async (event) => {
  const myUrl = url.parse(event.path, true);
  const query = myUrl.query;
  const [fields] = await db.execute(
    "SELECT * from message where sujet_id=?",
    [query.sujet_id]
  );
  return {
    messages: fields,
  };
});
