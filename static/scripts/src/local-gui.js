import React from "react";
import SettingsForm from "./settings-form";
import PortsInfo from "./ports-info";
import {getDataFromServer, submitData} from "./api";
import TopBar from "./top-bar";
import AgentIsDeadMessage from "./agent-is-dead-message";
import {createWebSocket} from "./utils";
import ErrorMessage from "./error-message";


class LocalGUI extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            backendAvailable: false,
            be_websocket_state: {status: false},
            attached_com_ports: Array(),
            configured_missing_com_ports: Array(),
            configured_com_ports: Array(),
            not_configured_com_ports: Array(),
            config_data: undefined,
            agentStatus: false,
            local_config: undefined,
            main_gui_connected: false,
        };
        this.processWebSocketMessage = this.processWebSocketMessage.bind(this);
        this.postUserData = this.postUserData.bind(this);
        this.setAgentStatus = this.setAgentStatus.bind(this);
        this.updateConfigData = this.updateConfigData.bind(this);
        this.releaseAllPorts = this.releaseAllPorts.bind(this);
        this.openAllPorts = this.openAllPorts.bind(this);
    }

    setAgentStatus(status) {
        this.setState({
            agentStatus: status
        });
    }

    processWebSocketMessage(msg) {
        const data = JSON.parse(msg.data);
        console.log(data);

        switch (data.action) {
            case "updateState":
                this.setState(data.variables);
                break;
            case "alert":
                alert(data.message);
                break;
            case "disconnect":
                this.webSocket.close();
                break;
        }
    }

    updateConfigData(data) {
        this.setState({
            configData: data
        });
    }

    componentDidMount() {
        this.webSocket = createWebSocket(
            window.location.hostname,
            window.location.port,
            this.processWebSocketMessage,
            this.setAgentStatus
        );
        getDataFromServer("/config", this.updateConfigData, console.log);
    }

    postUserData(event, data) {
        console.log(JSON.stringify(data));
        submitData("/config", JSON.stringify(data), this.updateConfigData);
        event.preventDefault();
    }

    releaseAllPorts() {
        console.log("release all ports");
        this.webSocket.send("release_all_ports");
    }

    openAllPorts() {
        this.webSocket.send("open_all_ports");
    }

    render() {
        if (!this.state.agentStatus) {
            return (
                <AgentIsDeadMessage/>
            );
        }
        else {
            return (
                <div className={"content"}>
                    <TopBar
                        isBackendConnected={this.state.be_websocket_state}
                        isGUIConnected={this.state.main_gui_connected}
                        releaseAllPorts={this.releaseAllPorts}
                        openAllPorts={this.openAllPorts}
                        activePorts={this.state.configured_com_ports}
                        // reconnect={this.reconnect}
                        // uploadLogs={this.uploadLogs}
                    />
                    <ErrorMessage
                        backendResponse={this.state.backend_response}
                    />
                    <div className={"is-divider"}/>
                    <div className={"columns"}>
                        <PortsInfo
                            configuredPorts={this.state.configured_com_ports}
                            configuredMissingPorts={this.state.configured_missing_com_ports}
                            notConfiguredPorts={this.state.not_configured_com_ports}
                            attachedPorts={this.state.attached_com_ports}
                        />
                        <SettingsForm
                            postUserData={this.postUserData}
                            localConfig={this.state.local_config}
                        />
                    </div>
                </div>
            );
        }
    }
}

export default LocalGUI;
