import { Query }     from 'graphql/types/query'
import { Mutation } from 'graphql/types/mutation'
import { types }     from 'graphql/types'

const schemaDefinition = `
    schema {
        query: Query
        mutation : Mutation
    }
`


export const typeDefs = [
    schemaDefinition,
    Query,
    Mutation,
    ...types,
]
