import {
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { createId } from '@paralleldrive/cuid2';
import { sql } from "drizzle-orm";

//  tables
export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    username: text("username"),
    password: text("password"),
    avatar_url: text('avatar_url')
  },
  (users) => ({
    usernameIndex: uniqueIndex("usernameIndex").on(users.username),
  })
);

export const conversations = sqliteTable(
  "conversations",
  {
    id: text("id").primaryKey().$defaultFn(() => createId()),
  }
);

export const participants = sqliteTable(
  "participants",
  {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    conversation_id: text('conversation_id').references(() => conversations.id, { onDelete: 'cascade' }).notNull(),
    user_id: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  }
);

export const messages = sqliteTable(
  "messages",
  {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    conversation_id: text('conversation_id').references(() => conversations.id, { onDelete: 'cascade' }).notNull(),
    sender_id: text('sender_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    content: text('content').notNull(),
    datetime: text('datetime')
      .notNull()
      .default(sql`(current_timestamp)`),
  }
);
