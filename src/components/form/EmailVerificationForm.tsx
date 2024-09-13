import { emailVerificationFormSchema } from '@/utils/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useErrorHandler } from '@/utils/hooks/useErrorHandler';
import { confirmSignUp } from 'aws-amplify/auth';

const EmailVerificationForm = ({ email }: { email: string }) => {
  const navigate = useNavigate();
  const handleError = useErrorHandler();

  // Initialize form with Zod schema
  const form = useForm<z.infer<typeof emailVerificationFormSchema>>({
    resolver: zodResolver(emailVerificationFormSchema),
    defaultValues: {
      verificationCode: '',
    },
  });

  const { isSubmitting } = form.formState;

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof emailVerificationFormSchema>) => {
    try {
      const { verificationCode } = values;
       await confirmSignUp({
        username: email,
        confirmationCode: verificationCode,
      });
      navigate('/login');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="verificationCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Verification Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default EmailVerificationForm;
