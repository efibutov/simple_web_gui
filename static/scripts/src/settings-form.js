import React from "react";
import _ from 'lodash';


class SettingsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            localConfig: props.localConfig ? JSON.parse(JSON.stringify(props.localConfig)) : undefined,
            editing: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetSettings = this.resetSettings.bind(this);
    }

    handleSubmit(event) {
        this.props.postUserData(event, this.state.localConfig);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.editing) {
            return;
        }
        if (!_.isEqual(this.state.localConfig, nextProps.localConfig)) {
            this.setState({
                localConfig: nextProps.localConfig ? JSON.parse(JSON.stringify(nextProps.localConfig)) : undefined
            });
        }
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if(this.state.editing) {
    //         return false;
    //     }
    //     else {
    //         return true;
    //     }
    // }

    handleChange(key, event) {
        const localConfig = this.state.localConfig;
        localConfig[key] = event.target.value;

        this.setState({
            localConfig: localConfig,
            editing: true
        });
    }

    resetSettings(event) {
        this.setState({
            localConfig: this.props.localConfig ? JSON.parse(JSON.stringify(this.props.localConfig)) : undefined,
            editing: false
        });
        event.preventDefault();
    }

    render() {
        if (!this.state.localConfig) {
            return (
                <div className={"box"}>
                    Waiting for settings...
                </div>
            );
        }

        return (
            <div className={"column"}>
                <div
                    className={"box"}
                >
                    <form onSubmit={this.handleSubmit}>
                        <h2>
                            Settings
                        </h2>

                        <div className={"field is-horizontal"}>
                            <div className="field-label is-normal">
                                <label className={"label"}>{"Backend URL"}</label>
                            </div>

                            <div className="field-body">
                                <div className="field">
                                    <input
                                        className={"input"}
                                        type={"text"}
                                        value={this.state.localConfig.backend_url}
                                        onChange={(e) => this.handleChange("backend_url", e)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={"field is-horizontal"}>
                            <div className="field-label is-normal">
                                <label className={"label"}>{"Backend port"}</label>
                            </div>
                            <div className={"field-body"}>
                                <div className="field">
                                    <input
                                        className={"input"}
                                        type={"text"}
                                        value={this.state.localConfig.backend_port}
                                        onChange={(e) => this.handleChange("backend_port", e)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={"field is-horizontal"}>
                            <div className="field-label is-normal">
                                <label className={"label"}>{"App name"}</label>
                            </div>
                            <div className={"field-body"}>
                                <div className="field">
                                    <input
                                        className={"input"}
                                        type={"text"}
                                        value={this.state.localConfig.app_name}
                                        onChange={(e) => this.handleChange("app_name", e)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={"field is-horizontal"}>
                            <div className="field-label is-normal">
                                <label className={"label"}>{"Group name"}</label>
                            </div>
                            <div className={"field-body"}>
                                <div className="field">
                                    <input
                                        className={"input"}
                                        type={"text"}
                                        value={this.state.localConfig.group_name}
                                        onChange={(e) => this.handleChange("group_name", e)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={"field is-horizontal"}>
                            <div className="field-label is-normal">
                                <label className={"label"}>{"Station name"}</label>
                            </div>
                            <div className={"field-body"}>
                                <div className="field">
                                    <input
                                        className={"input"}
                                        type={"text"}
                                        value={this.state.localConfig.station_name}
                                        onChange={(e) => this.handleChange("station_name", e)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={"field is-horizontal"}>
                            <div className="field-label is-normal">
                                <label className={"label"}>{"License"}</label>
                            </div>
                            <div className={"field-body"}>
                                <div className="field">
                                    <input
                                        className={"input"}
                                        type={"text"}
                                        value={this.state.localConfig.license_hash}
                                        onChange={(e) => this.handleChange("license_hash", e)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="field is-grouped is-grouped-right">
                            <p className="control">
                                <button
                                    className={"button is-link"}
                                    onClick={this.handleSubmit}
                                    disabled={_.isEqual(this.state.localConfig, this.props.localConfig)}
                                >
                                    {"Save"}
                                </button>
                            </p>
                            <p className="control">
                                <button
                                    className={"button is-light"}
                                    onClick={this.resetSettings}
                                    disabled={_.isEqual(this.state.localConfig, this.props.localConfig)}
                                >
                                    {"Cancel"}
                                </button>
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

export default SettingsForm;