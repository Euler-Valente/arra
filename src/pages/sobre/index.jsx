import React from 'react';

import Scss from './sobre.module.scss';

import Head from 'next/head';
import {getPrismicClient} from '../../services/prismic';
import {RichText} from 'prismic-dom';

import Prismic from '@prismicio/client';
import {
    FaYoutube,
    FaInstagram,
    FaLinkedin,
    FaFacebook
} from 'react-icons/fa'

function Sobre({content}) {

   console.log('----BORA VE NE------')
     console.log(content)
   console.log('----BORA VE NE------')



  return(
      <div>
          <Head>
              <title>Quem somos | sujeito programador</title>
          </Head>

          <main className={Scss.container}>
              <div className={Scss.containerheader}>
                  <section className={Scss.CTAtext}>
                     <h1>{content.title}</h1>
                     <p>{content.description}</p>

                     <a href={content.youtube}>
                       <FaYoutube size={40}/>
                     </a>

                     <a href={content.instagram}>
                       <FaInstagram size={40}/>
                     </a>

                     <a href={content.facebook}>
                       <FaFacebook size={40}/>
                     </a>

                     <a href={content.linkedin}>
                       <FaLinkedin size={40}/>
                     </a>
                  </section>

                  <img 
                   src={content.banner} 
                   alt="Sobre Sujeito Programador" 
                   />
              </div>

          </main>
      </div>
  );
}

export default Sobre;

export async function getStaticProps(){


    const prismic = getPrismicClient();

    const response = await prismic.query([
        Prismic.Predicates.at("document.type", "about")
    ])

    const {
       
       title,
       description,
       banner,
       facebook,
       instagram,
       youtube,
       linkedin
    } = response.results[0].data;



    
    const content = {
        uid:response.results[0].uid,
        title,
        description:RichText.asText(description),
        banner:banner.url,
        facebook:facebook.url,
        instagram:instagram.url,
        youtube:youtube.url,
        linkedin:linkedin.url
    }
    

    return{
        props:{
            content
        },
        revalidate:60
    }
}