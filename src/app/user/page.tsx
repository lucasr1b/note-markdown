import { signOut, auth } from '@/auth';

const UserPage = async () => {
  const session = await auth()

  if (!session || !session.user) return 'No session.';

  return (
    <div>
      <p>Logged in as: {session.user.email}</p>
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <button type='submit'>Sign Out</button>
      </form>
    </div>
  )
}

export default UserPage;
