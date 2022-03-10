const stores = ["negociacoes"];

let connection = null;

let close = null;

export class ConnectionFactory
{
    constructor()
    {
        throw new Error("Não é necessário criar instâncias da classe ConnectionFactory");
    }

    static getConn()
    {
        return new Promise((resolve, reject) => 
        {
            if(connection) return resolve(connection);
            const openRequest = indexedDB.open("cangaceirojs", 2);

            openRequest.onupgradeneeded = response => 
            {
                ConnectionFactory._createStores(response.target.result);
            };

            openRequest.onsuccess = response =>
            {
                connection = response.target.result;

                close = connection.close.bind(connection);

                connection.close = () => 
                {
                    throw new Error('Você não fechar a conexão diretamente');
                };

                resolve(response.target.result);
            };

            openRequest.onerror = response =>
            {
                console.log(response.target.error)
                reject(response.target.name);
            };
        });
    }

    static _createStores(connection)
    {
        stores.forEach(store => 
        {
            if(connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);

            connection.createObjectStore(store, {autoIncrement: true});
        });

    }

    static closeConn()
    {
        if(connection)
        {
            close();
        }
    }
}