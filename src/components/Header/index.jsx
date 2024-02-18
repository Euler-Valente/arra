import React from 'react';
import {useRouter} from 'next/router'
// import styles from './Main.module.scss';

import Image from 'next/image';
import Head  from 'next/head';
import Css from './Header.module.css';

import logo from '../../../public/images/logo.svg';
import Link from 'next/link';

import ActiveLink from '../ActiveLink';

function Header() {

    const {asPath} =  useRouter() 

    
  return(
      <header className={Css.headerContainer}>

          <div className={Css.headerContent}>

          <ActiveLink ActiveClassName={Css.active} href="/">
                <Image src={logo} alt="imagem logo do sujeito programador" />                
          </ActiveLink>

             <nav>
                {/* <Link href="/" className={asPath === '/' ? Css.active : ''}>
                    Home
                </Link>

                <Link href="/posts" className={asPath === '/posts' ? Css.active : ''}>
                    Conteudos
                </Link>

                <Link href="/sobre" className={asPath === '/sobre' ? Css.active : ''}>
                    Quem Somos?
                </Link> */}

               <ActiveLink ActiveClassName={Css.active} href="/" pagina="Home">
                   {/* <p>Home</p> */}
               </ActiveLink>

               <ActiveLink ActiveClassName={Css.active} href="/posts" pagina="Conteudo">
                   {/* <p>Conteudo</p> */}
               </ActiveLink>

               <ActiveLink ActiveClassName={Css.active} href="/sobre" pagina="Quem Somos?">
                   {/* <p>Quem Somos</p> */}
               </ActiveLink>

             </nav>

             <a 
              className={Css.readyButton}
              type="button" 
              href="https://sujeitoprogramador.com"
              >
                  COMEÇAR
              </a>

          </div>

      </header>
  );
}

export default Header;