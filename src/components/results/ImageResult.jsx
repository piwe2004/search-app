import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom'
import SearchTermRequired from '../SearchTermRequired';
import { Oval } from 'react-loader-spinner';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

function ImageResult() {
    const location = useLocation();
    const search = new URLSearchParams(location.search).get('q');
    const itemsPerPage = 10;
    const [currentItems, setCurrentItems] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)

    const {data, isLoading} = useQuery(
        ['imagesResult', search],
        () => 
            axios.get(
                `https://google-search72.p.rapidapi.com/imagesearch?q=${search}&num=20`,
                {headers: {
                    'X-RapidAPI-Key': '990f9b7018mshb16c3e651b8eb8cp1653a5jsn2e042dbd3183',
                    'X-RapidAPI-Host': 'google-search72.p.rapidapi.com'
                }}
            ).then(data => data?.data),
            {
                refetchOnWindowFocus : false,
                enabled: !!search,
                cacheTime:0
            }
    );

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage
        setCurrentItems(data?.items.slice(itemOffset, endOffset))
        setPageCount(Math.ceil((data?.items?.length ?? 0)/itemsPerPage))

    }, [itemOffset, data?.items])
    
    const handlePageClick = useCallback((e)=>{
        setItemOffset(e.selected * itemsPerPage % data?.items?.length);
    }, [data?.items])

    if(!search) return <SearchTermRequired />
    if(isLoading) 
    return (
        <Oval
            ariaLabel='loading-indicator'
            height={100}
            width={100}
            strokeWidth={5}
            color="#22C55E"
            secondaryColor='white'
            wrapperClass='flex justify-center items-center mt-52'
        />
    )

    return (
        <>
            <div className='flex justify-center items-center flex-wrap m-auto w-[900px]'>
                { 
                    data.items.length > 0 
                        ? currentItems?.map(({title, contextLink, thumbnailImageUrl}, idx) => (
                            <div key={idx} className='mt-10'>
                                <a href={contextLink} target='_blank' title="새창열림" rel='noreferrer' className='p-3'>
                                    <img src={thumbnailImageUrl} alt={title} loading='lazy' className='hover:shadow-xl' />
                                    <p className='w-36 break-words text-sm mt-3 hover:underline'>
                                        {title}
                                    </p>
                                </a>
                            </div>
                            ))
                        :   <div className='flex justify-center items-center m-auto h-96'>
                                <p className='text-3xl text-gray-400'>
                                    검색결과가 없습니다.
                                </p>
                            </div>
                }
            </div>
            <ReactPaginate
                breakLabel='...'
                nextLabel='>>'
                previousLabel='<<'
                pageRangeDisplayed={10}
                pageLinkClassName="-ml-[1] text-[#22C55E] bg-slate-50 block border-solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
                previousLinkClassName="text-[#22C55E] bg-slate-50 block border-solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
                nextLinkClassName="-ml-[1] text-[#22C55E] bg-slate-50 block border-solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
                breakLinkClassName="-ml-[1] text-[#22C55E] bg-slate-50 block border-solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
                containerClassName="flex ml-auto mr-auto w-fit mt-10 pb-10 select-none"
                activeLinkClassName="z-[3] text-slate-50 bg-[#22C55E] border-[#22C55E] focus:text-[#e9ecef] focus:z-[3] focus:bg-[#22C55E] focus:outline-0 hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
                disabledLinkClassName="text-[#6c757d] pointer-events-none bg-slate-50 border-[#dee2e6] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
                renderOnZeroPageCount={null}
                onPageChange={handlePageClick}
                pageCount={pageCount}
            />
        </>
    )
}

export default ImageResult
