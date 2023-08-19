const httpGetKey = async () => {
    const keyResponse = await fetch('http://localhost:3001/keys/omdb')
    const fetchedKey = await keyResponse.json()
    return fetchedKey.key
}

const httpGetMovieInfo = async (id) => {
    const key = await httpGetKey()

    const response = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${id}`)
    const fetchedInfo = await response.json()

    return fetchedInfo
}

export {httpGetMovieInfo, httpGetKey}