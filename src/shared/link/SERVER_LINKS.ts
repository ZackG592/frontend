export const SERVER_HOST = 'http://localhost:4000'

export const SERVER_LINKS = {
    RECIPE: {
        CREATE: `${SERVER_HOST}/recipes/create`,
        RATE: `${SERVER_HOST}/recipes/rate`,
        OWN: `${SERVER_HOST}/recipes/own`,
        OTHERS: `${SERVER_HOST}/recipes/others`
    },
    AUTH: {
        REGISTRATION: `${SERVER_HOST}/auth/registration`,
        AUTHORIZATION: `${SERVER_HOST}/auth/authorization`
    }
}