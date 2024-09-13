
import { Link } from 'react-router-dom';
import SignupForm from '../components/form/SignupForm';
import Card from '../components/card/CardLayout';
import { Button } from '@/components/ui/button';

const Signup = () => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Sign Up</Card.Title>
      </Card.Header>
      <Card.Content>
        <SignupForm />
      </Card.Content>
      <Card.Footer>
        <span className="text-sm">Already have an account?</span>
        <Link to="/login">
          <Button variant="link" className="ms-1 p-0">
            Login
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default Signup;
