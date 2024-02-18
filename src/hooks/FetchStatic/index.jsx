import React from 'react';
import Prismic from '@prismicio/client';
import {getPrismicClient} from '../../services/prismic';

// import { Container } from './styles';

function FetchStatic() {
   
   async function fetcha(){

    const prismic = getPrismicClient();
  
   const response = await prismic.query([
     Prismic.Predicates.at("document.type", 'frontline')
   ])
  
    
    
   const { 
     title,
     sub_title,
     link_action,
     mobile,
     mobile_content,
     mobile_banner,
     title_web,
     web_content,
     web_banner
   } = response.results[0].data;
  
  
      
  
   const content = {
     title: response.results[0].data.title,
     subtitleContent:response.results[0].data.sub_title[0].text,
     link:response.results[0].data.link_action.url,
     mobile:response.results[0].data.mobile,
     mobile_content:mobile_content[0].text,
     mobile_banner:mobile_banner.url,
     title_web:title_web,
     web_content:web_content[0].text,
     web_banner:web_banner.url
  
  
   }


  // const content = {
  //   title: response.results[0].data.title,
  //   subtitleContent:response.results[0].data.sub_title[0].text,
  //   link:response.results[0].data.link_action.url,
  //   mobile:response.results[0].data.mobile,
  //   mobile_content:response.results[0].data.mobile_content[0].text,
  //   mobile_banner:response.results[0].data.mobile_banner.url,
  //   title_web:response.results[0].data.title_web,
  //   web_content:response.results[0].data.web_content[0].text,
  //   web_banner:response.results[0].data.web_banner.url
 
 
  // }
  
     
  //  console.log('_____ :: ENCRENCA :: _____')
  //  console.log(content)
  //  console.log('_____ ::: ENCRENCA ::: _____')

     return content
  }

   
   return {fetcha}
}

export default FetchStatic;