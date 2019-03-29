import React from 'react';

function BackendStatus(props) {
    const backendIconName = props.isBackendConnected ? "flash" : "flash-off";
    const tooltipInfo = props.isBackendConnected ? "Backend connection is OK" : "Disconnected";

    return (
        <div id={'backEndStatus'}
            className={"control tooltip is-tooltip-bottom"}
            data-tooltip={tooltipInfo}
        >
            <button className={"button is-rounded is-static"}>
                    <span className={"icon"}>
                        <ion-icon name={backendIconName}/>
                    </span>
            </button>
        </div>
    )
}

export default BackendStatus;
