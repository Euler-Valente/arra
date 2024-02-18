'use client'

import { useRouter } from 'next/router';
import React,{useState,useEffect} from 'react';
import Head from 'next/head';

import Link from 'next/link';
import Image from 'next/image';

import thumbing from '../../../public/images/thumb.png';

import {
    FiChevronLeft, 
    FiChevronsLeft, 
    FiChevronRight,
    FiChevronsRight
  } from 'react-icons/fi'


import Scss from './Posts.module.scss';

import FetchPosts from '../../hooks/FetchPosts';

import {getPrismicClient} from '../../services/prismic';
import Prismic from '@prismicio/client';

export default function Posts({recebido,crua,totaPage,page,unico,numerola}) {

  const [currentPage,setCurrentPage] = useState(page)
  const [post,setPost] = useState(recebido || [])
  const [liga,setLiga] = useState(false);

  const router = useRouter();

  // console.log('--- AGORA PIA PAI----')
  // console.log(unico)
  // console.log('--- AGORA PIA PAI----')

  // console.log('')

  // console.log('::: XUPA ESSSE DROPS :::')
  // console.log(numerola)
  // console.log('::: XUPA ESSSE DROPS :::')


  async function reqPostagem(paginaAtual){

  const prismica = getPrismicClient();

  const response = await prismica.query([
    Prismic.Predicates.at('document.type', "postagem")
  ],{
    orderings:'[document.last_publication_date desc]',
        fetch:['postagem.title', 'postagem.description', 'postagem.cover'],
        pageSize:2,
        page:paginaAtual
  }) 

  return response

  }

  async function NavigatePage(pageNumber){
    const response = await reqPostagem(pageNumber) 

    if(response.results.length === 0){
         return
    }

    const recebido = response.results.map((post)=>{
      return {
        slug:post.uid,
        title:post.data.title,
        // description:post.data.description.find((conteudo)=>conteudo.type === 'paragraph')?.text ?? 'nao achou ehehehe',
        description:post.data.description.find((conteudo)=>conteudo.text !== '')?.text ?? 'nao achou ehehehe',

        cover:post.data.cover.url,
        updatedAt:new Date(post.last_publication_date).toLocaleDateString('pt-BR',{
          day: '2-digit',
          month: 'long',
          year:'numeric'
        })
      }
    })

    setCurrentPage(pageNumber)
    setPost(recebido)

  }

  // useEffect(()=>{
  //    console.log('--EULER HENRIQUE PINTO--')
  //    console.log(numerola)
  //    console.log('--EULER HENRIQUE PINTO--')

  // },[numerola])

  return(
      <div>
          <Head>
              <title>Blog | Sujeito Programador</title>
          </Head>

            <main className={Scss.container}>
                <div className={Scss.posts}>

                     {post.map((postUnico)=>(
                        //   <Link href={{
                        //     pathname: `/posts/${postUnico.slug}`,
                        //     query: { name: JSON.stringify(postUnico) },
                        //   }}  key={postUnico.slug} state={{ blogPost: postUnico }} state={{registro:postUnico}}>

                        //   <Image 
                        //     src={postUnico.cover}
                        //     alt={postUnico.title}
                        //     width={720} 
                        //     height={410} 
                        //     quality={100}
                        //     placeholder="blur"
                        //     blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+K9ZDwAD2AGpO9cD1QAAAABJRU5ErkJggg=="
                        //   />
                        //   <strong>{postUnico.title}</strong>
                        //   <time>{postUnico.updatedAt}</time>
                        //   <p>
                        //   {postUnico.description}
                        //   </p>
                        // </Link>

                        // 
                        
                        <Link 
                          href={{
                            pathname:`/posts/${postUnico.slug}`,
                            state:postUnico
                          }}  
                          key={postUnico.slug}
                           onClick={(e)=>{
                             e.preventDefault();
                            //  alert('__redirecionando...')
                            // router.push(`/`, { state: postUnico })
                           }}
                          >

                        <Image 
                          src={postUnico.cover}
                          alt={postUnico.title}
                          width={720} 
                          height={410} 
                          quality={100}
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+K9ZDwAD2AGpO9cD1QAAAABJRU5ErkJggg=="
                        />
                        <strong>{postUnico.title}</strong>
                        <time>{postUnico.updatedAt}</time>
                        <p>
                        {postUnico.description}
                        </p>
                      </Link>
                     ))}                    

                   <div className={Scss.buttonAvigate}>
                       
                       {/* {currentPage >1 && (
                            <div>
                                <button onClick={()=>NavigatePage(1)}>
                                  <FiChevronsLeft size={25} color="#FFF"/>
                                </button>
                                <button onClick={()=>NavigatePage(currentPage-1)}>
                                  <FiChevronLeft size={25} color="#FFF"/>
                                </button>
                            </div>
                       )}
                      
                        {currentPage < Number(totaPage) && (
                              <div>
                                  <button onClick={()=>NavigatePage(currentPage+1)}>
                                    <FiChevronRight size={25} color="#FFF"/>
                                  </button>
                                  <button onClick={()=>NavigatePage(totaPage)}>
                                    <FiChevronsRight size={25} color="#FFF"/>
                                  </button>
                              </div>
                        )}      */}


                       
                            <div>
                              <div style={{display: currentPage >1 ? 'block' : 'none'}}>
                              <button onClick={()=>NavigatePage(1)}>
                                  <FiChevronsLeft size={25} color="#FFF"/>
                                </button>
                                <button onClick={()=>NavigatePage(currentPage-1)}>
                                  <FiChevronLeft size={25} color="#FFF"/>
                                </button>
                              </div>
                                
                            </div>
                      
                      
                        
                              <div>
                                    <div style={{display: currentPage < Number(totaPage) ? 'block' : 'none'}}>
                                    <button onClick={()=>NavigatePage(currentPage+1)}>
                                    <FiChevronRight size={25} color="#FFF"/>
                                  </button>
                                  <button onClick={()=>NavigatePage(totaPage)}>
                                    <FiChevronsRight size={25} color="#FFF"/>
                                  </button>
                                    </div>
                                  
                              </div>
                      
                        
                      

                   </div>

                </div>
            </main>
            <button onClick={()=>setLiga(!liga)}>
              Arrocha
            </button>
      </div>
  );
}

// export default Posts;

export const {Manda} = FetchPosts();


export const getStaticProps = async ()=>{

   const numero_aleatorio = Math.random()

  //  console.log('--UNIC KEY--')
  //  console.log(numero_aleatorio)
  //  console.log('--UNIC KEY--')

 
  const {recebido,response} = await Manda()

 return {
     props:{
      recebido,
      crua:response,
      page:response.page,
      totaPage:response.total_pages,
      unico:numero_aleatorio
     },
     revalidate: 80
 }


}


