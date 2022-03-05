import {backend} from "../../common/constants";
import handleToastErrorCreation from "../../common/ToastError/handleToastErrorCreation";

const handleLogoutUser = async (setError, setUser) => {
    try {
        const response = await fetch(`${backend}/users/logout`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/vnd.api+json'
            },
            credentials: 'include'
        })

        const goodResponse = response.ok
        if (!goodResponse) await handleToastErrorCreation(response, setError)
    } catch (error) {
        console.error(error.message)
    } finally {
        setUser(null)
    }
}

export default handleLogoutUser