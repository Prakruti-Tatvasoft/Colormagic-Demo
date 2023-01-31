import axios from "axios"

const breedList = async() => {
    try {
        const query = await axios.get('https://api.thecatapi.com/v1/breeds')
        return query
    } catch (error) {
        return alert('Error while fetching breeds')
    }
}

const catList = async(breedId, pageParam = 1) => {
    try {
        const query = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=10&page=${pageParam}&breed_id=${breedId}`)
        return query
    } catch (error) {
        return alert('Apologies but we could not load new cats for you at this time! Miau!')
    }
    
}

const catDetail = async ({ queryKey }) => {
    try {
        const query = await axios.get(`https://api.thecatapi.com/v1/images/${queryKey[1]}`)
        return query
    } catch (error) {
        return alert('Apologies but we could not load new cat details for you at this time! Miau!')
    }
}

export {
    breedList,
    catList,
    catDetail
}