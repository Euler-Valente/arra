// 'use client';

import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/router';


import Scss from './detail.module.scss';

import {getPrismicClient} from '../../services/prismic';
import {RichText} from 'prismic-dom';
import Head from 'next/head';
import Image from 'next/image';


function PostDetail({le_posttita}) {   
    
    
    const local = useRouter();
     
    
    const objetificado = local.query.name;

    // console.log('-- ALL COME CLOSE TO SEE-')
    // console.log(local)
    // console.log('-- ALL COME CLOSE TO SEE-')


    // console.log('**** SHOWING IN FRONT-END ******')
    // console.log(le_posttita)
    // console.log('**** SHOWING IN FRONT-END ******')


  



    const [liga,setLiga] = useState(false)
  

  return(
      <div>

         <Head>
             <title>{le_posttita.title}</title>
         </Head>

         <main className={Scss.container}>

              <article className={Scss.post}>
                 <Image
                  src={le_posttita.cover}
                  width={720}
                  height={410}
                  alt={le_posttita.title}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+K9ZDwAD2AGpO9cD1QAAAABJRU5ErkJggg=="
                  quality={100}
                 />
                 <h1>{le_posttita.title}</h1>
                 <time>{le_posttita.updatedAt}</time>

                 <div 
                   className={Scss.postContent} 
                   dangerouslySetInnerHTML={{__html:le_posttita.description}}
                   >

                 </div>

              </article>

         </main>
          
      </div>
  );
}

export default PostDetail;


export const getServerSideProps = async ({req,params})=>{
    
    const numerola = Math.random()


    const {slug} = params
    
    const prismaca = getPrismicClient(req)
    const response = await prismaca.getByUID('postagem', slug, {})

    
    if(!response){
        
        return{
            redirect:{
                destination:'/posts',
                permanent:false
            },
            
            
        }
    }

    // console.log('::: CONSOLIDADO COMO ::')
    // console.log(response.data)
    // console.log('::: CONSOLIDADO COMO ::')

    // console.log('** *** *** **')
    // console.log('** *** *** **')
   
    // console.log(' [[ FROM CLIENT COMPONENT ]]')
    // console.log(RichText)
    // console.log('[[ FROM CLIENT COMPONENT ]]')

   const postagem = {
       slug:slug,
       title:response.data.title,
       description:RichText.asHtml(response.data.description),
       cover:response.data.cover.url,
       updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR',{
           day:'2-digit',
           month:'long',
           year:'numeric'
       })     
   } 

    return {
      props:{    
       le_posttita:postagem
      }
    }
}