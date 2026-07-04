import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface Block {
  id: string;
  component: ReactNode;
}

interface Props {
  blocks: Block[];
  pageWidth?: number;
  pageHeight?: number;
  paddingY?: number;
  footerComponent?: (pageNumber: number) => ReactNode;
}

export const DynamicPaginator: React.FC<Props> = ({ 
  blocks, 
  pageWidth = 794, 
  pageHeight = 1123, 
  paddingY = 96, // 48px top and bottom approx
  footerComponent 
}) => {
  const [measuredHeights, setMeasuredHeights] = useState<Record<string, number>>({});
  const [isMeasured, setIsMeasured] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pass 1: Measure Heights
  useEffect(() => {
    if (isMeasured || !containerRef.current) return;
    
    const measure = () => {
      const heights: Record<string, number> = {};
      const childNodes = containerRef.current?.children;
      
      if (childNodes) {
        for (let i = 0; i < childNodes.length; i++) {
          const el = childNodes[i] as HTMLElement;
          const id = el.getAttribute('data-block-id');
          if (id) {
            heights[id] = el.getBoundingClientRect().height;
          }
        }
      }
      
      setMeasuredHeights(heights);
      setIsMeasured(true);
    };

    // Wait for fonts and images to load completely to ensure pixel-perfect measurement
    Promise.all([
      document.fonts.ready,
      ...Array.from(document.images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(res => {
          img.onload = res;
          img.onerror = res;
        });
      })
    ]).then(() => {
      // Add a small 300ms buffer for Recharts and SVGs to finish settling
      setTimeout(measure, 300);
    });

  }, [blocks, isMeasured]);

  if (!isMeasured) {
    // Hidden render pass for measurement
    return (
      <div 
        ref={containerRef} 
        style={{ width: `${pageWidth}px` }} 
        className="absolute top-[-9999px] left-[-9999px] opacity-0 flex flex-col gap-0"
      >
        {blocks.map(block => (
          <div key={block.id} data-block-id={block.id} className="w-full">
            {block.component}
          </div>
        ))}
      </div>
    );
  }

  // Pass 2: Pagination Algorithm
  const pages: Block[][] = [];
  let currentPage: Block[] = [];
  let currentHeight = 0;
  const availableHeight = pageHeight - paddingY;

  blocks.forEach(block => {
    // adding gap spacing (0px for gap-0)
    const blockHeight = (measuredHeights[block.id] || 0) + 0; 
    
    // If it's the very first block, or if it fits on the current page
    if (currentPage.length === 0 || currentHeight + blockHeight <= availableHeight) {
      currentPage.push(block);
      currentHeight += blockHeight;
    } else {
      // Push to new page
      pages.push(currentPage);
      currentPage = [block];
      currentHeight = blockHeight;
    }
  });

  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  // Final Render
  return (
    <div id="pdf-report-container" className="bg-[#f5f5f4] font-sans" style={{ width: `${pageWidth}px` }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        .pdf-page {
          width: ${pageWidth}px;
          min-height: ${pageHeight}px;
          background: #FAFAFA;
          position: relative;
          display: flex;
          flex-direction: column;
        }
      `}} />

      <div className="report-page">
        {pages.map((pageBlocks, pageIndex) => (
          <div key={pageIndex} className="pdf-page p-0">
            <div className="flex-1 flex flex-col gap-0">
              {pageBlocks.map(b => (
                <div key={b.id}>
                  {b.component}
                </div>
              ))}
            </div>
            {footerComponent && footerComponent(pageIndex + 1)}
          </div>
        ))}
      </div>
    </div>
  );
};
