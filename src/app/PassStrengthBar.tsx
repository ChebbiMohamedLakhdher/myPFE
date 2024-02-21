import {cn} from '@nextui-org/react';

interface Props {
    strength: 0 | 1 | 2 | 3;
}
export default function PassStrengthBar({strength}:Props) {
    return(
        <div className='flex gap-2'>
           {Array.from({ length: strength + 1 }).map((i, index) => (
           <div
              key={index}
              className={cn('h-2 w-32 rounded-md', {
                   'bg-red-500': strength === 0,
                   'bg-orange-500': strength === 1,
                   'bg-yellow-500': strength === 2,
                   'bg-green-600': strength === 3,
              })}></div>
           ))}  

        </div>
    );

}