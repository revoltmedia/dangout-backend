import { getRepository } from 'typeorm'
import { User }          from 'entities/user'
import * as argon2 from 'argon2'
import { generateToken } from 'auth/auth'

export const loginUserResolver = {
    async loginUser(_, { identifier, password }) {
        const repository = getRepository(User)

        const userRecord = await repository.findOne( {
          select: ["id", "handle", "email", "password"],
          where: [
            { email: identifier }
          ]
        } )
        if (!userRecord) {
          return {
            token: null,
            error: 'Invalid Email, Handle or Password',
          }
        }

        let correctPassword = null

        correctPassword = await argon2.verify(userRecord.password, password)
        if (!correctPassword) {
          return {
            token: null,
            error: 'Invalid Email, Handle or Password',
          }
        }

        return {
          user: {
            email: userRecord.email,
            handle: userRecord.handle,
          },
          token: generateToken(userRecord),
          error: null,
        }
    }
}
