import React from "react";


function Reconnect(props){
    return(
        <div className={"control tooltip is-tooltip-bottom"}
             data-tooltip={"Try to connect"}
        >
            <button className={"button is-rounded"} onClick={props.reconnect}>
                <span className={"icon"}>
                    <ion-icon name={"refresh"}/>
                </span>
            </button>
        </div>
    )
}

export default Reconnect;
