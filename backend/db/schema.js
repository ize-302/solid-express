import {
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { createId } from '@paralleldrive/cuid2';

//  tables
export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    username: text("username"),
    password: text("password"),
  },
  (users) => ({
    usernameIndex: uniqueIndex("usernameIndex").on(users.username),
  })
);

export const profiles = sqliteTable(
  "profiles",
  {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    userid: text('userid'),
  },
  (profiles) => ({
    userIdIndex: uniqueIndex("userIdIndex").on(profiles.userid),
  })
);

export const chatrooms = sqliteTable(
  "chatrooms",
  {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    name: text("name"),
  },
  (chatrooms) => ({
    nameIndex: uniqueIndex("nameIndex").on(chatrooms.name),
  })
);