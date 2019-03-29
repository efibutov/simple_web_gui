import React from "react";

function AgentIsDeadMessage(props) {
    return (
        <section className={"hero is-medium is-dark is-bold is-fullheight"}>
            <div className={"hero-body"}>
                <div className={"container"}>
                    <h1 className={"title"}>
                        {"The Agent is not responding"}
                    </h1>
                    <h2 className={"subtitle"}>
                        {"Check list of processes on the station"}
                    </h2>
                        {}
                </div>
            </div>
        </section>
    );
}

export default AgentIsDeadMessage;