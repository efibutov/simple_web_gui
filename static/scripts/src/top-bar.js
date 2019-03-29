import React from "react";
import BackendStatus from "./toolbar/backend-status";
import GuiStatus from "./toolbar/gui-status";
import Header from "./header";
import ToggleAllPorts from "./toolbar/toggle-all-ports";

function TopBar(props) {
    return (
        <nav className="navbar is-fixed-top is-dark" id={"top-bar"}>
            <Header/>
            <div className={"navbar-item"}>
                <div className={"field is-grouped"}>
                    <div className={"columns"}>
                        <div className={"column is-one-fifths"}>
                            <div className={"field has-addons"}>
                                <BackendStatus
                                    isBackendConnected={props.isBackendConnected}
                                />
                                <GuiStatus
                                    isGUIConnected={props.isGUIConnected}
                                    isBackendConnected={props.isBackendConnected}
                                />
                                <ToggleAllPorts
                                    releaseAllPorts={props.releaseAllPorts}
                                    openAllPorts={props.openAllPorts}
                                    activePorts={props.activePorts}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}


export default TopBar;
