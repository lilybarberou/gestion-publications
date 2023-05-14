import { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

export default function Home() {
    useEffect(() => {
        const initPage = () => {};

        initPage();
    }, []);

    return (
        <S.Container>
            <Head>
                <title>Accueil</title>
            </Head>
            <h1>Accueil</h1>
        </S.Container>
    );
}

const S: any = {};
S.Container = styled.div`
    margin: 20px;
`;

S.Table = styled.table`
    margin-top: 10px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    border-collapse: collapse;

    tr {
        display: grid;
        grid-template-columns: 150px repeat(12, 70px);
    }
    td,
    th {
        border: 1px solid #575757;
        text-align: left;
        padding: 8px;
    }
    thead tr th:first-of-type {
        border: none;
    }
`;

S.Columns = styled.tr`
    color: ${({ theme }) => theme.primary};
    font-size: 15px;
`;

S.Row = styled.td<{ valid: boolean }>`
    ${({ valid }) => (valid ? 'background-color: #19b719;' : 'background-color: #ac3131;')}
`;
