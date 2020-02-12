import { getRepository } from 'typeorm'
import { User }          from 'entities/user'
import { currentUser } from 'auth/auth'
import * as argon2 from 'argon2'

export const recoveryChangePasswordMutation = {
  async recoveryChangePassword(_, { recoveryToken, password }) {

    const tokenData = await currentUser(recoveryToken)
    const passwordHashed = await argon2.hash(password)

    if(tokenData){
      if(tokenData.error == false && tokenData.data.use != 'recovery') {
        return {
          error: "This is the wrong type of token."
        }
      } else if(tokenData.error) {
        return {
          error: tokenData.error
        }
      }
      const repository = getRepository(User)

      const userRecord = await repository.findOne( {
        select: ["id", "handle", "email", "password"],
        where: [
          { id: tokenData.data.id }
        ]
      } )
      if (!userRecord) {
        return {
          error: 'There\'s a problem with this recovery token, please contact support.',
        }
      }

      try {
        await repository.update(tokenData.data.id, {
          password: ( passwordHashed ),
        })
      } catch(saveError){
        return {
          error: saveError
        }
      }

      return {
        success: 'Your password was changed successfully. You can now login with your new password.',
      }
    } else {
      return {
        error: 'There\'s a problem with this recovery token, it may be expired, please try requesting another.',
      }
    }
  }
}
