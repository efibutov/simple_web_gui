function getDataFromServer(url, successCallback, errorCallback) {
    fetch(
        url
    ).then(response => {
        if (response.ok) {
            return response.json();
        }
        else {
            const serverErrorMessage = response.toString();
            errorCallback(`FAILED TO GET CONFIG:\n${serverErrorMessage}`);
        }
    }).then(data => {
        successCallback(data);
    });
}

function submitData(url, data, successCallback, errorCallback) {
    return fetch(
        url,
        {
            body: JSON.stringify(data),
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "user-agent": "Mozilla/4.0 MDN Example",
                "content-type": "application/json"
            },
            method: "POST"
        }).then(response => {
        if (response.ok) {
            try {
                return response.json();
            }
            catch (e) {
                // console.log(e);
                return {};
            }

        }
        else {
            errorCallback(response);
        }
    }).then(data => {
        // successCallback(data);
    });
}

export {submitData, getDataFromServer};
