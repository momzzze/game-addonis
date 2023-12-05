import { Button } from "@/components/ui/button";
import {Link} from "react-router-dom";
import { ZodType ,z} from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData={
    email: string;
    password: string;
}

function SignIn() {
    const schema: ZodType<FormData> = z.object({
        email: z.string().email(),
        password: z.string().min(6,'Password should be with at least with 6 symbols.').max(100),
    })
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema)});

    const submitData=(data:FormData)=>{
        console.log(data);        
    }
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
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(submitData)}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                  {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password")}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                  </div>
                  <Link
                    to={'/forgot-password'}
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-white dark:hover:text-primary"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="w-full dark:text-white  rounded-lg py-2"
                >
                  Sign in
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don&apos;t have an account yet?{" "}
                  <Link
                    to={'/register'}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignIn;
