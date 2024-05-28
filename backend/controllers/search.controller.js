import {
  StatusCodes,
} from 'http-status-codes';

import { handleErrors } from "./helpers.js";
import { db } from '../db/index.js';
import { eq, like } from 'drizzle-orm';
import { users } from '../db/schema.js';

class SearchController {
  static async search(req, res) {
    try {
      const { user: user_session_data } = req.session
      const { q } = req.query

      const data = await db
        .select({
          id: users.id,
          username: users.username
        })
        .from(users)
        .where(like(users.username, `%${q}%`))

      res
        .status(StatusCodes.OK)
        .json({
          success: true, data
        });

    } catch (error) {
      console.log(error)
      handleErrors(res, error, null)
    }
  }
}

export default SearchController