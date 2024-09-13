import { loginFormSchema } from '@/utils/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { signIn } from 'aws-amplify/auth';
import SocialLogins from './SocialLogins';
import { useErrorHandler } from '@/utils/hooks/useErrorHandler';
import { useState } from 'react';

const LoginForm = () => {
  const navigate = useNavigate();
  const handleError = useErrorHandler();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  });

  const { isSubmitting } = form.formState;
  const [isSocialLoginInProgress, setIsSocialLoginInProgress] = useState(false);

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      const { email, password } = values;
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password,
      });

      if (!isSignedIn && nextStep.signInStep === 'CONFIRM_SIGN_UP') {
        const error = new Error('User is not confirmed');
        error.name = 'UserNotConfirmedException';
        throw error;
      }

      // Handle different authentication steps
      if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_TOTP_CODE') {
        navigate('/mfa', { state: { email } });
      } else if (nextStep.signInStep === 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP') {
        const setupUri = nextStep.totpSetupDetails.getSetupUri('congito');
        navigate('/mfa', { state: { setupUri: setupUri.href, email } });
      }
    } catch (error) {
      handleError(error, values.email);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting || isSocialLoginInProgress}
        >
          Submit
        </Button>
        <SocialLogins
          isSubmitting={isSubmitting}
          isSocialLoginInProgress={isSocialLoginInProgress}
          setIsSocialLoginInProgress={setIsSocialLoginInProgress}
        />
      </form>
    </Form>
  );
};

export default LoginForm;
