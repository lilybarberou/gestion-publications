import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

export default function Navigation() {
    const router = useRouter();

    // declare navLinks
    const navLinks = [
        { title: 'Accueil', path: '/' },
        { title: "Ajout d'une publication", path: '/ajout-publication' },
    ];

    const handleLogout = () => {
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('user');
        window.location.pathname = '/connexion';
    };

    if (['/connexion', '/inscription'].includes(router.pathname)) return null;
    return (
        <S.Container>
            {navLinks.map((link) => (
                <Link key={link.path} href={link.path} className={router.pathname === link.path ? 'active' : ''}>
                    {link.title}
                </Link>
            ))}
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
