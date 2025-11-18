'use server'

import { supabase } from '@/lib/db'
import { SignUpSchema, FormState, SignInSchema } from '@/lib/definition'
import z from 'zod'
import  bcrypt  from 'bcryptjs'
import { signIn } from '@/../auth'
import { redirect } from 'next/navigation'

export async function signUpAction(state: FormState, formData: FormData) {
  // validate formdate 
  const validatedData = SignUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  //if not success then return error
  if (!validatedData.success) {
    return {
      errors: z.treeifyError(validatedData.error),
      message: 'Invalid inputs',
    }
  }

  const { name, email, password } = validatedData.data

  const hashedPassword = await bcrypt.hash(password, 10)

  //insert user to db
  const { data, error } = await supabase
    .from('users')
    .insert({
      name: name,
      email: email,
      password: hashedPassword
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      return { message: "Email already exist try another one"}
    }
    return { message: "Sign Up Failed" };
  }

  const id = data.id;

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

  redirect(`/chat/${id}`);

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

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", validatedData.data.email)
    .single();

  if (error) {
    if (error.code ===  "PGRST116") {
      return { message: "No user found with this email. Sign in instead?"}
    }
    return { message: "Sign in failed"}
  }

  const isSignedIn = await signIn("credentials", {
    redirect: false,
    email: validatedData.data.email,
    password: validatedData.data.password
  })

  if (!isSignedIn || isSignedIn.error) {
    return { message: "Wrong password"}
  }
  
  redirect(`/chat/${data.id}`);
} 