import React from 'react';
const Gallery = () => {

    const img2 = [
        {
            img: "https://media.istockphoto.com/id/1226515362/photo/woman-hand-working-on-tablet-and-press-laptop-on-the-table-in-office-t.jpg?s=612x612&w=0&k=20&c=OofALC-kuLiA0Vl1TLdO6FVcXol5JmFXz5_lsCBCmj8="
        },
        {
            img: "https://media.istockphoto.com/id/1217111102/photo/businessmen-using-cell-phones-and-writing-on-notebook-with-pen-on-table.jpg?s=612x612&w=0&k=20&c=7L_8LT2U-nruUcfClIQn9ruVTPLS9GCAj_IYPreSRiU="
        },
        {
            img: "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fGJsb2d8ZW58MHx8MHx8fDA%3D"
        },
        {
            img: "https://media.istockphoto.com/id/1049922574/photo/hand-working-documents-about-the-marketing-plans-and-sales-of-the-company-with-laptop.jpg?s=612x612&w=0&k=20&c=tG2qvN2QETUrzKU1aXR-XBHPNPz2l7ZkgIzjgwPZGxI="
        },
        {
            img: "https://media.istockphoto.com/id/1265115923/photo/female-college-student-using-mock-up-smartphone-while-doing-homework-with-laptop.jpg?s=612x612&w=0&k=20&c=Z-4QfpcVOGOqzQiFLbXUIglLscQIMMELIjFMt9RspJs="
        },
        {
            img: "https://media.istockphoto.com/id/1364962255/photo/african-american-using-security-and-alarm-system.jpg?s=612x612&w=0&k=20&c=xsv1BtvaOjZM_Eth6AbPpSG3k-kaAYs_Gv-NrTUOzcU="
        },
        {
            img: "https://media.istockphoto.com/id/1320796838/photo/group-of-young-people-working-together-creative-business-people-in-modern-office.jpg?s=612x612&w=0&k=20&c=94-n_iocVV3Cy3PwsbYr-bEQMpXnGLbc1mfslZMARvE="
        },
    ]


    const img = [
        {
            img: "https://media.istockphoto.com/id/1144320951/photo/woman-shopping-online-and-using-credit-card.jpg?s=612x612&w=0&k=20&c=NiZwpqc8NzQf9mv1nWzjNozaER23R0pK38JTZeLqqcw=",
        },
        {
            img: "https://media.istockphoto.com/id/1337244435/photo/businesswoman-hand-working-on-computer-and-drinking-coffee-while-sitting-at-her-office-desk.jpg?s=612x612&w=0&k=20&c=BUE9Vm2Ienw86y3Bf5fKDaSpqgKft7dsRD7Fp7nMBNg="
        },
        {
            img: "https://media.istockphoto.com/id/1223068153/photo/happy-young-woman-writing-notes-in-her-notebook-while-sitting-at-a-cafe.jpg?s=612x612&w=0&k=20&c=-4WsSZjFQov4sI1E9R3TWG2uv2VjPzQsRj16QDUd-Fo=",
        },
        {
            img: "https://media.istockphoto.com/id/1187179171/photo/futuristic-office.jpg?s=612x612&w=0&k=20&c=GbJoBwiAVklbGLD0rkk67xyYBk_cuoSP-D-ujEHGLdo="
        },
        {
            img: "https://media.istockphoto.com/id/1646303198/photo/business-woman-sitting-at-desk-with-professional-expression-sitting-at-work-with-a-tablet-in.jpg?s=612x612&w=0&k=20&c=gOJEyzJ7NX2bQBQrFWKSnh26DAsSJPDlLNGnepNu5mY=",
        },
        {
            img: "https://media.istockphoto.com/id/1307865374/photo/women-writing-note-book-on-the-table.jpg?s=612x612&w=0&k=20&c=4n7ArlOMBVTFX6pAvIL0GWpDmwv-WGrheyPP21ft-HE="
        },
        {
            img: "https://media.istockphoto.com/id/1404153377/photo/young-economists-and-accountants-or-financiers-and-investors-are-using-notebook-and-using.jpg?s=612x612&w=0&k=20&c=6o2ehZDb_kwiMgUWvZ8FyGghNRfAuaK-7sim3Ygw78Q="
        },
    ]

    return (
        <>
            <div class="about-section uppercase">
                <h1 class="about-title">Gallery <span>Blog</span></h1>
            </div>
            <div className='grid md:grid-cols-3 auto-rows-[300px] gap-4 my-10 overflow-hidden'>
                {img.map((val, indx) => (
                    <div key={indx} className={`bg-neutral-100 border-2 rounded-xl flex flex-col items-center justify-center ${indx === 3 || indx === 6 ? 'md:col-span-2' : ''}`}>
                        <img src={val.img} alt="" className='rounded-xl w-[100%] h-[100%]' />
                    </div>
                ))}
            </div>

            <div className='grid md:grid-cols-4 auto-rows-[300px] gap-4 my-10'>
                {img2.map((val, indx) => (
                    <div key={indx} className={`bg-neutral-100 border-2 rounded-xl flex flex-col items-center justify-center ${indx === 0 || indx === 4 || indx === 5 || indx === 6 ? 'md:col-span-2' : ''} ${indx === 2 ? 'md:row-span-2' : ''}`}>
                        <img src={val.img} alt="" className='rounded-xl w-[100%] h-[100%]' />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Gallery;

