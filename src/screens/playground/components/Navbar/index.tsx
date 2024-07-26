import '../../index.scss';
import logo from '../../../../assets/code.png';
import { Link } from 'react-router-dom'

interface NavChildren {
  isFullscreen: boolean;
}

const Navbar: React.FC<NavChildren> = ({ isFullscreen }) => {
  console.log(isFullscreen);

  return (
    <div className={`navbar-container ${isFullscreen} ? 'fullscreen' : ''`}>
      <Link to='/' className="navbar-content" >
        <img className="logo"
          src={logo}
          alt="Playground"
          height={60} width={70}
          loading="lazy" />
        <span className="main-heading">
          DEVPEN
        </span>
      </Link>
    </div>
  )
}

export default Navbar;