import React,{cloneElement} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

// import { Container } from './styles';

function ActiveLink({children, ActiveClassName, ...rest}) {
 
     let exibe;
    const {asPath} = useRouter();
    const class_name = rest.href === asPath ? ActiveClassName : ''

     if(rest.pagina){
        exibe = rest.pagina
     }else{
        exibe = children
     }

  return(
      <Link {...rest} className={class_name}>
        {/* {cloneElement(children,{
           class_name
        })} */}
        {/* {rest.pagina} */}
        {exibe}
      </Link>
  );
}

export default ActiveLink;