import { currentUser } from 'auth/auth'

export const checkRecoveryTokenResolver = {
  async checkRecoveryToken(_, { recoveryToken }) {

    const tokenData = await currentUser(recoveryToken)

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
      return {
        success: "Token is valid for recovery purposes.",
        error: false,
      }
    } else {
      return {
        error: "There's a problem with this recovery token, it may be expired, please try requesting another.",
      }
    }
  }
}
