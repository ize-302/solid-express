import {
  StatusCodes,
} from 'http-status-codes';

import { db } from "../db/index.js";
import { handleErrors } from "./helpers.js";
import { conversations, participants, users } from '../db/schema.js';
import { v4 as uuidv4 } from 'uuid';
import { and, eq, inArray, ne, not } from 'drizzle-orm';


class ConversationsController {
  static async request(req, res) {
    try {
      const { id } = req.query
      const { user: user_session_data } = req.session

      // make sure current user cant create convo with self
      if (id === user_session_data.id) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ success: true, message: "Not allowed" });
      }

      // todo: make sure conversation with same user does not exist 

      // create new
      const [new_conversation] = await db.insert(conversations).values({ id: uuidv4() }).returning();
      // insert current user into participants
      await db.insert(participants).values({ conversation_id: new_conversation.id, user_id: user_session_data.id }).returning();
      // insert user into participants
      await db.insert(participants).values({ conversation_id: new_conversation.id, user_id: id }).returning();

      res
        .status(StatusCodes.CREATED)
        .json({ success: true, message: "Conversation and participants created" });
    } catch (error) {
      handleErrors(res, error, null)
    }
  }

  static async all(req, res) {
    try {
      const { user: user_session_data } = req.session

      const current_user_participations = await db.select({ id: participants.conversation_id }).from(participants).where(eq(participants.user_id, user_session_data.id))
      const current_user_participations_ids = current_user_participations.map(item => item.id)
      const user_conversations = await db.select({
        user_id: users.id,
        username: users.username,
        conversation_id: participants.conversation_id
      }).from(participants).where(inArray(participants.conversation_id, current_user_participations_ids)).leftJoin(users, eq(users.id, participants.user_id))

      const filtered = user_conversations.filter(item => item.user_id !== user_session_data.id)

      res
        .status(StatusCodes.OK)
        .json({
          success: true, data: filtered
        });

    } catch (error) {
      console.log(error)
      handleErrors(res, error, null)
    }
  }
}

export default ConversationsController