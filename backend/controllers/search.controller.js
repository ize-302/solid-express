import {
  StatusCodes,
} from 'http-status-codes';

import { fetchUserDetailById, fetchUserConversationsIds, handleErrors } from "./helpers.js";
import { db } from '../db/index.js';
import { eq, like, and, ne } from 'drizzle-orm';
import { participants, users } from '../db/schema.js';

class SearchController {
  static async search(req, res) {
    try {
      const { user: user_session_data } = req.session
      const { q } = req.query

      const user_conversations = await fetchUserConversationsIds(user_session_data.id)

      const data = await db
        .select({
          id: users.id,
          username: users.username,
          avatar_url: users.avatar_url,
        })
        .from(users)
        .where(and(like(users.username, `%${q}%`)))

      let results_data = []

      data.map(result_item =>
        user_conversations.some(conversation => {

          if (result_item.id !== conversation.user_id && result_item.id !== user_session_data.id) {
            results_data.push({ ...result_item, conversation_id: null, is_own_account: false })
          }
        })
      );

      res
        .status(StatusCodes.OK)
        .json({
          success: true, data: results_data
        });

    } catch (error) {
      console.log(error)
      handleErrors(res, error, null)
    }
  }
}

export default SearchController