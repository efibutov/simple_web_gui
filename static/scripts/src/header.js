import React from "react";

function Header(props){
    return(
        <div>
            <div className={"tile is-ancestor"}>
                <div className={"tile is-parent"}>
                    <article className={"tile is-child notification is-black"}>
                        <div className={"content"}>
                            <div>
                                <div className={"align-centre"}>
                                    <p className={"title"}>
                                        {"Agent configuration"}
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

export default Header;
