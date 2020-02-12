export const Mutation = `
    type Mutation {
        toggleCard (
            id: String!
        ): Card
        toggleUserAdmin (
            id: String!
        ): User
        toggleUser (
            id: String!
        ): User
        recoveryChangePassword (
            recoveryToken: String!
            password: String!
        ): User
        registerUser (
            email: String!
            handle: String!
            password: String!
            bio: String
        ): User
        userEdit (
            id: String!
            email: String
            handle: String
            password: String
            bio: String
            active: Boolean
            admin: Boolean
        ): User
    }
`
