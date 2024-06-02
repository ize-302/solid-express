import {
  StatusCodes,
} from 'http-status-codes';

import { fetchUserDetailById, handleErrors } from "./helpers.js";
import { conversations, messages, participants } from '../db/schema.js';
import { db } from '../db/index.js';
import { and, eq, ne, not } from 'drizzle-orm';

class MessagesController {
  static async saveMessage(req, res) {
    try {
      const { user: user_session_data } = req.session
      const { conversation_id, content } = req.body
      await db.insert(messages).values({ conversation_id, sender_id: user_session_data.id, content }).returning();

      res
        .status(StatusCodes.CREATED)
        .json({
          success: true
        });

    } catch (error) {
      handleErrors(res, error, null)
    }
  }

  static async getMessages(req, res) {
    try {
      const { user: user_session_data } = req.session
      const { conversation_id } = req.params
      const chats = await db.select().from(messages).where(eq(messages.conversation_id, conversation_id))
      const [other_participant] = await db.select().from(participants).where(and(eq(participants.conversation_id, conversation_id), ne(participants.user_id, user_session_data.id)))
      const user_detail = await fetchUserDetailById(other_participant.user_id)
      res
        .status(StatusCodes.OK)
        .json({
          success: true,
          data: { chats, participant: user_detail }
        });

    } catch (error) {
      handleErrors(res, error, null)
    }
  }
}

export default MessagesController