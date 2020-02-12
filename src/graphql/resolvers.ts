import { cardResolver }  from 'graphql/resolvers/card'
import { cardsResolver } from 'graphql/resolvers/cards'
import { toggleCardMutation } from 'graphql/mutations/toggle-card'

import { userResolver }  from 'graphql/resolvers/user'
import { usersResolver } from 'graphql/resolvers/users'
import { loginUserResolver } from 'graphql/resolvers/login-user'
import { sendRecoveryTokenResolver } from 'graphql/resolvers/send-recovery-token'
import { checkRecoveryTokenResolver } from 'graphql/resolvers/check-recovery-token'


import { toggleUserMutation } from 'graphql/mutations/toggle-user'
import { registerUserMutation } from 'graphql/mutations/register-user'
import { toggleUserAdminMutation } from 'graphql/mutations/toggle-user-admin'
import { userEditMutation } from 'graphql/mutations/user-edit'
import { recoveryChangePasswordMutation } from 'graphql/mutations/recovery-change-password'

export const resolvers = {
    Query: {
        ...cardsResolver,
        ...cardResolver,
        ...usersResolver,
        ...userResolver,
        ...loginUserResolver,
        ...sendRecoveryTokenResolver,
        ...checkRecoveryTokenResolver,

    },
    Mutation: {
        ...toggleCardMutation,
        ...toggleUserMutation,
        ...registerUserMutation,
        ...toggleUserAdminMutation,
        ...userEditMutation,
        ...recoveryChangePasswordMutation,
    },
}
