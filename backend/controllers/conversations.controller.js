import {
  StatusCodes,
} from 'http-status-codes';

import { db } from "../db/index.js";
import { fetchUserConversationsIds, fetchUserDetailById, handleErrors } from "./helpers.js";
import { conversations, participants, users } from '../db/schema.js';
import { v4 as uuidv4 } from 'uuid';
import { and, eq, inArray, ne, not } from 'drizzle-orm';


class ConversationsController {
  static async new(req, res) {
    try {
      const { id } = req.query
      const { user: user_session_data } = req.session

      let conversation_data = {};

      // make sure current user cant create convo with self
      if (id === user_session_data.id) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ success: true, message: "Not allowed" });
      }

      // todo: make sure conversation with same user does not exist
      // check if user has exisiting conversation with current user 
      // chek if in participants
      // check 
      const user_participations = await db.select({
        user_id: users.id,
        username: users.username,
        avatar_url: users.avatar_url,
        conversation_id: participants.conversation_id
      }).from(participants).where(eq(participants.user_id, id)).leftJoin(users, eq(users.id, id))
      const user_participations_conversation_ids = user_participations.map(item => item.conversation_id)

      const current_user_participations = await db.select().from(participants).where(eq(participants.user_id, user_session_data.id))
      const current_user_participations_conversation_ids = current_user_participations.map(item => item.conversation_id)

      const commonItems = current_user_participations_conversation_ids.filter(item => user_participations_conversation_ids.includes(item));

      console.log(commonItems)

      // if (commonItems) {
      //   // console.log(user_participant_data)
      //   conversation_data = {
      //     user_id: user_participant_data.user_id,
      //     username: user_participant_data.username,
      //     avatar_url: user_participant_data.avatar_url,
      //     conversation_id: user_participant_data.conversation_id
      //   }
      //   return res
      //     .status(StatusCodes.OK)
      //     .json({ success: true, data: conversation_data });
      // }

      // create new
      // const [new_conversation] = await db.insert(conversations).values({ id: uuidv4() }).returning();
      // // insert current user into participants
      // await db.insert(participants).values({ conversation_id: new_conversation.id, user_id: user_session_data.id }).returning();
      // // insert user into participants
      // await db.insert(participants).values({ conversation_id: new_conversation.id, user_id: id }).returning();

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
      const user_conversations = await fetchUserConversationsIds(user_session_data.id)
      res
        .status(StatusCodes.OK)
        .json({
          success: true, data: user_conversations
        });

    } catch (error) {
      console.log(error)
      handleErrors(res, error, null)
    }
  }
}

export default ConversationsController