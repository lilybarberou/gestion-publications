export const fetchApi = async (url: string, options?: RequestInit): Promise<any> => {
    const res = await fetch(`http://localhost:3000/api/${url}`, {...options, headers: {content_type: 'application/json'}});
    const data = await res.json();
    return data;
}