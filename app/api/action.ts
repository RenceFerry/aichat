'use server'

import { sql } from '@/lib/db'
import { SignUpSchema, FormState, SignInSchema } from '@/lib/definition'
import z from 'zod'
import  bcrypt  from 'bcryptjs'
import { signIn } from '@/../auth'
import { redirect } from 'next/navigation'

export async function signUpAction(state: FormState, formData: FormData) {
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

  let id;

  try {
    await sql`
      INSERT INTO users(name, email, password) values(${name}, ${email}, ${hashedPassword})
    `

    id = await sql`
      SELECT id FROM users WHERE email = ${email}
    `
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

  const isSignedIn = await signIn('credentials', {
    redirect: false,
    email: email,
    password: password,
  })

  if (!isSignedIn || isSignedIn.error) {
    return {
      message: 'Invalid email or password',
    }
  }

  redirect(`/chat/${id[0].id}`);

}

export async function signInAction(state: FormState, formData: FormData) {
  const validatedData = SignInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  })

  if (!validatedData.success) {
    return {
      errors: z.treeifyError(validatedData.error),
      message: 'Invalid inputs'
    }
  }

  let user;

  try {
    user = await sql`
      SELECT * FROM users WHERE email = ${validatedData.data.email}
    `

    if (user.length === 0) {
      return {
        message: 'No user found with this email. Sign up instead?',
      }
    }

    console.log('Signing in user:', user[0]);

    const isSignedIn = await signIn('credentials', {
      redirect: false,
      email: validatedData.data.email,
      password: validatedData.data.password,
    })

    if (!isSignedIn || isSignedIn.error) {
      return {
        message: 'Invalid email or password',
      }
    }

    
  } catch (error) {
    console.error('Error signing in:', error)
    return {
      message: 'Failed to sign in',
    }
  }
  redirect(`/chat/${user[0].id}`);
} 