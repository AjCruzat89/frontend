import React, {useEffect} from 'react'
import '../assets/css/dashboardNavbar.css';

const dashboardNavbar = () => {
  useEffect(() => {
    const navbarButton = document.querySelector('.fa-bars');
    const sidebar = document.querySelector('#dashboardSidebar');
    const closeButton = document.querySelector('.fa-xmark');
    const sidebarToggle = () => {
      if(window.screen.width < 992){
        sidebar.classList.toggle('d-none');
        sidebar.classList.toggle('d-flex');
        navbarButton.style.marginLeft = (sidebar.classList.contains('d-flex') ? '300px' : '0px');
      }
    }

    const closeButtonToggle = () => {
        sidebar.classList.toggle('d-flex');
        sidebar.classList.toggle('d-none');
    }

    navbarButton.addEventListener('click', sidebarToggle);
    closeButton.addEventListener('click', sidebarToggle);

    return () => {
      navbarButton.removeEventListener('click', sidebarToggle);
      closeButton.removeEventListener('click', sidebarToggle);
    };
  }, [])
  return (
    <nav className='navbar position-fixed'>
      <i class="d-flex d-lg-none fa-solid fa-bars"></i>
      <div></div>
      <div id='imageBox'>
        <img src="https://media.tenor.com/joIvx64-654AAAAj/luffy-ruffy.gif" alt="" />
      </div>
    </nav>
  )
}

export default dashboardNavbar