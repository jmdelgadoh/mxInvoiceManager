import {object, string, TypeOf} from 'zod';

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required'
        }),
        password: string({
            required_error: 'Password is required'
        }).min(6, 'Requires at least 6 characters'),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required'
        }),
        email: string({
            required_error: 'Email is required'
        }).email('A Valid Email is required')
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path:['passwordConfirmation']
    })
})

export type CreateUserInput = TypeOf<typeof createUserSchema>