'use server'

import { pool } from '@/lib/db'
import { SignUpSchema, FormState } from '@/lib/definition'
import z from 'zod'
import  bcrypt  from 'bcryptjs'
import { signIn } from '@/../auth'

export async function signUp(state: FormState, formData: FormData) {
  const validatedData = SignUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedData.success) {
    return {
      errors: z.treeifyError(validatedData.error),
      message: 'Invalid inputs',
    }
  }

  const { name, email, password } = validatedData.data

  const hashedPassword = await bcrypt.hash(password, 10)

  try{
    await pool.query(
      'INSERT INTO users(name, email, password) values($1, $2, $3)',
      [name, email, hashedPassword]
    )

    const id = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    )

    await signIn('credentials', {
      redirect: true,
      email,
      password,
      callbackUrl: `/chat/${id.rows[0].id}`,
    })

    return {
      message: 'User created successfully',
    }    

  } catch (error: any) {
    console.error('Error inserting user:', error)
    if (error.code === '23505') {
      return {
        message: 'Email already in use. Sign in instead?',
      }
    }
    return {
      message: 'Failed to create user',
    }
  }
}