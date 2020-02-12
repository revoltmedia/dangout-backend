import { getRepository } from 'typeorm'
import { User }          from 'entities/user'
import { generateToken } from 'auth/auth'
import mailconfig from 'mailconfig'

export const sendRecoveryTokenResolver = {
    async sendRecoveryToken(_, { identifier }) {
        const repository = getRepository(User)

        const userRecord = await repository.findOne( {
          select: ["id", "handle", "email"],
          where: [
            { email: identifier }
          ]
        } )
        if (userRecord) {
          const token = await generateToken(userRecord, '10m', 'recovery')

          var mailOptions = {
            from: '"Dangout" <forgotpassword@dangout.com>',
            to: userRecord.email,
            subject: 'Dangout Password Recovery',
            text: 'Someone has requested password recovery for your account on Dangout. \n\
If this wasn\'t you, we suggest changing both your email password and Dangout password right away.\n\
\n\
Use this link to change your password now. It expires 10 minutes from when you requested it. \n\
http://localhost:8000/recover/' + token
            // html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer'
          };

          mailconfig.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }

            console.log('Message sent: %s', info.messageId);

            return {
              success: "If that email exists in our system, we've sent a password recovery link which expires in 10 minutes.",
            }
          })
        }

        console.log('No userRecord');

        return {
          success: "If that email exists in our system, we've sent a password recovery link which expires in 10 minutes.",
        }
    }
}
