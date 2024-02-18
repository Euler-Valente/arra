import Head from "next/head";
import Scss from '../styles/Home.module.scss';

import Image from "next/image";
import TechImage from '../../public/images/techs.svg';

import {getPrismicClient} from '../services/prismic';
import Prismic from '@prismicio/client';

import FetchStatic from '../hooks/FetchStatic';
import { useRouter } from 'next/router';


// import {RitchText} from '@prismicio/client';

export default function Home({content}) {

  
 
  // const content = {
  //   title: response.results[0].data.title,
  //   subtitleContent:response.results[0].data.sub_title[0].text,
  //   link:response.results[0].data.link_action.url,
  //   mobile:response.results[0].data.mobile,
  //   mobile_content:mobile_content[0].text,
  //   mobile_banner:mobile_banner.url,
  //   title_web:title_web,
  //   web_content:web_content[0].text,
  //   web_banner:web_banner.url
 
 
  // }

  const local = useRouter();

  const estado = local.state;


  // console.log(':: [STATE THAT]  ::')
  // console.log(local)
  // console.log(':: [STATE THAT]  ::')

  return (
    <div>

      <Head>
         <title>Apaixonado por tecnologia - sujeito programador</title>
      </Head>

      <main className={Scss.container}>

        <div className={Scss.containerHead}>
           <section className={Scss.CTAText}>
                <h1>{content.title}</h1>

                <span>
                {content.subtitleContent}
                </span>

                <a href={content.link}>
                  <button>
                     COMEÇAR AGORA
                  </button>
                </a>
                

           </section>

                <img 
                    src="/images/banner-conteudos.png"
                    alt="conteudo sujeito programador"
                 />
        </div>

          <hr className={Scss.divisor}/>

          <div className={Scss.sectionContent}>
             <section>
               <h2>{content.mobile}</h2>
               <span>
               {content.mobile_content}
               </span>
             </section>

             <img 
               src={content.mobile_banner} 
               alt="conteudos mobile desenvolvimnto de app"
               />

          </div>

          <hr className={Scss.divisor}/>


          <div className={Scss.sectionContent}>

             <img 
               src={content.web_banner} 
               alt="conteudos mobile desenvolvimnto de aplicação web"
            />

             <section>
               <h2>{content.title_web}</h2>
               <span>
                 {content.web_content}
               </span>
             </section>             
          </div>
         
         <div className={Scss.otherContent}>
           <Image
             src={TechImage}
             alt="Technologies.."
           />
           <h2>Mais de <span className={Scss.alunos}>15 mil</span> ja alavancaram suas carreiras ao proximo level</h2>
             <span>
               E você vai ter a chance de evoluir de uma vez por todas..               
             </span>

             <a href={content.link}>
               <button>ASSESSAR TURMA</button>
             </a>

         </div>
                  
      </main>
    </div>
  );
}


export const {fetcha} = FetchStatic()

export const getStaticProps = async ()=>{

  const content = await  fetcha()
    
    return(
      {
        props:{
          content
        },
        revalidate: 60
      }
      
    )
  
  }


// export const getServerSideProps = async ()=>{

//   const content = await  fetcha()
    
//     return{
//       props:{
//         content
//       },
//       revalidate: 60
//     }
      
     
    
  
//   }
