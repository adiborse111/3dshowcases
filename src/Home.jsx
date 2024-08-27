import { Link } from "react-router-dom";

const Home = () => {
    return (
      <div>
          <h1 className='ml-2'>3D Showcases</h1>
          <div className='p-4 flex flex-col underline'>
              <Link to={'https://qr-code-component-dun-beta.vercel.app/'}>Qr Code Component</Link>
              <Link to={'https://social-links-profile-main-ebon.vercel.app/'}>Social Links Profile</Link>
              <Link to={'https://blog-preview-card-main-khaki-eta.vercel.app/'}>Blog Preview Card</Link>
              <Link to={'https://recipe-page-main-smoky.vercel.app/'}>Recipe Page</Link>
              <Link to={'/BasicDemo'}>Basic Demo</Link>
              <Link to={'/ViewCube'}>View Cube</Link>
              <Link to={'/SimplePhysics'}>Simple Physics</Link>
          </div>
      </div>
    )
  }
  
  export default Home