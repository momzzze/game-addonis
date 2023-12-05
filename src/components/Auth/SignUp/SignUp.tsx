import { Button } from "@/components/ui/button";
import {Link,useNavigate} from "react-router-dom";
import {z,ZodType} from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/services/auth.service";
import { createUser } from "@/services/user.service";
import { useToast } from "@/components/ui/use-toast";


type FormData={
    email: string;
    password: string;
    confirmPassword: string;
}

export type UserData={
    email: string|null;
    uid: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    phone: string;    
}


function SignUp() {
    const navigate = useNavigate();
    const {toast}=useToast();
    const schema: ZodType<FormData> = z.object({
        email: z.string().email(),
        password: z.string().min(6,'Password should be with at least with 6 symbols.').max(100),
        confirmPassword: z.string().min(6).max(100),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema)});

    const submitData = async (data: FormData) => {
        try {
          const credentials = await registerUser(data.email, data.password);
      
          const userData: UserData = {
            email: credentials.user.email,
            uid: credentials.user.uid,
            role: 'user',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            name: '',
            phone: '',
          };
      
          await createUser(userData);
          toast({
            title: 'Signed up successfully',
            description: 'We have created your account.',
            duration: 5000,
            variant: 'default',
          });
          navigate('/');
        } catch (error) {
          toast({
            title: 'Something went wrong',
            description: 'Email already exists or something',
            duration: 5000,
            variant: 'destructive',
          });
        }
      };

  return (
    <>
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-50 h-20 mr-2 dark:invert"
            src={'/public/GALogo.svg'}
            alt="logo"
          />
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(submitData)} >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <label
                  htmlFor="new password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"           
                  {...register("password")}
                  id="new-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>
              <div>
                <label
                  htmlFor="confirm-Password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm-Password
                </label>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  id="current-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
              </div>
              <Button
                type="submit"
                className="w-full dark:text-white  rounded-lg py-2"
              >
                Register
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to={'/login'}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </>
  )
}

export default SignUp