import db from "~/server/sql";
import url from "url";

export default defineEventHandler(async (event) => {
    const myUrl = url.parse(event.path, true);
    const query = myUrl.query;
  
    const [fields] = await db.execute(
      "SELECT user.*, message.* FROM user JOIN message ON user.id = message.author_id WHERE message.sujet_id = ? ORDER BY message.id",
      [query.sujet_id]
    );
  
    return {
      messages: fields,
    };
  });
