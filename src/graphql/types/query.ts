export const Query = `
    type Query {
        cards: [Card]
        card(
          id: String!
        ): Card
        users: [User]
        user(
          id: String!
        ): User
        loginUser (
          identifier: String!
          password: String!
        ): User
        sendRecoveryToken (
            identifier: String!
        ): User
        checkRecoveryToken (
          recoveryToken: String!
        ): User
    }
`
