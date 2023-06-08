import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { fetchApi } from '@lib/api';
import { getFormData } from '@contexts/Utils';
import { Button, Input } from '@components/StyledComponents';
import { Type, User } from '@lib/types';

export default function AjoutPublication() {
    const router = useRouter();
    const [choosedType, setChoosedType] = useState(1);
    const [types, setTypes] = useState<Type[]>([]);
    const user = JSON.parse(localStorage.getItem('user')!) as User;
    const websiteRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    // GET TYPES
    useEffect(() => {
        const getTypes = async () => {
            const query = await fetchApi('types');

            if (query.success) setTypes(query.data);
        };
        getTypes();
    }, []);

    // HANDLE SUBMIT
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const data = getFormData('#form') as { [key: string]: string };

        if (data.link && !data.link.match(websiteRegex)) return toast("Le lien n'est pas valide", { type: 'error' });

        const query = await fetchApi('publications', { method: 'POST', body: JSON.stringify({ ...data, user_id: user.id }) });

        if (query.success) {
            toast('La publication a été ajoutée', { type: 'success' });
            router.push('/');
        } else toast(query.message, { type: 'error' });
    };

    const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setChoosedType(Number(e.target.value));
    };

    const fields = [
        { name: 'title', label: 'Titre', required: true },
        { name: 'authors', label: 'Auteurs', required: true },
        { type: 'date', name: 'date_published', label: 'Date de publication', required: true },
        { name: 'link', label: 'Lien externe', required: false },
        { types: [1], name: 'review', label: 'Revue', required: true },
        { types: [2], name: 'conference', label: 'Conférence', required: true },
        { types: [3], name: 'book', label: 'Livre', required: true },
        { name: 'volume', label: 'Volume', required: true },
        { types: [1, 2], name: 'number', label: 'Numéro', required: true },
        { type: 'number', name: 'pages', label: 'Pages', required: true },
        { types: [1, 3], name: 'editor', label: 'Éditeur', required: true },
    ];

    return (
        <S.Container>
            <Head>
                <title>Ajouter une publication</title>
            </Head>
            <S.Form id='form' onSubmit={handleSubmit}>
                <h1>Ajouter une publication</h1>
                <S.Types>
                    {types.map((type) => (
                        <div key={type.id}>
                            <input
                                onChange={handleTypeChange}
                                type='radio'
                                name='type_id'
                                value={type.id}
                                id={`type-${type.id}`}
                                defaultChecked={type.id === 1}
                            />
                            <label htmlFor={`type-${type.id}`}>{type.label}</label>
                        </div>
                    ))}
                </S.Types>
                {fields.map((field) => {
                    if (field.hasOwnProperty('types') && !field.types?.includes(choosedType)) return null;
                    return (
                        <S.Field key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <Input type={field.type || 'text'} name={field.name} required={field.required || false} />
                        </S.Field>
                    );
                })}
                <Button>Ajouter</Button>
            </S.Form>
        </S.Container>
    );
}

const S: any = {};
S.Container = styled.div`
    padding: 0 20px;
    display: flex;

    h1 {
        margin-bottom: 10px;
    }
`;

S.Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;

    button {
        margin-top: 10px;
        margin-left: auto;
        width: 150px;
    }
`;

S.Field = styled.div`
    display: grid;
    align-items: center;
    gap: 10px;
    grid-template-columns: 140px 1fr;

    label {
        text-align: end;
        font-size: 14px;
    }
`;

S.Types = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px 10px;
    font-size: 13px;
    margin-bottom: 20px;

    label {
        padding: 5px 10px;
        border: 1px solid #626262;
        cursor: pointer;
    }

    input:checked ~ label {
        border: 1px solid ${({ theme }) => theme.primary};
        background-color: ${({ theme }) => theme.primary};
    }

    input {
        display: none;
    }
`;
