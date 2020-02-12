import { getRepository } from 'typeorm'
import { Card }          from 'entities/card'

export const toggleCardMutation = {
    async toggleCard(_, { id }, context) {

        const user = await context.user
        var error = false

        if (user.error || !user) {
          error = user.error
          return {
            error
          }
        } else {

          const repository = getRepository(Card)
          const card = await repository.findOne({ id })
          const done = !card.done

          const result = await repository.update(id, { done })

          return {
            ...card,
            done,
            error
          }
        }
    }
}
