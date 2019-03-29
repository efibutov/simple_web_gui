import React from "react";

function PortsInfo(props) {
    let msg = undefined;
    const attachedPorts = props.attachedPorts;

    if(!attachedPorts){
        msg = <h5>No COM-ports attached to the system</h5>;
    }
    else{
        let configuredItems = Array();

        for (let devName in props.configuredPorts) {
            let deviceData = props.configuredPorts[devName];
            let status = deviceData["Status"];
            let error = deviceData["Error"];
            let icon = undefined;

            if(error){
                icon = (
                    <span className="icon has-text-danger tooltip is-tooltip-right" data-tooltip={error}>
                        <ion-icon name="alert"/>
                    </span>
                );
            }
            else{
                icon = (
                    <span className="icon has-text-success">
                        <ion-icon name={status? "checkmark-circle": "close-circle"}/>
                    </span>
                );
            }

            configuredItems.push(
                <li key={devName}>
                    {icon}
                    <strong>
                        {devName}
                    </strong>
                </li>
            )
        }

        const configuredMissingPortsItems = Array();

        for (let i in props.configuredMissingPorts){
            let devName = props.configuredMissingPorts[i];
            configuredMissingPortsItems[i] = (
                <li key={devName}>
                    {devName}
                </li>
            )
        }

        let notConfiguredItems = Array();

        for (let i in props.notConfiguredPorts) {
            let device = props.notConfiguredPorts[i];

            notConfiguredItems.push(
                <li key={device}>
                    <i>{device}</i>
                </li>
            )
        }

        msg = (
            <div>
                <h3>Configured COM-ports:</h3>
                <ul style={{
                    listStyleType: 'none'
                }}>
                    {configuredItems}
                </ul>
                <h3>Configured (but missing) COM-ports:</h3>
                <ul style={{
                    listStyleType: 'none'
                }}>
                    {configuredMissingPortsItems}
                </ul>
                <h3>Not configured COM-ports:</h3>
                <ul style={{
                    listStyleType: 'none'
                }}>
                    {notConfiguredItems}
                </ul>
            </div>
        );
    }

    return (
        <div className={"column is-narrow"}>
            <div id={"info-bar"} className={"box"}>
                {msg}
            </div>
        </div>
    );
}

export default PortsInfo;
