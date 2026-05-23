import React, { useState, useEffect, useRef } from 'react';
import { Eye } from 'lucide-react';
import AttractiveTemplate from './templates/AttractiveTemplate';
import PlainTemplate from './templates/PlainTemplate';

export default function PreviewPanel({ formData, activeTemplate, previewRef }) {
    const viewportRef = useRef(null);
    const [scale, setScale] = useState(1);

    const targetWidth = 794;  // Standard A4 width at 96 DPI
    const targetHeight = 1123; // Standard A4 height at 96 DPI

    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        const updateScale = () => {
            const viewportWidth = viewport.clientWidth - 48; // subtract padding (24px left + 24px right)
            if (viewportWidth < targetWidth) {
                setScale(viewportWidth / targetWidth);
            } else {
                setScale(1);
            }
        };

        const observer = new ResizeObserver(updateScale);
        observer.observe(viewport);
        updateScale(); // initial execution

        return () => observer.disconnect();
    }, []);

    return (
        <section className="preview-panel">
            <div className="panel-header">
                <h2>
                    <Eye /> 
                    <span>Live Interactive Preview</span>
                </h2>
                <span className="panel-subtitle">See your resume updates in real-time</span>
            </div>

            {/* Viewport container with custom styling to auto-center and prevent clipping */}
            <div 
                className="preview-viewport" 
                ref={viewportRef}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    overflowY: 'auto',
                    padding: '1.5rem',
                    backgroundColor: '#cbd5e1'
                }}
            >
                {/* Dynamically scaled bounding box to preserve perfect layout scrollbars */}
                <div 
                    className="preview-scaler-container"
                    style={{
                        width: `${targetWidth * scale}px`,
                        height: `${targetHeight * scale}px`,
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'width 0.15s ease, height 0.15s ease',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                        borderRadius: '4px'
                    }}
                >
                    <div 
                        className="preview-scale-wrapper"
                        style={{ 
                            width: `${targetWidth}px`,
                            height: `${targetHeight}px`,
                            transform: `scale(${scale})`, 
                            transformOrigin: 'top left',
                            position: 'absolute',
                            top: 0,
                            left: 0
                        }}
                    >
                        <div 
                            id="resume-preview" 
                            className={`template-${activeTemplate}`}
                            ref={previewRef}
                            style={{ 
                                margin: 0, 
                                minHeight: '1123px',
                                boxShadow: 'none' // Remove duplicate shadow since parent handles it
                            }}
                        >
                            {activeTemplate === 'attractive' ? (
                                <AttractiveTemplate data={formData} />
                            ) : (
                                <PlainTemplate data={formData} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
