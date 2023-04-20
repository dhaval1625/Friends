import { Component } from "react";

class ErrorBoundary extends Component{
    constructor() {
        super();
        this.state = {
            hasError: false
        }
    }

    componentDidCatch(err) {
        this.setState({hasError: true});
        console.error(err.message);
    }

    render() {
        if(this.state.hasError) return <p>Something went wrong!</p>

        return this.props.children
    }
}

export default ErrorBoundary;