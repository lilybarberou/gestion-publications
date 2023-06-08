import { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { fetchApi } from '@lib/api';
import { Publication, Type } from '@lib/types';
import { Button, Input, Select } from '@components/StyledComponents';
import Link from 'next/link';

export default function Home() {
    const [publications, setPublications] = useState<{ [key: string]: Publication[] }>({ initial: [], filtered: [] });
    const [filters, setFilters] = useState<{ [key: string]: string }>({ year: '', authors: '', type: '' });
    const [types, setTypes] = useState<Type[]>([]);
    const [showModal, setShowModal] = useState(false);

    // GET TYPES + PUBLICATIONS
    useEffect(() => {
        const getData = async () => {
            Promise.all([fetchApi('publications'), fetchApi('types')]).then(([publications, types]) => {
                setTypes(types.data);
                setPublications({ initial: publications.data, filtered: publications.data });
            });
        };

        getData();
    }, []);

    const getTiersData = (publication: Publication) => {
        const fields = ['review', 'conference', 'book', 'volume', 'number', 'pages', 'editor'];
        const values = Object.entries(publication)
            .filter(([key, value]) => fields.includes(key) && value !== null)
            .map(([key, value]) => value)
            .join(', ');
        return values;
    };

    const handleModal = () => setShowModal(!showModal);

    const resetFilters = () => {
        setFilters({ year: '', authors: '', type: '' });
        setPublications({ ...publications, filtered: publications.initial });
    };

    const getFilteredPublications = () => {
        return publications.filtered.filter(
            (publication) =>
                (!filters.year || new Date(publication.date_published).getFullYear() === parseInt(filters.year)) &&
                (!filters.authors || publication.authors.toLowerCase().includes(filters.authors.toLowerCase())) &&
                (!filters.type || publication.type_id === parseInt(filters.type))
        );
    };

    const getYearOptions = () => {
        let arr: number[] = [];
        publications.initial.forEach((publication) => {
            if (!arr.includes(new Date(publication.date_published).getFullYear())) arr.push(new Date(publication.date_published).getFullYear());
        });

        const sortedArr = arr.sort((a, b) => a - b);
        return sortedArr.map((year) => (
            <option key={year} value={year}>
                {year}
            </option>
        ));
    };

    return (
        <S.Container>
            <Head>
                <title>Accueil</title>
            </Head>
            <h1>Accueil</h1>
            <S.ModalContainer>
                <Button onClick={handleModal}>Filtrer</Button>
                {showModal && (
                    <S.Modal>
                        <h2>Filtrer</h2>
                        <div>
                            <label htmlFor='authors'>Auteurs</label>
                            <Input id='authors' value={filters.authors} onChange={(e) => setFilters({ ...filters, authors: e.target.value })} />
                            <label htmlFor='year'>Année</label>
                            <Select id='year' value={filters.year} onChange={(e) => setFilters({ ...filters, year: e.target.value })}>
                                <option value=''>Toutes</option>
                                {getYearOptions()}
                            </Select>
                            <label htmlFor='type'>Type</label>
                            <Select id='type' value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
                                <option value=''>Tous</option>
                                {types.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.label}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <Button onClick={resetFilters}>Réinitialiser</Button>
                    </S.Modal>
                )}
            </S.ModalContainer>
            <S.Columns>
                <span>Titre</span>
                <span>Année</span>
            </S.Columns>
            {getFilteredPublications().map((publication) => (
                <S.Publication
                    $link={Boolean(publication.link)}
                    key={publication.id}
                    as={publication.link ? Link : 'div'}
                    href={publication.link || undefined}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <div>
                        <h2>{publication.title}</h2>
                        <p>{publication.authors}</p>
                        <p>{getTiersData(publication)}</p>
                    </div>
                    <span>{new Date(publication.date_published).getFullYear()}</span>
                </S.Publication>
            ))}
            {showModal && <S.Background onClick={handleModal} />}
        </S.Container>
    );
}

const S: any = {};
S.Container = styled.div`
    margin: 20px;

    h1 {
        margin-bottom: 20px;
    }
`;

S.ModalContainer = styled.div`
    position: relative;
    margin-bottom: 20px;
`;

S.Modal = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    color: black;
    position: absolute;
    top: 42px;
    left: 0;
    width: 300px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-in-out;
    z-index: 2;

    div {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
`;

S.Columns = styled.div`
    padding: 0 20px;
    display: grid;
    grid-template-columns: 1fr 50px;
    margin-bottom: 10px;
`;

S.Publication = styled.div<{ $link: boolean }>`
    padding: 10px 20px;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 60px;
    background: #454545;

    :nth-child(2n) {
        background: #323232;
    }
    > div {
        display: flex;
        flex-direction: column;
    }

    h2 {
        font-size: 19px;
        font-weight: 500;
        ${({ $link }) => $link && 'color: #2663de;'}
    }
    p {
        font-size: 14px;
        color: #b3b3b3;
    }
    span {
        margin-left: auto;
    }
`;

S.Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
`;
