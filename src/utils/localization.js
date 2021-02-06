export const getLanguage = () => {
    return 'en'
}

export const t = (str) => {
    return `${str}`.replace(/_/g, " ")
}

