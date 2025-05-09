import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {ArrowLeftIcon,ArrowRightIcon} from '@heroicons/react/16/solid'

const responsive = {
    0: { items: 1 },
    1024: { items: 3},
};
const category = [
    "Frontend Developer",
    "Backend Developer",
    "Graphic Designer",
    "FullStack Developer",
    "Backend Developer",
    "Graphic Designer",
    "FullStack Developer"
]

const items = category.map((item) => <button className='border-2 border-gray-100 py-2 px-3 rounded-full text-base font-semibold'>{item}</button>)
const nextButton = (
    <div className='absolute right-[-30px] top-5 -translate-y-1/2 z-10 bg-white   p-1 cursor-pointer'>
        <ArrowRightIcon className='h-6 w-6 text-black' />
    </div>
)
const prevButton = (
    <div className='absolute left-[-50px] top-5 -translate-y-1/2 z-10 bg-white  p-1 cursor-pointer'>
        <ArrowLeftIcon className='h-6 w-6 text-black' />
    </div>
)

const CategoryCarousel = () => {
    return (
        <div>
            <div className='relative w-full max-w-xl mx-auto my-5   '>
                <AliceCarousel
                mouseTracking
                items={items}
                infinite
                autoPlay
                animationDuration={1000}
                disableDotsControls
                responsive={responsive}
                controlsStrategy="alternate"
                renderPrevButton={() => prevButton}
                renderNextButton={() => nextButton}
            />
            </div>
        </div>
    )
}

export default CategoryCarousel