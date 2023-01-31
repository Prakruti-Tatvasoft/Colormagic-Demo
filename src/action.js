import { useInfiniteQuery, useQuery } from "react-query"
import { queryRequestOptions, CAT_LIST, BREED_LIST, CAT_DETAIL } from "./helper/constants"
import { breedList, catDetail, catList } from "./request"

/**
 *  get list of breeds
 */
const GetBreeds = () => {
    const query = useQuery(BREED_LIST, breedList, {
        ...queryRequestOptions
    })
    return { ...query }
}

/**
 * get list of cats by breed id
 */
const GetCatList = (breedId) => {
    const query = useInfiniteQuery([CAT_LIST, breedId], ({ pageParam }) => catList(breedId, pageParam), {
        getNextPageParam: (lastPage, pages) => {
            if(lastPage.data.length >= 10) {
                return pages.length + 1
            } else {
                return undefined
            }
        },
        enabled: !!breedId,
        ...queryRequestOptions
    })
    return { ...query }
}

/**
 * get cat details
 */
const GetCatDetail = (catId) => {
    const query = useQuery([CAT_DETAIL, catId], catDetail, {
        ...queryRequestOptions
    })
    return { ...query }
}

export {
    GetBreeds,
    GetCatList,
    GetCatDetail
}