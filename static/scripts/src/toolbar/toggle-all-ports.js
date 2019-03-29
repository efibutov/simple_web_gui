import React from "react";


function ToggleAllPorts(props){
    console.log(props.numberOfOpenedPorts);
    const activePorts = props.activePorts;
    let numOfOpenedPorts = 0;

    for (let deviceName in activePorts) {
        if(activePorts[deviceName]['Status']) {
            numOfOpenedPorts ++;
        }
    }

    console.log(numOfOpenedPorts);
    let dataToolTip = "";
    let iconName = "";
    let method = undefined;

    if (numOfOpenedPorts) {
        dataToolTip = "Release all ports";
        iconName = "square";
        method = props.releaseAllPorts;
    }
    else {
        dataToolTip = "Open all available ports";
        iconName = "play-circle";
        method = props.openAllPorts;
    }

    return(
        <div className={"control tooltip is-tooltip-bottom"}
             data-tooltip={dataToolTip}
        >
            <button className={"button is-rounded"} onClick={method}>
                <span className={"icon"}>
                    <ion-icon name={iconName}/>
                </span>
            </button>
        </div>
    )
}

export default ToggleAllPorts;