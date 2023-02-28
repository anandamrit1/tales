import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const SkeletonLoader: React.FC = () => {
    return (
        <div className='w-full flex flex-col gap-5 bg-white-100 p-8 rounded-xl'>
            <Skeleton count={2} />
            <Skeleton count={4} />
            <Skeleton count={3} />
        </div>
    )
}
