import { getRepository } from 'typeorm'
import { User }          from 'entities/user'

export const toggleUserAdminMutation = {
    async toggleUserAdmin(_, { id }, context) {

        const currentUser = await context.user
        var error = false

        if (currentUser.error || !currentUser) {
          error = currentUser.error
          return {
            error
          }
        } else if(!currentUser.data.admin) {
          return {
            error: "Current User's admin status is " + currentUser.data.admin
          }
        } else {

          const repository = getRepository(User)
          const userTarget = await repository.findOne({ id })
          const admin = !userTarget.admin

          const result = await repository.update(id, { admin })

          return {
            ...userTarget,
            admin,
            error
          }
        }
    }
}
