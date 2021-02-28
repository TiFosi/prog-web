export const fetchFromCoronavirusAPI = async (route) => {
    try {
        const response = await fetch(
            "https://coronavirusapi-france.now.sh/" + route
        );
        const responseJson = await response.json();
        return responseJson;
    } catch (err) {
        console.log(`### ${err}`);
        throw err;
    }
};
