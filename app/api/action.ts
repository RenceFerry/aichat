import { pool } from '@/lib/db'
import { SignUpSchema, FormState } from '@/lib/definition'
import z from 'zod'
import  bcrypt  from 'bcryptjs'

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
  } catch (error) {
    console.error('Error inserting user:', error)
    return {
      message: 'Failed to create user',
    }
  }

}