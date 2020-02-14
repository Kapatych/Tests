import React, {Component} from "react";
import classes from './Layout.module.css'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Menu from "../../components/Navigation/Menu/Menu";

export default class Layout extends Component{

    state = {
        isMenuOpen: false,
    };

    onToggleHandler = () => {
      this.setState(state => {
         return {isMenuOpen: !state.isMenuOpen}
      })
    };

    render() {
        return(
            <div className={classes.layout}>

                <Menu isOpen={this.state.isMenuOpen}
                      onClose={this.onToggleHandler}/>

                <MenuToggle isOpen={this.state.isMenuOpen}
                            onToggle={this.onToggleHandler}/>

                <main>{this.props.children}</main>
            </div>
        )
    }
}