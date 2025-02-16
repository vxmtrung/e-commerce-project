

async function apiFetch({
    path,
    data = {},
    query,
    method = 'GET',
    headers = {},
    options,
}) {
    let responseData;

    try {
        const apiURL = process.env.NEXT_PUBLIC_BACKEND_URL;
        const url = new URL(`${apiURL}${path}`);
        let defaultHeaders = {
            'Content-Type': 'application/json'
        };
        if (query) {
            Object.keys(query).forEach((key) =>
                url.searchParams.append(key, typeof query[key] === 'object' ? JSON.stringify(query[key]) : query[key]?.toString())
            );
        }
        if (data instanceof FormData) {
            defaultHeaders = {};
        } else {
            data = method !== 'GET' ? JSON.stringify(data) : undefined;
        }

        const response = await fetch(url.href, {
            method: method,
            body: data,
            credentials: 'include',
            headers: {
                ...defaultHeaders,
                ...headers,
            },
            ...options,
        });
        responseData = await response.json();

        if (responseData.error) {
            throw responseData.error;
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    }

    return responseData;
}


export const client = {
    get: (path, query, options = {}) => {
        return apiFetch({ path, query, options });
    },

    post: (path, data, query, options = {}) => {
        return apiFetch({ path, data, query, method: 'POST', options });
    },

    put: (path, data, query, options = {}) => {
        return apiFetch({ path, data, query, method: 'PUT', options });
    },

    delete: (path, data, query, options = {}) => {
        return apiFetch({ path, data, query, method: 'DELETE', options });
    }
};

export default client;