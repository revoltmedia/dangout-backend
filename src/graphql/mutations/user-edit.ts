import { getRepository } from 'typeorm'
import { User }          from 'entities/user'

export const userEditMutation = {
    async userEdit(_, {
      id,
      saveChanges,
      email,
      bio,
      active,
      admin
    }, context) {

        const currentUser = await context.user
        var error = false

        console.log(currentUser.data.admin)

        if (currentUser.error || !currentUser) {
          error = currentUser.error
          return {
            error
          }
        } else if(!currentUser.data.admin && currentUser.data.id != id && id != 'self') {
          return {
            error: "Current User's admin status is " + currentUser.data.admin + " and they're trying to edit another user."
          }
        } else if(id == 'self') {
          console.log( currentUser )
          return {
            ...currentUser.data
          }
        } else {

          const repository = getRepository(User)
          const userTarget = await repository.findOne({ id })

          if(currentUser.data.saveChanges) {
            try {
              await repository.update(id, {
                email: ( email || userTarget.email ),
                bio: ( bio || userTarget.bio ),
                active: ( active || userTarget.active ),
                admin: ( admin || userTarget.admin ),
              })
            } catch(saveError){
              return {
                error: saveError
              }
            }
          }

          return {
            ...userTarget,
            email,
            bio,
            active,
            admin,
            error
          }
        }
    }
}
