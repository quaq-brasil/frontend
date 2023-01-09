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
        <p className='flex row justify-center content-center items-center gap-[10px] h-[40px] px-[10px] lg:h-[52px] lg:px-3 lg:text-[20px]'>
          {props.text}
        </p>
      }
      {props.variant === "txt-img" && 
        <div className='flex row justify-center content-center items-center gap-[8px] h-[40px] pr-[2px] pl-[10px] lg:h-[52px] lg:pr-[3px] lg:pl-[12px] lg:gap-[12px]'>
          <p className='lg:text-[20px]'>{props.text}</p>
          <Image className='h-[36px] w-[36px] rounded-full lg:h-[46px] lg:w-[46px]' src={props.img_url} width={100} height={100} alt=""/>
        </div>
      }
      {props.variant === "img-txt" && 
        <div className='flex row justify-center content-center items-center gap-[8px] h-[40px] pr-[10px] pl-[2px] lg:h-[52px] lg:pr-[12px] lg:pl-[3px] lg:gap-[12px]'>
          <Image className='h-[36px] w-[36px] rounded-full lg:h-[46px] lg:w-[46px]' src={props.img_url} width={100} height={100} alt=""/>
          <p className='lg:text-[20px]'>{props.text}</p>
        </div>
      }
      {props.variant === "img" && 
        <Image className='h-[36px] w-[36px] rounded-full m-[2px] lg:h-[46px] lg:w-[46px] lg:m-[3px]' src={props.img_url} width={100} height={100} alt=""/>
      }
      {props.variant === "txt-icn" && 
        <div className='flex row gap-[10px] content-center justify-center items-center h-[40px] px-[10px] lg:text-[20px] lg:px-3 lg:h-[52px]'>
          <p className='lg:text-[20px]'>{props.text}</p>
          <><props.icon className='w-[20px] h-[20px] lg:w-[25px] lg:h-[25px]'/></>
        </div>
      }
      {props.variant === "icn-txt" && 
        <div className='flex row gap-[10px] content-center justify-center items-center h-[40px] px-[10px] lg:text-[20px] lg:px-3 lg:h-[52px]'>
          <><props.icon className='w-[20px] h-[20px] lg:w-[25px] lg:h-[25px]' /></>
          <p className='lg:text-[20px]'>{props.text}</p>
        </div>
      }
      {props.variant === "icn-txt-xl" && 
        <div className='flex row gap-[10px] content-center justify-start items-center h-[40px] px-[10px] lg:text-[20px] lg:px-3 lg:h-[52px]'>
          <><props.icon className='w-[20px] h-[20px] lg:w-[25px] lg:h-[25px' /></>
          <p className='lg:text-[20px]'>{props.text}</p>
        </div>
      }
      {props.variant === "icn" && 
        <div className='h-[46px] w-[46px] flex before:content-center justify-center items-center lg:h-[52px] lg:w-[52px]'>
          {<div className=''><props.icon className='w-[20px] h-[20px] lg:w-[25px] lg:h-[25px' /></div>}
        </div>
      }
      </>
    </div>
  )
}

