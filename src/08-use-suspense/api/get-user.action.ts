export interface User {
    id: number;
    name: string;
    location: string;
    role: string
}

export const getUserAction = async (id: number) => {
    console.log('Función llamda');
    await new Promise(res => setTimeout(res, 2000));

    console.log('Función resolvió');

    return {
        id,
        name: 'Luis',
        location: 'Querétaro, México',
        role: 'Rol de usuario'
    };
}
