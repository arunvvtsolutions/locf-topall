import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useLoginMutation } from "@/features/auth/authApi";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const EmailLoginForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const response = await login(values).unwrap();
      console.log("response", response.accessToken);

      if (response.accessToken) {
        console.log("response", response.accessToken);
        
        localStorage.setItem("authToken", response.accessToken);
        toast({
          title: "Login Successful",
          description: `Welcome back Dear`,
        });
        navigate("/dashboard"); // Adjust the redirect path as needed
      }
    } catch (error: any) {
      console.log('error', error);
      
      toast({
        title: "Login Failed",
        description: error?.data?.message || "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-[100px]">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Sign in with your email and password
        </p>
      </div>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isValid }) => (
          <Form className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </Label>
                <Field
                  as={Input}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@example.com"
                  className="h-11 focus-visible:ring-2 focus-visible:ring-primary/50"
                  autoComplete="email"
                />
                <ErrorMessage name="email">
                  {(msg) => <p className="text-sm text-red-500 mt-1">{msg}</p>}
                </ErrorMessage>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </Label>
                <Field
                  as={Input}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="h-11 focus-visible:ring-2 focus-visible:ring-primary/50"
                  autoComplete="current-password"
                />
                <ErrorMessage name="password">
                  {(msg) => <p className="text-sm text-red-500 mt-1">{msg}</p>}
                </ErrorMessage>
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary/90 text-white"
                disabled={isLoading || !isValid}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmailLoginForm;
