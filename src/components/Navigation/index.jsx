import React from 'react'
import styled from 'styled-components'
import Headroom from 'react-headroom'
import { Link } from 'react-router-dom'
import Logo from '../../uplift-agency-logo.png'

const StyledHeadroom = styled(Headroom)`
  headroom-wrapper {
    position: fixed;
    width: 100%;
    z-index: 2000;
  }
  .headroom {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 1rem 1.5rem;
    svg {
      height: 2.5rem;
      g {
        fill: white;
      }
    }
  }
  .headroom--unfixed {
    position: relative;
    transform: translateY(0);
    transition: all 0.25s ease-in-out 0s;
  }
  .headroom--scrolled {
    transition: all 0.25s ease-in-out 0s;
  }
  .headroom--unpinned {
    position: fixed;
    transform: translateY(-100%);
    transition: all 0.25s ease-in-out 0s;
  }
  .headroom--pinned {
    position: fixed;
    transform: translateY(0);
    transition: all 0.25s ease-in-out 0s;
    background-color: white;
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
    nav {
      a {
        color: black;
        &:hover {
          border-color: black;
          color: black;
        }
        &:focus {
          color: black;
        }
      }
    }
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    svg {
      height: 2.5rem;
      g {
        fill: black;
      }
    }
    span {
      color: black;
    }
  }
`

const StyledLink = styled(Link)`
  display: flex;
  font-weight: 700;
  align-items: center;
  img {
    height: 2.5rem;
    margin-bottom: 0;
  }
`

const NavMenu = () => (
  <div>
    <StyledHeadroom calcHeightOnResize disableInlineStyles>
      <StyledLink to="/">
        <img src={Logo} alt="Uplift Agency - Rocket Logo" />
      </StyledLink>
    </StyledHeadroom>
  </div>
)

export default NavMenu
