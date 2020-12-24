import React from "react";

import "./Feedback.css";

class Feedback extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: true
        };

        this.handleClose = this.handleClose.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevMessage =
            prevProps.message == null ? null : prevProps.message.text;
        const newMessage =
            this.props.message == null ? null : this.props.message.text;

        if (newMessage !== prevMessage) {
            this.setState((state, props) => {
                return {
                    isActive: true
                };
            });
        }
    }

    handleClose() {
        this.setState((state, props) => {
            return {
                isActive: false
            };
        });
    }

    render() {
        const message = this.props.message;

        if (message == null || this.state.isActive === false) {
            return <div className="Feedback Feedback-is-hidden"></div>;
        }

        let classNameText = ["Feedback-text"];

        switch (message.type) {
            case "error": {
                classNameText.push("Feedback-text--error");

                break;
            }
            case "success": {
                classNameText.push("Feedback-text--success");

                break;
            }
            case "warning": {
                classNameText.push("Feedback-text--warning");

                break;
            }
            case "info":
            default: {
                classNameText.push("Feedback-text--info");
            }
        }

        return (
            <div className="Feedback">
                <h2 className={classNameText.join(" ")}>
                    {message.text}{" "}
                    <button
                        className="Feedback-button-close"
                        onClick={this.handleClose}
                        title="Close dialog"
                    >
                        X
                    </button>
                </h2>
            </div>
        );
    }
}

export default Feedback;
