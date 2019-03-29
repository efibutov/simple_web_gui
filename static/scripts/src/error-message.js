import React from "react";

function ErrorMessage(props){
    const backendResponse = props.backendResponse;
    if(!backendResponse){
        return(
            <div/>
        );
    }
    else if(!backendResponse.status){
        return(
            <div>
                <div className={"is-divider"}/>
                <section className="hero is-dark is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Backend error
                            </h1>
                            <h2 className="subtitle">
                                {backendResponse.detail}
                            </h2>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
    else {
        return (
            <div/>
        );
    }
}

export default ErrorMessage;
