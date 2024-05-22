'use client';
import { logout } from '@/actions/session';
import { useSession } from '@/context/SessionContext';

const UserPage = () => {
  const { session } = useSession();

  if (session && !session.isLoggedIn) {
    return <p>You are not logged in</p>;
  }

  return (
    <div>
      <p>Logged in as: {session?.email}</p>
      <form action={logout}>
        <button type='submit'>Sign Out</button>
      </form>
    </div >
  )
}

export default UserPage;
