
import { Suspense } from 'react';
import CreateAccountClient from '@/components/CreateAccount';

export default function CreateAccountPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateAccountClient />
    </Suspense>
  );
}
