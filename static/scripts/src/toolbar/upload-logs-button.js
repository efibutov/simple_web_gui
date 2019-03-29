import React from "react";


function UploadLogsButton(props){
    return(
        <div className={"control tooltip is-tooltip-bottom"}
             data-tooltip={"Upload logs to backend for tech support - currently not working"}
        >
            <button className={"button is-rounded is-static"} onClick={props.uploadLogs}>
                <span className={"icon"}>
                    <ion-icon name={"paper-plane"}/>
                </span>
            </button>
        </div>
    )
}

export default UploadLogsButton;
