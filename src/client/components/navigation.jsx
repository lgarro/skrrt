import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

type NavItem = {
    path: string,
    name: string,
}

type Props = {
    items: Array<NavItem>
}

const Navigation = (props: Props) => (
    <nav>
        <ul>
            {props.items.map(navItem =>
                (
                    <NavigationItem key={`navitem-${navItem.name}`}>
                        <NavLink key={`navlink-${navItem.path}`} to={navItem.path}>{navItem.name}</NavLink>
                    </NavigationItem>))}
        </ul>
    </nav>
)

export default Navigation

const NavigationItem = styled.li`
background-color: #e6f7ff;
`

