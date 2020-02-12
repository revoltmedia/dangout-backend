import { getRepository } from 'typeorm'
import { User }          from 'entities/user'
import * as argon2 from 'argon2'
import { generateToken } from 'auth/auth'

export const registerUserMutation = {
    async registerUser(_, { email, password, bio, handle }) {

        const repository = getRepository(User)

        const passwordHashed = await argon2.hash(password)

        const newUser = {
            email: email,
            handle: handle,
            password: passwordHashed,
            bio: bio
        }

        try {
          const savedUser = await repository.save(newUser)
        } catch(err) {
            console.log(err)

            return {
              error: err
            }
        }

        const userRecord = await repository.findOne( {
          select: ["id", "handle", "email", "password"],
          where: [
            { email: newUser.email }
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
          email: userRecord.email,
          handle: userRecord.handle,
          bio: userRecord.bio,
          token: generateToken(userRecord),
          error: null,
        }
    }
}
