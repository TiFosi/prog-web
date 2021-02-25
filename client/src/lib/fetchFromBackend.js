const API = "http://localhost:5000";
export const fetchFromBackend = async (route) => {
    try {
        const response = await fetch(`${API}/${route}`);
        const responseJson = await response.json();
        return responseJson;
    } catch (err) {
        console.log(err);
        throw err;
    }
};