export const fetchFromCoronavirusAPI = async () => {
    try {
        const response = await fetch(
            "https://coronavirusapi-france.now.sh/FranceLiveGlobalData"
        );
        const responseJson = await response.json();
        return responseJson;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
