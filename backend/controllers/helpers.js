import { eq } from "drizzle-orm"
import { users } from "../db/schema.js"
import { db } from "../db/index.js"
import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes';
import bcrypt from "bcrypt";

/**
 * Find user by username
 *
 * @async
 * @param {string} username
 * @returns user object if user found or send a 404 status code
 */
export const fetchUserDetailByUsername = async (req, res, username) => {
  const { user: user_session_data } = req.session
  const [userDetail] = await db.select({
    id: users.id,
    username: users.username,
  }).from(users).where(eq(users.username, username))

  if (userDetail !== undefined) {
    return {
      ...userDetail,
    }
  } else {
    return null
  }
}

export const fetchUserDetailById = async (user_id) => {
  const [result] = await db.select({
    id: users.id,
    username: users.username,
  }).from(users).where(eq(users.id, user_id))
  if (result !== undefined) {
    return { ...result }
  } else {
    return undefined
  }
}

export const fetchUsersById = async (users_ids) => {
  try {
    const res = await Promise.all(
      users_ids.map(user_id => fetchUserDetailById(user_id))
    );
    return res
  } catch (error) {
    throw Error("Promise failed");
  }
}

/**
 * DB query to return user details if user exists, it acepts username as argument
 *
 * @async
 * @param {string} username
 * @returns {unknown}
 */
export const isUserExists = async (username) => {
  const [user] = await db.select({ id: users.id, username: users.username, password: users.password }).from(users).where(eq(users.username, username));
  return user
}


/**
 * Self explanatory I suppose
 *
 * @async
 * @param {string} password
 * @returns {unknown}
 */
export const handlePasswordHash = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const passwordHash = await bcrypt.hashSync(password, salt);
  return { passwordHash, salt }
}


/**
 * General error handler
 *
 * @async
 * @param {*} res
 * @param {*} error
 * @param {string} customErrorMessage
 * @returns {unknown}
 */
export const handleErrors = async (res, error, customErrorMessage) => {
  if (error.errors) {
    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.errors[0] ?? customErrorMessage });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}