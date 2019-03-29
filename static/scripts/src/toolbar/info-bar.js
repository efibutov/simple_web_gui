import React from "react";

function InfoBar(props){
    const divClassName = "";

    return(
        <div className={divClassName}>
            <div className="tile is-ancestor">
                <div className="tile is-parent">
                    <article className="tile is-child notification is-info">
                        <div className="content">
                            <div className="field is-grouped">
                                <div>
                                    <span className={"icon"}>
                                        <ion-icon name={"desktop"}/>
                                    </span>
                                </div>
                                <div className={"field"}>
                                    <p className={"subtitle"}>
                                        Agent status
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}

export default InfoBar;