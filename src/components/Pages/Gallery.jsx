import React from 'react';
import img from './Gallery_img';
import img2 from './Gallery_img_2';

import "./Gallery.css"
const Gallery = () => {
    return (
        <>
            <div class="about-section">
                <h1 class="about-title">Gallery <span>Blog</span></h1>
            </div>
            <div className='grid md:grid-cols-3 auto-rows-[300px] gap-4 my-10 overflow-hidden'>
                {img.map((val, indx) => (
                    <div key={indx} className={`bg-neutral-100 border-2 rounded-xl flex flex-col items-center justify-center ${indx === 3 || indx === 6 ? 'md:col-span-2' : ''}`}>
                        <img src={val.img} alt="" className='rounded-xl' />
                    </div>
                ))}
            </div>

            <div className='grid md:grid-cols-4 auto-rows-[300px] gap-4 my-10'>
                {img2.map((val, indx) => (
                    <div key={indx} className={`bg-neutral-100 border-2 rounded-xl flex flex-col items-center justify-center ${indx === 0 || indx === 4 || indx === 5 || indx === 6 ? 'md:col-span-2' : ''} ${indx === 2 ? 'md:row-span-2' : ''}`}>
                        <img src={val.img} alt="" className='rounded-xl' />
                    </div>
                ))}
            </div>


        </>
        // <>
        //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        //         <div className="card">
        //             <img src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="card-img-top" alt="..." />
        //             <div className="card-body">
        //             </div>
        //         </div>
        //         <div className="card p-3">
        //             <blockquote className="blockquote mb-0 card-body">
        //             </blockquote>
        //         </div>
        //         <div className="card">
        //             <img src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="card-img-top" alt="..." />
        //             <div className="card-body">
        //             </div>
        //         </div>
        //         <div className="card bg-primary text-white text-center p-3">
        //             <blockquote className="blockquote mb-0">
        //             </blockquote>
        //         </div>
        //         <div className="card text-center">
        //             <div className="card-body">
        //                 <img src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        //             </div>
        //         </div>
        //         <div className="card">
        //         </div>
        //         <div className="card p-3 text-right">
        //             <blockquote className="blockquote mb-0">
        //                 <img src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        //             </blockquote>
        //         </div>
        //         <div className="card">
        //             <div className="card-body">
        //             </div>
        //         </div>

        //         <div className="card">
        //             <div className="card-body">
        //                 <img src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        //             </div>
        //         </div>
        //     </div>

        //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        //         <div className="card">
        //             <div className="card-body">
        //             </div>
        //         </div>

        //         <div className="card">
        //             <img src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="card-img-top" alt="..." />
        //             <div className="card-body">
        //             </div>
        //         </div>

        //         <div className="card p-3">
        //             <blockquote className="blockquote mb-0 card-body">
        //             </blockquote>
        //         </div>
        //         <div className="card">
        //             <img src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="card-img-top" alt="..." />
        //             <div className="card-body">
        //             </div>
        //         </div>
        //         <div className="card bg-primary text-white text-center p-3">
        //             <blockquote className="blockquote mb-0">
        //             </blockquote>
        //         </div>
        //         <div className="card text-center">
        //             <div className="card-body">
        //                 <img src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        //             </div>
        //         </div>
        //         <div className="card">

        //         </div>
        //         <div className="card p-3 text-right">
        //             <blockquote className="blockquote mb-0">
        //                 <img src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        //             </blockquote>
        //         </div>
        //         <div className="card">
        //             <div className="card-body">
        //             </div>
        //         </div>

        //         <div className="card">
        //             <div className="card-body">
        //             </div>
        //         </div>
        //     </div>
        // </>
    );
};

export default Gallery;

