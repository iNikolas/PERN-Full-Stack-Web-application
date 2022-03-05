const handleToastErrorCreation = async (response, setError) => {
    const errorStatus = await response.json()
    const error = errorStatus.errors[0]
    setError(error)
}

export default handleToastErrorCreation