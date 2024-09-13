import { RouterProvider } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Toaster } from './components/ui/toaster';
import { router } from './routes';
import outputs from '../amplify_outputs.json';
import './App.css';

Amplify.configure(outputs);

function App() {
  return (
    <>
      <main className="flex justify-center items-center h-screen">
        <RouterProvider router={router} />
      </main>
      <Toaster />
    </>
  );
}

export default App;
