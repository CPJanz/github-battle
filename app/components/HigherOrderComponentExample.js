import React from "react";

export default function withHover(Component, propName = "hovering") {
  return class WithHover extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        hovering: false
      };

      this.mouseOver = () => {
        this.setState({ hovering: true });
      };

      this.mouseOut = () => {
        this.setState({ hovering: false });
      };
    }

    render() {
      const props = {
        [propName]: this.state.hovering,
        ...props
      };

      return (
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <Component {...props} />
        </div>
      );
    }
  };
}
