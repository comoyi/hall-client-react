import React from 'react';
import { Link } from 'react-router-dom'

class Nav extends React.Component {

    render() {
        return (
            <div>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/chat'>Chat</Link></li>
                    <li><Link to='/user'>User</Link></li>
                </ul>
            </div>
        );
    }

}

export default Nav;
