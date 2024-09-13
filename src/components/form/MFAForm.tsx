import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { mfaFormSchema } from '@/utils/validationSchema';
import { confirmSignIn } from 'aws-amplify/auth';
import { useErrorHandler } from '@/utils/hooks/useErrorHandler';

const MFAForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleError = useErrorHandler();

  // Extract setupUri from location state
  const setupUri = location.state?.setupUri;

  // Initialize form with Zod schema
  const form = useForm<z.infer<typeof mfaFormSchema>>({
    resolver: zodResolver(mfaFormSchema),
    defaultValues: {
      totpCode: '',
    },
  });
  const { isSubmitting } = form.formState;

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof mfaFormSchema>) => {
    try {
      const { totpCode } = values;
      const res = await confirmSignIn({
        challengeResponse: totpCode,
      });

      if (res.isSignedIn) {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/home');
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      {setupUri && (
        <div className="mb-6 mx-auto w-[200px]">
          <QRCode
            size={512}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={setupUri}
            viewBox={`0 0 512 512`}
          />
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="totpCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="TOTP Code" {...field} />
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
    </>
  );
};

export default MFAForm;
