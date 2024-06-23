import React, { useEffect, useRef, useState } from 'react';
import FileViewer from 'react-file-viewer';
import {
    Carousel, CarouselItem, CarouselContent, CarouselNext, CarouselPrevious, CarouselApi,
} from '@/components/ui/carousel';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { ProgressBar } from '../progress-bar';

const CustomErrorComponent = ({ error }: { error: Error }) => (
    <div>Error: {error.message}</div>
);

interface ModuleProps {
    filePaths: string[];
}

const Module: React.FC<ModuleProps> = ({ filePaths }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<any>(null);
    const carouselContentRef = useRef<any>(null);
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);



    // Use useEffect to update currentIndex based on the carousel's current item
    useEffect(() => {
        if (!carouselApi) return;

        const onSelect = () => {
            setCurrentIndex(carouselApi.selectedScrollSnap());
        };

        carouselApi.on('select', onSelect);
        return () => {
            carouselApi.off('select', onSelect);
        };
    }, [carouselApi]);


    const progress = ((currentIndex + 1) / filePaths.length) * 100;



    return (
        <div className="module-wrapper relative w-full max-w-4xl mx-auto">
            <ProgressBar progress={progress} />
            <Carousel ref={carouselRef} className="rounded-lg overflow-hidden" setApi={setCarouselApi} >
                <CarouselContent ref={carouselContentRef}>
                    {filePaths.map((filePath, index) => {
                        const fileType = filePath.split('.').pop();

                        return (
                            <CarouselItem key={index} >
                                <div className="w-full h-full">
                                    <FileViewer
                                        fileType={fileType}
                                        filePath={filePath}
                                        errorComponent={CustomErrorComponent}
                                        onError={(e: any) => console.error(e)}
                                    /></div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    <CarouselPrevious className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-900/50 text-white transition-colors hover:bg-gray-900">
                        <ChevronLeftIcon className="h-4 w-4" />
                        <span className="sr-only">Previous</span>
                    </CarouselPrevious>
                    <CarouselNext className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-900/50 text-white transition-colors hover:bg-gray-900" >
                        <ChevronRightIcon className="h-4 w-4" />
                        <span className="sr-only">Next</span>
                    </CarouselNext>
                </div>
            </Carousel>


        </div>
    );
};

export default Module;
