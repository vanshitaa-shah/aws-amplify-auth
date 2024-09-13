import Card from '@/components/card/CardLayout';
import ConfirmEmailForm from '@/components/form/EmailVerificationForm';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useErrorHandler } from '@/utils/hooks/useErrorHandler';
import { resendSignUpCode } from 'aws-amplify/auth';
import { useLocation } from 'react-router-dom';

const EmailVerificationForm = () => {
  const location = useLocation();
  const { toast } = useToast();
  const handleError = useErrorHandler();

  // Extract email from location state
  const email = location.state?.email;

  // Function to resend verification code
  const resendCode = async () => {
    try {
      await resendSignUpCode({ username: email });
      toast({
        description: 'Please check your email for the verification code.',
      });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Email Confirmation</Card.Title>
      </Card.Header>
      <Card.Content>
        <ConfirmEmailForm email={email} />
      </Card.Content>
      <Card.Footer>
        <Button variant="secondary" onClick={resendCode}>
          Resend verification code
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default EmailVerificationForm;
