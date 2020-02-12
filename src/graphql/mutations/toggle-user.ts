import { getRepository } from 'typeorm'
import { User }          from 'entities/user'


export const toggleUserMutation = {
    async toggleUser(_, { id }) {
        const repository = getRepository(User)
        const user = await repository.findOne({ id })
        const active = !user.active;
        const result = await repository.update(id, { active })
        return {
            ...user,
            active,
        }
    }
}
