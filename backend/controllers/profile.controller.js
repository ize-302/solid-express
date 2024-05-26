import {
  StatusCodes,
} from 'http-status-codes';

import { fetchUserDetailByUsername, handleErrors } from "./helpers.js";

class ProfileController {
  static async get(req, res) {
    try {
      const { user: user_session_data } = req.session
      const user = await fetchUserDetailByUsername(req, res, user_session_data.username)
      res
        .status(StatusCodes.OK)
        .json({
          success: true, data: user
        });

    } catch (error) {
      handleErrors(res, error, null)
    }
  }
}

export default ProfileController