import React from "react";
import { NavItem, NavLink } from "shards-react";


function toggleAssistants() {
  console.log('Listening...')

  fetch('/startVoice');
}

export default class Assistant extends React.Component {
 


  render() {
    return (
        <NavItem className="border-right dropdown notifications text-center">
          <NavLink className="nav-link-icon text-center" onClick={toggleAssistants} >
            <div className="nav-link-icon__wrapper text-center">
              <span class="material-icons">
                  keyboard_voice
              </span>
            </div>
          </NavLink>
      </NavItem>
    );
  }
}
