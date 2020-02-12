import * as Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import { typeDefs } from 'graphql/schema'
import { resolvers } from 'graphql/resolvers'
import { currentUser } from 'auth/auth'

import { databaseInitializer } from 'initializers/database'

const bootstrap = async () => {
    await databaseInitializer()
    const app = new Koa()
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ ctx }) => {
        const token = ctx.headers.authorization || ''

        const user = currentUser( token )

        return { user }
      },
    })

    server.applyMiddleware({ app })

    app.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
      }
    )
}

bootstrap()
