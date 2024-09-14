import {getServerSession} from 'next-auth';
import {nextAuthOptions} from '@/app/api/auth/[...nextauth]/auth';

export default async function DashboardLayout({children}: { children: React.ReactNode }) {

    const user: any = await getServerSession(nextAuthOptions);

    if (!user) {
        return <h2 className="w-full h-full py-52 text-center font-bold text-2xl">Não autorizado!<span
            className="font-light"> Faça login para acessar.</span>
        </h2>;
    }

    return (
        <>
            {children}
        </>
    )
}