import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Navigation() {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    // check if user is admin
    useEffect(() => {
        const member = window.localStorage.getItem('user');
        if (member && JSON.parse(member).role === 1) setIsAdmin(true);
    }, [router.pathname]);

    // declare navLinks
    const navLinks = [
        { title: 'Accueil', path: '/' },
        { title: 'Consommations journalières', path: '/consommations-journalieres' },
        { title: 'Consommations mensuelles', path: '/consommations-mensuelles' },
        { cond: isAdmin, title: 'Ajouter une consommation', path: '/consommations/ajouter' },
    ];

    const handleLogout = () => {
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('user');
        window.location.pathname = '/connexion';
    };

    if (['/connexion', '/inscription'].includes(router.pathname)) return null;
    return (
        <S.Container>
            {navLinks.map((link) => {
                if (link.hasOwnProperty('cond') && !link.cond) return null;
                return (
                    <Link key={link.path} href={link.path} className={router.pathname === link.path ? 'active' : ''}>
                        {link.title}
                    </Link>
                );
            })}
            <S.Disconnect onClick={handleLogout}>Déconnexion</S.Disconnect>
        </S.Container>
    );
}

const S: any = {};
S.Container = styled.div`
    margin: 20px;
    margin-bottom: 40px;
    padding-bottom: 5px;
    display: flex;
    gap: 20px;
    border-bottom: 1px solid #575757;

    a {
        transition: 0.2s;

        :hover,
        &.active {
            color: ${({ theme }) => theme.primary};
        }
    }
`;

S.Disconnect = styled.span`
    margin-left: auto;
    font-size: 14px;
    cursor: pointer;
    color: ${({ theme }) => theme.primary};
`;