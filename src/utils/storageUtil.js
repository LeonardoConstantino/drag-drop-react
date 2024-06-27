/**
 * Prefixo utilizado para todas as chaves armazenadas no localStorage.
 * @type {string}
 */
let APP_PREFIX = '';

/**
 * Lança um erro se o prefixo não tiver sido definido.
 * @throws {Error} Se o prefixo não estiver definido.
 */
const validatePrefix = () => {
    if (APP_PREFIX.trim() === '') {
        throw new Error('Prefix must be set using setAppPrefix before performing any operations.');
    }
};

/**
 * Lança um erro se a chave não for uma string não vazia.
 * @param {string} key - A chave a ser validada.
 * @throws {Error} Se a chave não for uma string não vazia.
 */
const validateKey = (key) => {
    if (typeof key !== 'string' || key.trim() === '') {
        throw new Error('Key must be a non-empty string.');
    }
};

/**
 * Executa a função de callback após validar o prefixo e a chave.
 * Concatena o prefixo da aplicação com a chave e passa como argumento para o callback.
 * @param {string} key - A chave para a operação.
 * @param {Function} callback - Função de callback que recebe a chave prefixada como argumento.
 * @returns {any} O valor retornado pela função de callback.
 */
const validateAndExecute = (key, callback) => {
    validatePrefix();
    validateKey(key);
    return callback(APP_PREFIX + key);
};

/**
 * Define o prefixo da aplicação para todas as chaves armazenadas.
 * Adiciona um '_' ao final do prefixo para separação.
 * @param {string} prefix - O prefixo a ser definido para as chaves.
 * @throws {Error} Se o prefixo não for uma string não vazia.
 */
const setAppPrefix = (prefix) => {
    if (typeof prefix !== 'string' || prefix.trim() === '') {
        throw new Error('Prefix should be a non-empty string.');
    }
    APP_PREFIX = prefix.trim() + '_';
};

/**
 * Armazena um valor no localStorage com a chave prefixada.
 * @param {string} key - A chave para armazenar o valor.
 * @param {any} value - O valor a ser armazenado. Será convertido para JSON se for um objeto.
 */
const setItem = (key, value) => {
    validateAndExecute(key, (prefixedKey) => {
        const storeValue = typeof value === 'object' ? JSON.stringify(value) : value;
        localStorage.setItem(prefixedKey, storeValue);
    });
};

/**
 * Obtém um valor do localStorage utilizando a chave prefixada.
 * @param {string} key - A chave para obter o valor.
 * @returns {any} O valor armazenado no localStorage, convertido de volta de JSON se aplicável.
 */
const getItem = (key) => {
    return validateAndExecute(key, (prefixedKey) => {
        const storedValue = localStorage.getItem(prefixedKey);
        try {
            return JSON.parse(storedValue);
        } catch (e) {
            console.warn(`Failed to parse stored value for key "${prefixedKey}"`, e);
            return storedValue;
        }
    });
};


/**
 * Objeto contendo utilitários para manipulação do armazenamento com prefixo de aplicação.
 */
export const storageUtil = {
    setAppPrefix,
    setItem,
    getItem
};
