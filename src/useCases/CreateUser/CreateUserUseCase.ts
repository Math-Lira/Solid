import { User } from "../../entities/User"
import { IMailProvider } from "../../providers/IMailProvider"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { ICreateUserRequestDTO } from "./CreateUserDTO"

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private mailProviode: IMailProvider,
        ) {}
    
    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

        if (userAlreadyExists) {
            throw new Error('User already exists')
        }

        const user = new User(data)

        await this.usersRepository.save(user)

        await this.mailProviode.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: 'Test Enviando Um Email',
                email: 'test@meuemail.com',
            },
            subject: 'Seja Bem vindo a plataforma!!',
            body: '<p>"Vicê ja pode fazer login na nossa plataforma."<p>',
        })
    }

}