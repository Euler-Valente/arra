import React from 'react';

import {getPrismicClient} from '../../services/prismic';
import Prismic from '@prismicio/client';

// import { Container } from './styles';

function FetchPosts() {

 const Manda = async ()=>{
  
    const prismica = getPrismicClient();

    const response = await prismica.query([
        Prismic.Predicates.at('document.type','postagem')
        
    ],{
        orderings:'[document.last_publication_date desc]',
        fetch:['postagem.title', 'postagem.description', 'postagem.cover'],
        pageSize:2
    })
  
    // const response = await prismica.query([
    //     Prismic.Predicates.at('document.type','postagem')
        
    // ])
  
  
    // console.log('______LOAG_______')
    // console.log(JSON.stringify(response,null,2))
    // console.log('______LOAG_______')

    console.log('______LOAG_______')
    console.log(JSON.stringify(response))
    console.log('______LOAG_______')
  
    const recebido = response.results.map((post)=>{
      return {
        slug:post.uid,
        title:post.data.title,
        description:post.data.description.find((conteudo)=>conteudo.type === 'paragraph')?.text ?? 'nao achou ehehehe',
        // description:post.data.description[0].text,
        // description:post.data.description.find((posta)=>posta.text !== '')?.text ?? '',


        cover:post.data.cover.url,
        updatedAt:new Date(post.last_publication_date).toLocaleDateString('pt-BR',{
          day: '2-digit',
          month: 'long',
          year:'numeric'
        })
      }
    })
  
    // console.log('______FOTO_LOAG_______')
    // console.log(response.results[0].data)
    // console.log('______FOTO_LOAG_______')
  
    // console.log('______HEY HEY HEY_______')
    // console.log(recebido)
    // console.log('______HEY HEY HEY_______')

    
    return {recebido,response}

  }

  return {Manda}
}

export default FetchPosts;