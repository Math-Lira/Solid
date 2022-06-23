import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProider";
import { PostgressUsersREpository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserUseController";

const mailtrapMailProvider = new MailtrapMailProvider()
const postgresUsersRepository = new PostgressUsersREpository()

const createUserUseCase = new CreateUserUseCase(
    postgresUsersRepository,
    mailtrapMailProvider
)

const createUserController = new CreateUserController(
    createUserUseCase
)

export {createUserUseCase, createUserController}