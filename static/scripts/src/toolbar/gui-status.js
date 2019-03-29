import React from 'react';

function GuiStatus(props) {
    if(!props.isBackendConnected) {
        return(<div/>);
    }

    const guiIconName = props.isGUIConnected ? "flash" : "flash-off";
    const status = props.isGUIConnected ? "Operator is connected" : "No operator is connected to the station";

    return (
            <div
                className={"control tooltip is-tooltip-bottom"}
                data-tooltip={`GUI: ${status}`}
            >
                <button className={"button is-rounded is-static"}>
                    <span className={"icon"}>
                        <ion-icon name={guiIconName}/>
                    </span>
                </button>
            </div>
    )
}

export default GuiStatus;
