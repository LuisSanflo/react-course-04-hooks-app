import { UserContext } from '@/09-useContext/context/UserContext'
import { Button } from '@/components/ui/button'
import { use } from 'react'

export const ProfilePage = () => {
    const { user, logout } = use(UserContext);

    const handleExit = () => {
        logout();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className='text-4xl'>Perfil del usuario</h1>
            <pre className='my-2'>
                {JSON.stringify(user || {}, null, 1)}
            </pre>
            <Button variant="destructive" onClick={handleExit}>
                Salir
            </Button>
        </div>
    )
}
