import React from 'react';
import { Link } from 'react-router-dom'

class Nav extends React.Component {

    render() {
        return (
            <div>
                <ul>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/chat'>Chat</Link></li>
                    <li><Link to='/user'>User</Link></li>
                    <li><Link to='/simulator'>Simulator</Link></li>
                </ul>
            </div>
        );
    }

}

export default Nav;
