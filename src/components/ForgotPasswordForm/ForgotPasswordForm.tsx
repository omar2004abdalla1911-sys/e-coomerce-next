"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
})

type FormData = z.infer<typeof formSchema>

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: FormData) {
    try {
      setIsLoading(true)

      // 🔥 اربط هنا بالـ API بتاعك
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSuccess(true)
      toast.success("Reset link sent to your email")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-extrabold">
          Forgot Password
        </CardTitle>
        <CardDescription className="text-center">
          Enter your email and we’ll send you a reset link.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isSuccess ? (
          <div className="text-center space-y-4">
            <p className="text-green-600 font-medium">
              Reset link has been sent successfully ✅
            </p>
            <Link
              href="/login"
              className="text-blue-500 hover:underline text-sm"
            >
              Back to login
            </Link>
          </div>
        ) : (
          <form id="forgot-password-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="forgot-email">
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      id="forgot-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="example@gmail.com"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        )}
      </CardContent>

      {!isSuccess && (
        <CardFooter className="mt-5">
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
              form="forgot-password-form"
            >
              {isLoading && <Loader2 className="animate-spin" />}
              Send Reset Link
            </Button>
          </Field>
        </CardFooter>
      )}

      {!isSuccess && (
        <p className="text-sm text-gray-500 text-center mt-5">
          Remember your password?{" "}
          <Link
            href="/login"
            className="text-blue-500 hover:underline"
          >
            Login
          </Link>
        </p>
      )}
    </Card>
  )
}
