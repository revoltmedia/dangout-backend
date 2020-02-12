import { getRepository } from 'typeorm'
import { User } from 'entities/user'
import * as jwt from 'jsonwebtoken'

const tokenSecret = process.env.TOKEN_SECRET;

export async function currentUser(token) {
  var tokenError = false
  var tokenId = ''
  var tokenUse = ''

  if (token != '') {
    const tokenData = this.decodeToken(token)
    if (tokenData.error) {
      return {
        error: tokenData.error
      }
    } else {
      tokenId = tokenData.tokenData.data.id
      tokenUse = tokenData.tokenData.data.use
    }
  } else {
    return {
      error: "No token provided, user not logged in."
    }
  }

  if (tokenError) {
    return {
      error: tokenError
    }
  }

  if (tokenId != '') {
    const repository = getRepository(User)

    const userRecord = await repository.findOne(
      {
        id: tokenId,
        active: true
      }
    )

    if (!userRecord) {
      return {
        error: "User not found."
      }
    } else {
      return {
        data: {
          id: userRecord.id,
          handle: userRecord.handle,
          email: userRecord.email,
          bio: userRecord.bio,
          admin: userRecord.admin,
          use: tokenUse,
        },
        error: false
      }
    }
  } else {
    return {
      error: "Token had no user ID, user not logged in."
    }
  }
}

export function decodeToken(token) {
  try {
    var decoded = jwt.verify(
      token,
      tokenSecret
    )
  } catch (error) {
    return {
      error: error.message
    }
  }
  var error = false
  return {
    tokenData: decoded,
    error
  }
}

export async function generateToken(user, expiration = '6h', use = 'login') {
  const data = {
    id: user.id,
    name: user.name,
    email: user.email,
    use: use
  };

  return jwt.sign({ data, }, tokenSecret, { expiresIn: expiration })
}
