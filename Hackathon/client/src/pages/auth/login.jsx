import React from "react";
import { loginFormControls } from "@/config";
import { Link , useNavigate} from "react-router-dom";
import { useState } from "react";
import CommonForm from '@/components/common/form';
import { useDispatch } from 'react-redux';
import { loginUser } from "@/store/auth-slice";
import { useToast } from '@/hooks/use-toast';

const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {toast} = useToast()

  function onSubmit(event) {
    event.preventDefault()
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2 text-primary-foreground">
          Don't have an account?
          <Link
            className="font-medium ml-2 hover:underline text-primary-foreground"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthLogin;
