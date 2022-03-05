import {backend} from "../../common/constants";
import handleToastErrorCreation from "../../common/ToastError/handleToastErrorCreation";


const handleFormSubmit = (endPointString, name, password, setUser, setError) => {
    return async (event) => {
        event.preventDefault()
        try {
            const body = {
                data: {
                    type: 'users',
                    attributes: {name, password}
                }
            }

            const response = await fetch(`${backend}/users/${endPointString}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json'
                },
                credentials: 'include',
                body: JSON.stringify(body)
            })

            if (response.ok) return setUser(await response.json())

            await handleToastErrorCreation(response, setError)

        } catch (error) {
            console.error(error.message)
        }
    }
}

export default handleFormSubmit