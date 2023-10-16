import React, { ReactNode, useState, useEffect } from 'react';

interface DynamicWidthComponentProps {
    children: ReactNode;
}

const DynamicWidthComponent: React.FC<DynamicWidthComponentProps> = ({ children }) => {
    const [phone, setPhone] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1000) {
                setPhone(true);
            } else {
                setPhone(false);
            }
        };
        
        if (typeof window !== 'undefined') {
            if(window.innerWidth < 1000) {
                setPhone(true)
            } else {
                setPhone(false)
            }
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return (
        <>
            {!phone ? (
                <div
                    style={{
                        width: '100vw',
                        height: 'auto',
                        overflow: 'hidden',
                        paddingBottom: 0,
                        paddingLeft: '110px',
                        transition: 'padding 400ms ease',
                    }}
                >
                    {children}
                </div>
            ) : (
                <div
                    style={{
                        width: '100vw',
                        height: 'auto',
                        overflow: 'hidden',
                        paddingLeft: 0,
                        paddingBottom: 56,
                        transition: 'padding 400ms ease',
                    }}
                >
                    {children}
                </div>
            )}
        </>
    );
};

export default DynamicWidthComponent;
