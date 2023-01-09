import Image from 'next/image'
import { IconProps } from 'phosphor-react';
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

type TagProps = 
| {
  text: string
  variant: "txt"
  }
| {
  text: string
  img_url: string
  variant: "txt-img"
}
| {
  text: string
  img_url: string
  variant: "img-txt"
}
| {
  img_url: string
  variant: "img"
}
| {
  text: string
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  variant: "txt-icn"
}
| {
  text: string
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  variant: "icn-txt"
}
| {
  text: string
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  variant: "icn-txt-xl"
}
| {
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  variant: "icn"
}


export const Tag = (props: TagProps) => {
  return (
    <div className={`bg-white ${props.variant !== 'icn-txt-xl' ? 'inline-block' : ''} rounded-full`}>
      <>
      {props.variant === "txt" && 
        <p className='flex row justify-center content-center items-center gap-[0.625rem] h-[2.5rem] px-[0.625rem] lg:h-[3.25rem] lg:px-3 lg:text-[1.25rem]'>
          {props.text}
        </p>
      }
      {props.variant === "txt-img" && 
        <div className='flex row justify-center content-center items-center gap-[0.5rem] h-[2.5rem] pr-[0.125rem] pl-[0.625rem] lg:h-[3.25rem] lg:pr-[0.1875rem] lg:pl-[0.75rem] lg:gap-[0.75rem]'>
          <p className='lg:text-[1.25rem]'>{props.text}</p>
          <Image className='h-[2.25rem] w-[2.25rem] rounded-full lg:h-[2.875rem] lg:w-[2.875rem]' src={props.img_url} width={100} height={100} alt=""/>
        </div>
      }
      {props.variant === "img-txt" && 
        <div className='flex row justify-center content-center items-center gap-[0.5rem] h-[2.5rem] pr-[0.625rem] pl-[0.125rem] lg:h-[3.25rem] lg:pr-[0.75rem] lg:pl-[0.1875rem] lg:gap-[0.75rem]'>
          <Image className='h-[2.25rem] w-[2.25rem] rounded-full lg:h-[2.875rem] lg:w-[2.875rem]' src={props.img_url} width={100} height={100} alt=""/>
          <p className='lg:text-[20px]'>{props.text}</p>
        </div>
      }
      {props.variant === "img" && 
        <Image className='h-[2.25rem] w-[2.25rem] rounded-full m-[0.125rem] lg:h-[2.875rem] lg:w-[2.875rem] lg:m-[0.1875rem]' src={props.img_url} width={100} height={100} alt=""/>
      }
      {props.variant === "txt-icn" && 
        <div className='flex row gap-[0.625rem] content-center justify-center items-center h-[2.5rem] px-[0.625rem] lg:text-[1.25rem] lg:px-3 lg:h-[3.25rem]'>
          <p className='lg:text-[1.25rem]'>{props.text}</p>
          <><props.icon className='w-[1.25rem] h-[1.25rem] lg:w-[1.5625rem] lg:h-[1.5625rem]'/></>
        </div>
      }
      {props.variant === "icn-txt" && 
        <div className='flex row gap-[0.625rem] content-center justify-center items-center h-[2.5rem] px-[0.625rem] lg:text-[1.25rem] lg:px-3 lg:h-[3.25rem]'>
          <><props.icon className='w-[1.25rem] h-[1.25rem] lg:w-[1.5625rem] lg:h-[1.5625rem]' /></>
          <p className='lg:text-[1.25rem]'>{props.text}</p>
        </div>
      }
      {props.variant === "icn-txt-xl" && 
        <div className='flex row gap-[0.625rem] content-center justify-start items-center h-[2.5rem] px-[0.625rem] lg:text-[1.25rem] lg:px-3 lg:h-[3.25rem]'>
          <><props.icon className='w-[1.25rem] h-[1.25rem] lg:w-[1.5625rem] lg:h-[1.5625rem]' /></>
          <p className='lg:text-[1.25rem]'>{props.text}</p>
        </div>
      }
      {props.variant === "icn" && 
        <div className='h-[2.875rem] w-[2.875rem] flex before:content-center justify-center items-center lg:h-[3.25rem] lg:w-[3.25rem]'>
          {<div className=''><props.icon className='w-[1.25rem] h-[1.25rem] lg:w-[1.5625rem] lg:h-[1.5625rem]' /></div>}
        </div>
      }
      </>
    </div>
  )
}

