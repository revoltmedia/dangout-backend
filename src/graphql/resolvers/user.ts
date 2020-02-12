import { getRepository } from 'typeorm'
import { User }          from 'entities/user'


export const userResolver = {
    async user(obj, { id }, context, info) {
        const repository = getRepository(User)
        return await repository.findOne({ id })
    }
}
